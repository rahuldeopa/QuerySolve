const express = require('express');
const prisma = require('../prisma');
const fetchuser = require('../middlewares/fetchuser');
const router = express.Router();

router.post('/addquestion', fetchuser, async (req, res) => {
    try {
        let question = await prisma.question.create({
            data: {
                userId: req.user.id,
                title: req.body.title,
                question: req.body.question,
                tags: req.body.tags,
                postedBy: req.user.username,
                votes: 0
            }
        });
        res.json({ "Success": "Added Query Successfully", "status": true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/fetchquestions', async (req, res) => {
    try {
        const questions = await prisma.question.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                answers: {
                    orderBy: { votes: 'desc' },
                    take: 1
                }
            }
        });
        res.json(questions);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal server error");
    }
});

router.post('/fetchQueByHigherVotes', async (req, res) => {
    try {
        const questions = await prisma.question.findMany({
            orderBy: { votes: 'desc' },
            include: {
                answers: {
                    orderBy: { votes: 'desc' },
                    take: 1
                }
            }
        });
        res.json(questions);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal server error");
    }
});

router.post('/fetchQueById/:id', async (req, res) => {
    try {
        let question = await prisma.question.findUnique({ where: { id: req.params.id } });
        if (!question) {
            return res.status(404).send("Question not Found");
        }
        res.json(question);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/updateque/:id', async(req, res)=>{
    try {
        const { title, question, tags } = req.body;
        await prisma.question.update({
            where: { id: req.params.id },
            data: { title, question, tags }
        });
        res.json({ status: "updated" });
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/deleteque/:id', async(req, res)=>{
    try {
        await prisma.question.delete({ where: { id: req.params.id } });
        res.json({ status: "deleted" });
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.put('/resolve/:id', fetchuser, async (req, res) => {
    try {
        let question = await prisma.question.findUnique({ where: { id: req.params.id } });
        if (!question) {
            return res.status(404).send("Question not found");
        }
        if (question.userId !== req.user.id) {
            return res.status(401).send("Not Authorized");
        }
        await prisma.question.update({
            where: { id: req.params.id },
            data: { status: 'Answered' }
        });
        res.json({ status: "success" });
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/fetchUserQuestions/:username', async (req, res) => {
    try {
        let user = await prisma.user.findFirst({ where: { username: req.params.username } });
        if (!user) return res.status(404).send("User not found");

        const questions = await prisma.question.findMany({ where: { userId: user.id } });
        res.json(questions);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/fetchUserFilteredQuestions/:username', async (req, res) => {
    try {
        let user = await prisma.user.findFirst({ where: { username: req.params.username } });
        if (!user) return res.status(404).send("User not found");

        const { startDate, endDate, tags } = req.body;

        const questions = await prisma.question.findMany({
            where: {
                userId: user.id,
                createdAt: {
                    gte: startDate ? new Date(startDate) : undefined,
                    lte: endDate ? new Date(endDate) : undefined
                }
            }
        });

        if (tags) {
            const filtered = questions.filter(que => que.tags.split(" ").includes(tags));
            return res.json(filtered);
        }
        res.json(questions);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/fetchUserFilteredQuestions', async (req, res) => {
    try {
        const { startDate, endDate, tags } = req.body;
        const questions = await prisma.question.findMany({
            where: {
                createdAt: {
                    gte: startDate ? new Date(startDate) : undefined,
                    lte: endDate ? new Date(endDate) : undefined
                }
            }
        });

        if (tags) {
            const filtered = questions.filter(que => que.tags.split(" ").includes(tags));
            return res.json(filtered);
        }
        res.json(questions);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/usedtags", async(req, res)=>{
    try {
        const questions = await prisma.question.findMany();
        const tags = [];
        questions.forEach(que => {
            que.tags.split(" ").forEach(tag => {
                if (tags.indexOf(tag) === -1) tags.push(tag);
            });
        });
        res.json(tags);
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/usedtags/:username", async(req, res)=>{
    try {
        let user = await prisma.user.findFirst({ where: { username: req.params.username } });
        if (!user) return res.status(404).send("User not found");

        const questions = await prisma.question.findMany({ where: { userId: user.id } });
        const tags = [];
        questions.forEach(que => {
            que.tags.split(" ").forEach(tag => {
                if (tags.indexOf(tag) === -1) tags.push(tag);
            });
        });
        res.json(tags);
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/upvote/:id", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const questionId = req.params.id;

        const existingVote = await prisma.vote.findUnique({
            where: { userId_questionId: { userId, questionId } }
        });

        if (existingVote) {
            if (existingVote.type === 'SIGNAL') {
                await prisma.vote.delete({ where: { id: existingVote.id } });
                await prisma.question.update({
                    where: { id: questionId },
                    data: { votes: { decrement: 1 } }
                });
                return res.json({ status: "removed_signal" });
            } else {
                await prisma.vote.update({
                    where: { id: existingVote.id },
                    data: { type: 'SIGNAL' }
                });
                await prisma.question.update({
                    where: { id: questionId },
                    data: { votes: { increment: 2 } } // From -1 to +1
                });
                return res.json({ status: "upvoted" });
            }
        }

        await prisma.vote.create({
            data: { type: 'SIGNAL', userId, questionId }
        });
        await prisma.question.update({
            where: { id: questionId },
            data: { votes: { increment: 1 } }
        });
        res.json({ status: "upvoted" });
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/downvote/:id", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const questionId = req.params.id;

        const existingVote = await prisma.vote.findUnique({
            where: { userId_questionId: { userId, questionId } }
        });

        if (existingVote) {
            if (existingVote.type === 'NOISE') {
                await prisma.vote.delete({ where: { id: existingVote.id } });
                await prisma.question.update({
                    where: { id: questionId },
                    data: { votes: { increment: 1 } }
                });
                return res.json({ status: "removed_noise" });
            } else {
                await prisma.vote.update({
                    where: { id: existingVote.id },
                    data: { type: 'NOISE' }
                });
                await prisma.question.update({
                    where: { id: questionId },
                    data: { votes: { decrement: 2 } } // From +1 to -1
                });
                return res.json({ status: "downvoted" });
            }
        }

        await prisma.vote.create({
            data: { type: 'NOISE', userId, questionId }
        });
        await prisma.question.update({
            where: { id: questionId },
            data: { votes: { decrement: 1 } }
        });
        res.json({ status: "downvoted" });
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/fetchVotes/:id", async (req, res) => {
    try {
        const question = await prisma.question.findUnique({ where: { id: req.params.id } });
        if (question) res.json(question.votes);
        else res.status(404).send("Not found");
    } catch(e) {
        res.status(500).send("Internal error");
    }
});

router.post("/fetchallVotes", async (req, res) => {
    try {
        const questions = await prisma.question.findMany({ select: { id: true, votes: true } });
        const obj = {};
        questions.forEach(que => { obj[que.id] = que.votes; });
        res.json(obj);
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/myVotes", fetchuser, async (req, res) => {
    try {
        const votes = await prisma.vote.findMany({ where: { userId: req.user.id } });
        res.json(votes);
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/fetchQuePertag/:name", async (req, res) => {
    try {
        const questions = await prisma.question.findMany();
        const questionsPertag = questions.filter(que => 
            que.tags.split(" ").some(tag => tag.toLowerCase() === req.params.name.toLowerCase())
        );
        res.json(questionsPertag);
    } catch(e) {
        res.status(500).send("Internal error");
    }
});

router.post("/answeredQue", async (req, res) => {
    try {
        const answeredQuestions = await prisma.question.findMany({
            where: { answers: { some: {} } }
        });
        res.json(answeredQuestions);
    } catch(e) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/unansweredQue", async (req, res) => {
    try {
        const unansweredQuestions = await prisma.question.findMany({
            where: { answers: { none: {} } }
        });
        res.json(unansweredQuestions);
    } catch(e) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/search", async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const questions = await prisma.question.findMany({
            where: {
                OR: [
                    { title: { contains: keyword, mode: 'insensitive' } },
                    { tags: { contains: keyword, mode: 'insensitive' } }
                ]
            }
        });
        res.json(questions);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;