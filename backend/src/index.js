const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT||5000

app.get('/', (req, res) => {
    res.send('Hello DoutbtOut')
})

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/question", require("./routes/questions"));
app.use("/api/answer", require("./routes/answers"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/tag", require("./routes/tags"));

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;