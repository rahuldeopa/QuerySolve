const express = require('express');
const prisma = require('../prisma');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage(require('os').tmpdir() + '/scratch');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'Darshitisagoodboy';

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
        let user = await prisma.admin.findUnique({ where: { email: req.body.email } });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await prisma.admin.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: secPass,
            }
        });

        let adminUserSync = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: secPass,
            }
        });

        const data = { user: { id: adminUserSync.id, username: user.username } };
        const authtaken = jwt.sign(data, JWT_SECRET);

        localStorage.setItem('token', authtaken);
        localStorage.setItem('username', req.body.username);
        res.json({ 'success': authtaken, 'username': req.body.username });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});

router.post('/questions', async(req, res)=>{
    try {
        const questions = await prisma.question.findMany();
        res.json(questions);
    } catch(e){
        res.status(500).send("internel server error");
    }
});

router.post('/noOfUsers', async(req, res)=>{
    try {
        const count = await prisma.user.count();
        res.json(count);
    } catch(e){
        res.status(500).send("internel server error");
    }
});

router.post('/noOfQuestions', async(req, res)=>{
    try {
        const count = await prisma.question.count();
        res.json(count);
    } catch(e){
        res.status(500).send("internel server error");
    }
});

router.post('/noOfAnswers', async(req, res)=>{
    try {
        const count = await prisma.answer.count();
        res.json(count);
    } catch(e){
        res.status(500).send("internel server error");
    }
});
 
router.post('/noOfAccept', async(req, res)=>{
    try {
        const count = await prisma.answer.count({ where: { status: "Accepted" } });
        res.json(count);
    } catch(e){
        res.status(500).send("internel server error");
    }
});

router.delete('/deleteUser/:id', async (req, res) => {
    try {
        await prisma.user.delete({ where: { id: req.params.id } });
        res.json({"status": "deleted"});
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/deleteQuestion/:id', async (req, res) => {
    try {
        await prisma.question.delete({ where: { id: req.params.id } });
        res.json({"status": "deleted"});
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
}); 

router.delete('/deleteanswer/:id', async (req, res) => {
    try {
        await prisma.answer.delete({ where: { id: req.params.id } });
        res.json({"status": "deleted"});
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});

router.put('/resolveQuestion/:id', async (req, res) => {
    try {
        await prisma.question.update({
            where: { id: req.params.id },
            data: { status: 'Answered' }
        });
        res.json({"status": "success"});
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});

router.get('/question-by-month', async(req, res)=>{
    try {
        const questions = await prisma.$queryRaw`
            SELECT EXTRACT(MONTH FROM "createdAt") as _id, count(*)::integer as count 
            FROM "Question" 
            GROUP BY EXTRACT(MONTH FROM "createdAt")
        `;
        res.json(questions);
    } catch(e){
        console.error(e);
        res.status(500).send("internel server error");
    }
});

router.get('/question-by-year', async(req, res)=>{
    try {
        const questions = await prisma.$queryRaw`
            SELECT EXTRACT(YEAR FROM "createdAt") as _id, count(*)::integer as count 
            FROM "Question" 
            GROUP BY EXTRACT(YEAR FROM "createdAt")
        `;
        res.json(questions);
    } catch(e){
        console.error(e);
        res.status(500).send("internel server error");
    }
});

module.exports = router;