const express = require('express');
const fs = require('fs');
const path = require('path');
const LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage(require('os').tmpdir() + '/scratch');
const prisma = require('../prisma');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'Darshitisagoodboy';
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser');

router.post('/createuser', [
    body('username', 'Name Must have atleast 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0]['msg'] });
    }

    try {
        let user = await prisma.user.findUnique({ where: { email: req.body.email } });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" })
        }
        
        user = await prisma.user.findFirst({ where: { username: req.body.username } });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this username already exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: secPass,
            }
        });

        const data = {
            user: {
                id: user.id,
                username: user.username
            }
        }

        const authtaken = jwt.sign(data, JWT_SECRET);
        localStorage.setItem('token', authtaken);
        localStorage.setItem('username', req.body.username);
        res.json({ 'success': authtaken, 'username': req.body.username, 'date': user.createdAt, 'userType': "user" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a password it can not be blank').exists(),
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
        let admin = await prisma.admin.findUnique({ where: { email } });

        if (!admin) {
            let user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(400).json({ error: "Please Enter Correct login Credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "enter Correct login Credentials" });
            }

            const data = {
                user: {
                    id: user.id,
                    username: user.username
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            localStorage.setItem('token', authToken);
            localStorage.setItem('username', user.username);
            localStorage.setItem('since', user.createdAt);

            return res.status(200).json({ 'success': authToken, 'username': user.username, "userType": "user", "date": user.createdAt });
        }

        const adminPassword = await bcrypt.compare(password, admin.password);
        if (!adminPassword) {
            return res.status(400).json({ error: "enter Correct login Credentials" });
        }

        // Sync admin to the User table so foreign keys (userId/postedId) work when they post!
        let adminUserSync = await prisma.user.findUnique({ where: { email: admin.email } });
        if (!adminUserSync) {
            adminUserSync = await prisma.user.create({
                data: {
                    username: admin.username,
                    email: admin.email,
                    password: admin.password
                }
            });
        }

        const admindata = {
            user: {
                id: adminUserSync.id, // Use User ID for Prisma foreign keys
                username: admin.username
            }
        }

        const authToken = jwt.sign(admindata, JWT_SECRET);
        localStorage.setItem('token', authToken);
        localStorage.setItem('username', admin.username);

        return res.status(200).json({ 'success': authToken, 'username': admin.username, "userType": "admin" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/uploadProfilePhoto', fetchuser, async (req, res) => {
    try {
        const { photo } = req.body; // base64 string
        
        const matches = photo.match(/^data:(.*?);base64,(.+)$/);
        if (!matches) {
            return res.status(400).json({ error: "Invalid image format" });
        }
        
        const mimeType = matches[1];
        const ext = mimeType.split('/')[1] || 'jpg';
        const base64Data = matches[2];
        const imgBuffer = Buffer.from(base64Data, 'base64');
        
        const uploadsDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        
        const filename = `avatar_${req.user.id}_${Date.now()}.${ext.replace('+', '')}`;
        const filePath = path.join(uploadsDir, filename);
        
        fs.writeFileSync(filePath, imgBuffer);

        await prisma.user.update({
            where: { id: req.user.id },
            data: { profilePhoto: filename }
        });
        res.json({ success: true, message: "Profile photo updated successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/profilePhoto/:username', async (req, res) => {
    try {
        const user = await prisma.user.findFirst({ where: { username: req.params.username } });
        if (user && user.profilePhoto) {
            // Backwards compatibility for old Base64 uploads
            if (user.profilePhoto.startsWith('data:')) {
                const matches = user.profilePhoto.match(/^data:(.*?);base64,(.+)$/);
                if (matches) {
                    const contentType = matches[1];
                    const base64Data = matches[2];
                    const imgBuffer = Buffer.from(base64Data, 'base64');
                    res.writeHead(200, {
                        'Content-Type': contentType,
                        'Content-Length': imgBuffer.length,
                        'Cache-Control': 'public, max-age=86400'
                    });
                    res.end(imgBuffer);
                    return;
                }
            } else {
                // Read from file system
                const filePath = path.join(__dirname, '../../uploads', user.profilePhoto);
                if (fs.existsSync(filePath)) {
                    res.sendFile(filePath, { maxAge: 86400000 });
                    return;
                }
            }
        }
        res.status(404).send("Not found");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error");
    }
});

module.exports = router;