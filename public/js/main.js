// document.querySelector('#clickMe').addEventListener('click', makeReq)

document.querySelectorAll('.choice__button').forEach((button) => {
  button.addEventListener('click', () => {
    makeReq(button.value);
  });
});

//creating localStorage to retain score across sessions, localstorage is client side only, however I may look at doing something server based instead, but that requires databases
if (!localStorage.getItem('playersScore')) {
  localStorage.setItem('playersScore', 0);
}

if (!localStorage.getItem('botsScore')) {
  localStorage.setItem('botsScore', 0);
}

let playerScoreVal = Number(localStorage.getItem('playersScore'));
let botScoreVal = Number(localStorage.getItem('botsScore'));

document.querySelector('#playerpoints').innerText = playerScoreVal;
document.querySelector('#botpoints').innerText = botScoreVal;

//originally  for the switch case statement the contents of these functions were inside the conditionals, however it looked verbose, to tidy it up I've created three functions before, and based on the result, will call the appropriate function to determine the score
function youWin() {
  (playerScoreVal += 1), localStorage.setItem('playersScore', playerScoreVal);
}

function youLose() {
  botScoreVal += 1;
  localStorage.setItem('botsScore', botScoreVal);
}

function draw() {
  console.log('you drew');
}

//after a game, this will update the scores without needed to refresh, because at the end of the makeReq function, this function is called.
function updateDisplayedScores() {
  document.querySelector('#playerpoints').innerText = playerScoreVal;
  document.querySelector('#botpoints').innerText = botScoreVal;
  //check if player or computer has 3 wins
  checkEndGame(playerScoreVal, botScoreVal);
}

const checkEndGame = () => {
  if (playerScoreVal === 3) {
    document.querySelector('#result').innerHTML = 'YOU WIN!!';
    playerScoreVal = 0;
    botScoreVal = 0;
  } else if (botScoreVal === 3) {
    document.querySelector('#result').innerHTML = 'GAME OVER';
    playerScoreVal = 0;
    botScoreVal = 0;
  }
};

async function makeReq(choiceValue) {
  // const playerChoice = document.querySelectorAll("button").value; //grab the players choice
  let playerChoice = choiceValue;
  const res = await fetch(`/api?userchoice=${playerChoice}`); //the choice is used as the query parameter for the API, which is requested to the server.
  const data = await res.json();

  console.log(data);
  // document.querySelector("#playersdecision").textContent = data.playerChoice
  // document.querySelector("#botsdecision").textContent = data.bot
  document.querySelector('#result').textContent = data.result;

  const playerSelectionButton = document.querySelector(`#${data.playerChoice}`);
  const botSelectionButton = document.querySelector(`#${data.bot}`);

  playerSelectionButton.classList.add(`player__selection`);
  botSelectionButton.classList.add(`bot__selection`);

  setTimeout(() => {
    playerSelectionButton.classList.remove('player__selection');
    botSelectionButton.classList.remove('bot__selection');
  }, '800');

  switch (data.result) {
    case 'You Win':
      youWin();
      break;
    case 'You Lose':
      youLose();
      break;
    case 'Draw':
      draw();
      break;
    default:
      console.error('incorrect result');
  }
  updateDisplayedScores();
}
