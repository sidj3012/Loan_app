import express from 'express';
const app = express();
const port=5050;

app.get("/", (req, res) => {
    res.send("Hello sid how World");
});

app.listen(port!, () =>{
    console.log("Server running on port:" + port);
});