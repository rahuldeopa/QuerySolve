const express = require('express');
const LocalStorage = require('node-localStorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
const prisma = require('../prisma');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'Darshitisagoodboy';
const router = express.Router();

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

        const admindata = {
            user: {
                id: admin.id,
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

module.exports = router;