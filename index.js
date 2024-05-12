const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

app.use(bodyParser);

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.post('/signup', function(req, res) {
  // Add logic to decode body
  var data = req.body

  // Ensure that email and password are provided in the request body
  if (!data.email || !data.name || !data.password) {
    return res.status(400).json({ error: 'Bad Request', message: 'Email, name, and password are required fields.' });
  }

  // Extract email, name, and password using object destructuring
  var { email, name, password } = data;

   // Store email and password in the USERS array only if the user with the given email doesn't exis
  if (USERS.find(user => user.Email === email)) {
    return res.status(409).json({ error: 'User already exists', message: 'A user with the provided email already exists.' });
  } else {
    USERS.push({
      Name: name,
      Email: email,
      Password: password
    });
    return res.status(200).json({ message: 'User registered successfully', user: { Name: name, Email: email } });
  }
})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  var data = req.body;

  var {email, password} =data;


  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  const user  = USERS.find(USERS => USERS.Email === email);
  
  if (user) {
    if (user.Password === password) {
      // If the password is correct, return back 200 status code to the client
      // Also send back a token (any random string will do for now)
      return res.status(200).json({ message: 'Login successful', token: 'randomToken' });
    } else {
      // If the password is incorrect, return back 401 status code to the client
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid email or password' });
    }
  } else {
    // If the user doesn't exist, return back 404 status code to the client
    return res.status(404).json({ error: 'Not Found', message: 'User not found' });
  }
})

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.send("Hello World from route 3!")
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.send("Hello World from route 4!")
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
  res.send("Hello World from route 4!")
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})