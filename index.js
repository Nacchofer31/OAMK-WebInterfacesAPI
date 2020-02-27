const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json());

const usersRoute = require("./routes/users")
const postingRoute = require("./routes/postings")

app.use("/users",usersRoute)
app.use("/users/items", postingRoute)

app.listen(port, () => console.log(`API products listening to the port: ${port}!`))