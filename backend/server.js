const express = require('express')
const cors = require('cors')


const connectDB= require("./config/connectDB")
const { Server } = require("socket.io");
require('dotenv').config()

// console.log(process.env.MONGO_URI)

const app = express()
app.use(express.json())
app.use("/uploads", express.static(__dirname + "/uploads"));


connectDB()
app.use(cors())
app.use("/users", require("./routes/userRoutes"))
app.use("/comments", require("./routes/CommentRoutes"))
app.use("/announcements", require("./routes/announcementRouter"))


const port = 5000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`server listening on port ${port}!`))