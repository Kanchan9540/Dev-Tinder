const express = require("express");

const app = express(); //creating a new express js application or instance of an express js application

//Request Handler
app.use("/test", (req, res) => {
   res.send("Hello from the server!");
})

app.listen(3000, () => {
    console.log("server is successfully listning on port 3000"); // thiscllback func will only be called when the server is up & running.
})