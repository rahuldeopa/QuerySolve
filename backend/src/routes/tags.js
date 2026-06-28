const express = require('express');
const prisma = require('../prisma');
const router = express.Router();

router.post("/addtag", async(req, res)=>{
    try {
        let tag = await prisma.tag.create({
            data: {
                tagName: req.body.tagname,
                desc: req.body.desc
            }
        });
        res.json({ "Success": "Added tags Successfully", "status": true });
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/gettag", async(req, res)=>{
    try {
        let tags = await prisma.tag.findMany();
        res.json(tags.map(t => ({ ...t, tagname: t.tagName })));
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/tagdesc/:tagname", async(req, res)=>{
    try {
        let tag = await prisma.tag.findUnique({
            where: { tagName: req.params.tagname }
        });
        res.json(tag ? { ...tag, tagname: tag.tagName } : null);
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;