const express = require('express');
const fetchuser = require('../middlewares/fetchuser');
const prisma = require('../prisma');
const router = express.Router();

router.post('/addcomment/:id', fetchuser, async (req, res) => {
    try {
        let comment = await prisma.comment.create({
            data: {
                questionId: req.body.qid,
                answerId: req.params.id,
                postedId: req.user.id,
                postedBy: req.user.username,
                comment: req.body.comment
            }
        });
        res.json({ "Success": "Added Commnet Successfully", "status": true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/fetchComments", async(req, res)=>{
    try {
        let comments = await prisma.comment.findMany({
            where: {
                questionId: req.body.qid,
                answerId: req.body.ansid
            }
        });
        res.json(comments);
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;