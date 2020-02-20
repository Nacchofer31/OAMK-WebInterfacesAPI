const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json());

const usersRoute = require("./routes/users")

app.use("/users",usersRoute)

app.listen(port, () => console.log(`API products listening to the port: ${port}!`))