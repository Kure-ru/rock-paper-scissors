//create an object to store bot choice
const botChoice = {
    value() {
      //generate random integer
      botValue = Math.ceil(Math.random() * 3)
      //use switch statement to map integer with string value
    switch(botValue){
      case 1:
        return "rock"
      break;
      case 2:
       return "paper"
      break;
      case 3:
        return "scissors"
      break;
      default: 
        return "Error"
      }
    }
  }
  
  //create object to store game result
  const gameResult = {
    //pass in arguments
    result(playerChoice, botChoiceValue) {
      //conditional statement to determine game winner
      if(playerChoice === botChoiceValue){
        return "Draw"
      }else if(playerChoice === "rock" && botChoiceValue === "scissors" || playerChoice === "paper" && botChoiceValue === "rock" || playerChoice === "scissors" && botChoiceValue === "paper"){
        return "You Win"
      }else{
        return "You Lose"
      }
    }
  }
  
  
  const http = require('http');
  const fs = require('fs')
  const url = require('url');
  const querystring = require('querystring');
  const figlet = require('figlet')
  
  const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if (page == '/') {
      fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }else if (page == '/api') {
      if('userchoice' in params){
        //get userchoice
        const playerChoice = params["userchoice"];
        //get botchoice
        const botChoiceValue = botChoice.value();
        //get game result
        const gameResultValue = gameResult.result(playerChoice, botChoiceValue)
        //create js object
          const objToJson = {
            playerChoice: playerChoice,
            bot: botChoiceValue,
            result: gameResultValue,
          }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(objToJson));
      }   
    }else if (page == '/css/style.css'){
      fs.readFile('css/style.css', function(err, data) {
        res.write(data);
        res.end();
      });
    }else if (page == '/js/main.js'){
      fs.readFile('js/main.js', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
      });
    }else{
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      })
    }
  })
  server.listen(8000)