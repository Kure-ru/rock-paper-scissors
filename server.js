//Express code for refactoring
const express = require("express");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.static("public")); // read files from public folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/index.html");
  res.render('index')
});

app.get("/api", (req, res) => {
  playerChoice = req.query.userchoice;
  console.log(playerChoice); //log user's choice
  //get bot choice
  const botChoiceValue = botChoice.value();
  //get game result
  const gameResultValue = gameResult.result(playerChoice, botChoiceValue);
  //create js object
  //create an object to store bot choice
  const objToJson = {
    playerChoice: playerChoice,
    bot: botChoiceValue,
    result: gameResultValue,
  };
  res.send(objToJson);
});

const botChoice = {
  value() {
    //generate random integer
    botValue = Math.ceil(Math.random() * 3);
    //use switch statement to map integer with string value
    switch (botValue) {
      case 1:
        return "rock";
        break;
      case 2:
        return "paper";
        break;
      case 3:
        return "scissors";
        break;
      default:
        return "Error";
    }
  },
};

//create object to store game result
const gameResult = {
  //pass in arguments
  result(playerChoice, botChoiceValue) {
    //conditional statement to determine game winner
    if (playerChoice === botChoiceValue) {
      return "Draw";
    } else if (
      (playerChoice === "rock" && botChoiceValue === "scissors") ||
      (playerChoice === "paper" && botChoiceValue === "rock") ||
      (playerChoice === "scissors" && botChoiceValue === "paper")
    ) {
      return "You Win";
    } else {
      return "You Lose";
    }
  },
};

// const server = http.createServer((req, res) => {
//   const page = url.parse(req.url).pathname;
//   const params = querystring.parse(url.parse(req.url).query);
//   console.log(page);
//   if (page == '/') {
//     fs.readFile('index.html', function(err, data) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       res.end();
//     });
//   }else if (page == '/api') {
//     if('userchoice' in params){
//       //get userchoice
//       const playerChoice = params["userchoice"];
//       //get botchoice
//       const botChoiceValue = botChoice.value();
//       //get game result
//       const gameResultValue = gameResult.result(playerChoice, botChoiceValue)
//       //create js object
//         const objToJson = {
//           playerChoice: playerChoice,
//           bot: botChoiceValue,
//           result: gameResultValue,
//         }
//       res.writeHead(200, {'Content-Type': 'application/json'});
//       res.end(JSON.stringify(objToJson));
//     }
//   }else if (page == '/css/style.css'){
//     fs.readFile('css/style.css', function(err, data) {
//       res.write(data);
//       res.end();
//     });
//   }else if (page == '/js/main.js'){
//     fs.readFile('js/main.js', function(err, data) {
//       res.writeHead(200, {'Content-Type': 'text/javascript'});
//       res.write(data);
//       res.end();
//     });
//   }else{
//     figlet('404!!', function(err, data) {
//       if (err) {
//           console.log('Something went wrong...');
//           console.dir(err);
//           return;
//       }
//       res.write(data);
//       res.end();
//     })
//   }
// })
// server.listen(8000)

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}!`);
});
