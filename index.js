const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

let users = [
  {
    id: 1,
    username: "test",    
    name: "John Doe",
    dateOfBirth: "1990-05-20",
    address: "Measurement Street 567",
    city: "London",
    country: "uk",
    email: "john.doe@demo.com"
  }
];

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/users', (req, res) => {
  res.json(users);
})

app.post('/users', (req, res) => {
  console.log('Hello /users');
  
  if(req.body.hasOwnProperty('email'))
  {
    // I accept or validate more
    const result = {
      id: 234622
    };

    users.push({
      id: users.length + 1,
      username: req.body.username,
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      email: req.body.email
    })
  
    res.status(201).json(result);
  }
  else
  {
    res.sendStatus(400);
  }


  
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))