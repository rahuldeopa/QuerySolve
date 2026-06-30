const express = require('express');
const prisma = require('../prisma');
const fetchuser = require('../middlewares/fetchuser');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage(require('os').tmpdir() + '/scratch');

router.post('/addanswer/:id', fetchuser, async (req, res) => {
    try {
        await prisma.answer.create({
            data: {
                questionId: req.params.id,
                answer: req.body.answer,
                postedId: req.user.id,
                postedBy: req.user.username,
                votes: 0
            }
        });
        res.json({ "Success": "Added Answer Successfully", "status": true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/fetchanswer", async (req, res) => {
    try {
        const answers = await prisma.answer.findMany();
        res.json(answers);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/fetchanswer/:id", async (req, res) => {
    try {
        const answers = await prisma.answer.findMany({ where: { questionId: req.params.id } });
        res.json(answers);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/userAnstoUpdate/:id", async (req, res) => {
    try {
        const answer = await prisma.answer.findUnique({ where: { id: req.params.id } });
        res.json(answer);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/updateans/:id", async (req, res) => {
    try {
        await prisma.answer.update({
            where: { id: req.params.id },
            data: { answer: req.body.answer }
        });
        res.json({ status: "updated" });
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/fetchUserAnswers', async (req, res) => {
    try {
        const answers = await prisma.answer.findMany();
        res.json(answers);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/fetchUserAnswers/:username', async (req, res) => {
    try {
        const answers = await prisma.answer.findMany({ where: { postedBy: req.params.username } });
        res.json(answers);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/fetchUserFilteredAnswers/:username', async (req, res) => {
    try {
        const { startDate, endDate, tags, status } = req.body;
        
        let answers = await prisma.answer.findMany({
            where: {
                postedBy: req.params.username,
                createdAt: {
                    gte: startDate ? new Date(startDate) : undefined,
                    lte: endDate ? new Date(endDate) : undefined
                },
                status: status ? status : undefined
            },
            include: { question: true }
        });

        if (tags) {
            answers = answers.filter(ans => ans.question && ans.question.tags.split(" ").includes(tags));
        }

        // Return answer objects without populated question for compatibility
        res.json(answers.map(ans => {
            const { question, ...rest } = ans;
            return rest;
        }));
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/fetchAllFilteredAnswers', async (req, res) => {
    try {
        const { startDate, endDate, tags, status } = req.body;
        
        let answers = await prisma.answer.findMany({
            where: {
                createdAt: {
                    gte: startDate ? new Date(startDate) : undefined,
                    lte: endDate ? new Date(endDate) : undefined
                },
                status: status ? status : undefined
            },
            include: { question: true }
        });

        if (tags) {
            answers = answers.filter(ans => ans.question && ans.question.tags.split(" ").includes(tags));
        }

        res.json(answers.map(ans => {
            const { question, ...rest } = ans;
            return rest;
        }));
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/givenAllAnswersTags", async (req, res) => {
    try {
        const answers = await prisma.answer.findMany({ include: { question: true } });
        const tags = [];
        answers.forEach(ans => {
            if (ans.question) {
                ans.question.tags.split(" ").forEach(tag => {
                    if (tags.indexOf(tag) === -1) tags.push(tag);
                });
            }
        });
        res.json(tags);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/givenAnswersTags/:username", async (req, res) => {
    try {
        const answers = await prisma.answer.findMany({
            where: { postedBy: req.params.username },
            include: { question: true }
        });
        const tags = [];
        answers.forEach(ans => {
            if (ans.question) {
                ans.question.tags.split(" ").forEach(tag => {
                    if (tags.indexOf(tag) === -1) tags.push(tag);
                });
            }
        });
        res.json(tags);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/fetchUserAnsweredQuestions/:username', async (req, res) => {
    try {
        const answers = await prisma.answer.findMany({
            where: { postedBy: req.params.username },
            include: { question: true }
        });
        const questions = answers.map(ans => ans.question).filter(q => q);
        res.json(questions);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/fetchUserAcceptedAnsweredQuestions/:username', async (req, res) => {
    try {
        const answers = await prisma.answer.findMany({
            where: { postedBy: req.params.username, status: "Accepted" },
            include: { question: true }
        });
        const questions = answers.map(ans => ans.question).filter(q => q);
        res.json(questions);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/findNumberOfAns", async (req, res) => {
    try {
        const answers = await prisma.answer.findMany({ select: { questionId: true } });
        let obj = {};
        answers.forEach(answer => {
            obj[answer.questionId] = (obj[answer.questionId] || 0) + 1;
        });
        res.json(obj);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/findResolvedQuestions", async (req, res) => {
    try {
        const answers = await prisma.answer.findMany({ 
            where: { status: "Accepted" },
            select: { questionId: true } 
        });
        let obj = {};
        answers.forEach(answer => {
            obj[answer.questionId] = true;
        });
        res.json(obj);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/upvote/:id", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const answerId = req.params.id;

        const existingVote = await prisma.vote.findUnique({
            where: { userId_answerId: { userId, answerId } }
        });

        if (existingVote) {
            if (existingVote.type === 'SIGNAL') {
                await prisma.vote.delete({ where: { id: existingVote.id } });
                await prisma.answer.update({
                    where: { id: answerId },
                    data: { votes: { decrement: 1 } }
                });
                return res.json({ status: "removed_signal" });
            } else {
                await prisma.vote.update({
                    where: { id: existingVote.id },
                    data: { type: 'SIGNAL' }
                });
                await prisma.answer.update({
                    where: { id: answerId },
                    data: { votes: { increment: 2 } }
                });
                return res.json({ status: "upvoted" });
            }
        }

        await prisma.vote.create({
            data: { type: 'SIGNAL', userId, answerId }
        });
        await prisma.answer.update({
            where: { id: answerId },
            data: { votes: { increment: 1 } }
        });
        res.json({ status: "upvoted" });
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/fetchVotes", async (req, res) => {
    try {
        const answers = await prisma.answer.findMany({ select: { id: true, votes: true } });
        const obj = {};
        answers.forEach(ans => { obj[ans.id] = ans.votes; });
        res.json(obj);
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/downvote/:id", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const answerId = req.params.id;

        const existingVote = await prisma.vote.findUnique({
            where: { userId_answerId: { userId, answerId } }
        });

        if (existingVote) {
            if (existingVote.type === 'NOISE') {
                await prisma.vote.delete({ where: { id: existingVote.id } });
                await prisma.answer.update({
                    where: { id: answerId },
                    data: { votes: { increment: 1 } }
                });
                return res.json({ status: "removed_noise" });
            } else {
                await prisma.vote.update({
                    where: { id: existingVote.id },
                    data: { type: 'NOISE' }
                });
                await prisma.answer.update({
                    where: { id: answerId },
                    data: { votes: { decrement: 2 } }
                });
                return res.json({ status: "downvoted" });
            }
        }

        await prisma.vote.create({
            data: { type: 'NOISE', userId, answerId }
        });
        await prisma.answer.update({
            where: { id: answerId },
            data: { votes: { decrement: 1 } }
        });
        res.json({ status: "downvoted" });
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/acceptanswer/:id", async (req, res) => {
    try {
        await prisma.answer.update({
            where: { id: req.params.id },
            data: { status: "Accepted" }
        });
        res.json({ "status": "Accepted" });
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server error");
    }
});

router.post("/points", async (req, res) => {
    try {
        let username = localStorage.getItem("username");
        const count = await prisma.answer.count({
            where: { postedBy: username, status: "Accepted" }
        });
        res.json({ "points": count * 5 });
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/deleteans/:id", async(req, res)=>{
    try {
        await prisma.answer.delete({ where: { id: req.params.id } });
        res.json({"status":"deleted"});
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;