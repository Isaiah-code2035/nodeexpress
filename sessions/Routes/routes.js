const express = require('express');
const userModel = require("./models")


const app = express();

app.post("/add_user", async(req, res) => {
    const user = new userModel(req.body);

    try {
        await user.save();
        res.send(user);

    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = app;