var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

var Users = {};

app.get('/', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('index.ejs', (err, data) => {
    if (err)
      throw err;
    //console.log("Operation Success");
    res.end(data);
  });
});

app.get('/login', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('login.ejs', (err, data) => {
    if (err)
      throw err;
    //console.log("Operation Success");
    res.end(data);
  });
});

app.get('/register', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('register.ejs', (err, data) => {
    if (err)
      throw err;
    //console.log("Operation Success");
    res.end(data);
  });
});

app.get('/reset-password', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('reset-password.ejs', (err, data) => {
    if (err)
      throw err;
    //console.log("Operation Success");
    res.end(data);
  });
});

function gotoLoginSuccess(res) {
  fs.readFile('login-success.ejs', (err, data) => {
    if (err)
      throw err;
    //console.log("Operation Success");
    res.end(data);
  });
}

function gotoRegisterSuccess(res) {
  fs.readFile('register-success.ejs', (err, data) => {
    if (err)
      throw err;
    //console.log("Operation Success");
    res.end(data);
  });
}

function gotoLoginUnsuccess(res) {
  fs.readFile('login-un-success.ejs', (err, data) => {
    if (err)
      throw err;
    //console.log("Operation Success");
    res.end(data);
  });
}

function gotoPasswordResetSuccess(res) {
  fs.readFile('password-reset-success.ejs', (err, data) => {
    if (err)
      throw err;
    //console.log("Operation Success");
    res.end(data);
  });
}



app.get('/login-success', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('login-success.ejs', (err, data) => {
    if (err)
      throw err;
    //console.log("Operation Success");
    res.end(data);
  });
  //console.log('login-success page');
});

app.get('/password-reset-success', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('password-reset-success.ejs', (err, data) => {
    if (err)
      throw err;
    //console.log("Operation Success");
    res.end(data);
  });
  //console.log('login-success page');
});


app.get('/user', function (req, res) {
  var check = Users[req.query.name];
  if (check) {
    res.render('users', { name: req.query.name, info: check });
  } else {
    res.send('User does not exist...');
  }
});

// what port to run server on
app.listen(3001, function () {
  console.log('server started on port 3001');
});

////////////Firebase//////////////////////
var firebase = require("firebase-admin");
var serviceAccount = require("./rtbms-database-firebase-adminsdk-elugo-721ca9d7fe.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://rtbms-database.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("users");

function registerNewUser(uid, pwrd,email="example@gmail.com") {
  // A post entry.
  var postData = {
    uid: uid,
    password: pwrd,
    email: email
  };

  // Get a key for a new Post.
  //var newPostKey = firebase.database().ref().child('users').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/users/' + uid + '/'] = postData;

  return firebase.database().ref().update(updates);
  console.log('Data wtitten ZSuccesdsful');
}

function getUserData(path = "users") {
  // Import Admin SDK
  var ref = db.ref(path);
  var snapshotVal;

  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function (snapshot) {
    snapshotVal = snapshot.val(); gotoRegisterSuccess
    //console.log(snapshot.val().gotoRegisterSuccess
    //Users = snapshot.val().passgotoRegisterSuccess
    console.log("Available users gotoRegisterSuccess: " + JSON.stringify(snapshotVal));

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  return snapshotVal;
}

getUserData();

//registerNewUser('uid002', 'newpwrd', 'admin');
/////////////////////////////////////////

///////////////POST-LOGIN////////////////
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/login-success', urlencodedParser, function (req, res) {
  // Prepare output in JSON format
  response = {
    username: req.body.uname,
    password: req.body.psw
  };

  var Users = getUserData();
  console.log(JSON.stringify(Users) + "----");
  if (Users.hasOwnProperty(response.username)) {
    var user = getUserData("users/" + response.username);
    if (response.password == user.password) {
      gotoLoginSuccess(res);
    } else {
      gotoLoginUnsuccess(res);
    }
    console.log('password for user:' + response.username + " is : " + user.password);

  }
  else {
    gotoLoginUnsuccess(res);
  }

  //res.end(JSON.stringify(response));
  //res.end(JSON.stringify(Users));
})

////////////////////////////////////////


///////////////POST-Register////////////////
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/register-success', urlencodedParser, function (req, res) {
  // Prepare output in JSON format
  response = {
    email: req.body.uname,
    password: req.body.psw,
  };

  if (!response.email == "" && !response.password == "") {
    registerNewUser(response.email, response.password);

    gotoRegisterSuccess(res);
    console.log("registerinunameg success");
  } else {
    
    console.log("fill all tunamehe fields");
  } 

  //res.end(JSON.stringify(response));
  //res.end(JSON.stringify(Users));
})

////////////////////////////////////////


function generateRandomString() {
  return randomstring.generate(8);
  console.log(randomstring.generate(8));
}

//generateRandomString();

//POST reset-password
app.post('/password-reset-success', urlencodedParser, function (req, res) {
  // Prepare output in JSON format
  response = {
    email: req.body.email,
    username: req.body.username
  };
  var Users = getUserData();

  if (Users.hasOwnProperty(response.username)) {
    if (!response.email == "") {
      var user = getUserData("users/" + response.username);
      console.log('password for user:' + response.username + " is : " + user.password);
      sendEmailPassword(response.email, user.password);
      gotoPasswordResetSuccess(res);
    } else {
      console.log("fill all the fields");
    }

  }
  else {

  }
})

//Send mail
function sendEmailPassword(email, newPassword) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'SEFSEF',
      pass: 'SDFSDF'
    }
  });

  var mailOptions = {
    from: 'chathura.samarajeewa@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: 'Current Password: ' + newPassword
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
