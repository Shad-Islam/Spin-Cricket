let teamOneScore = 0;
let teamOneWickets = 0;
let teamOneBalls = 0;

let teamTwoScore = 0;
let teamTwoWickets = 0;
let teamTwoBalls = 0;

const availableInputs = [1, 2, 3, 4, 5, 6, 0, "Catch", "Bold"];
let currentPlayer = "Team One";
let ballsPerOver = 6; 
let maxWickets = 5; 

function getRandomInput() {
  const randomIndex = Math.floor(Math.random() * availableInputs.length);
  return availableInputs[randomIndex];
}

function updateTeamOneScore() {
  document.getElementById(
    "teamOneScore"
  ).textContent = `Score ${teamOneScore} - ${teamOneWickets}`;
  document.getElementById(
    "teamOneWickets"
  ).textContent = `Wickets ${teamOneWickets}`;
}

function updateTeamTwoScore() {
  document.getElementById(
    "teamTwoScore"
  ).textContent = `Score ${teamTwoScore} - ${teamTwoWickets}`;
  document.getElementById(
    "teamTwoWickets"
  ).textContent = `Wickets ${teamTwoWickets}`;
}

function switchTeam() {
  currentPlayer = currentPlayer === "Team One" ? "Team Two" : "Team One";
  document.getElementById("out").textContent = "Out";
}

function simulateBall() {
  if (currentPlayer === "Team One" && teamOneBalls < ballsPerOver) {
    const input = getRandomInput();

    // Check if the over is complete before checking for wickets
    if (teamOneBalls === ballsPerOver - 1) {
      switchTeam();
      document.getElementById("playButton").textContent =
        "Play Ball (Team Two)";
    }

    if (input === "Catch" || input === "Bold") {
     
      teamOneWickets++;
    } else {
      
      teamOneScore += input;
    }
    teamOneBalls++;
    updateTeamOneScore();
    document.getElementById(
      "out"
    ).textContent = `Ball ${teamOneBalls}: ${input}`;
    if (teamOneWickets === maxWickets) {
      switchTeam();
      document.getElementById("playButton").textContent =
        "Play Ball (Team Two)";
    }
  } else if (currentPlayer === "Team Two" && teamTwoBalls < ballsPerOver) {
    const input = getRandomInput();

    if (teamTwoBalls === ballsPerOver - 1) {
     
      if (teamOneScore > teamTwoScore) {
        document.getElementById("out").textContent = "Team One Wins!";
      } else if (teamTwoScore > teamOneScore) {
        document.getElementById("out").textContent = "Team Two Wins!";
      } else {
        document.getElementById("out").textContent = "It's a Tie!";
      }
      document.getElementById("playButton").disabled = true;
      return;
    }

    if (input === "Catch" || input === "Bold") {
      teamTwoWickets++;
    } else {
      teamTwoScore += input;
    }
    teamTwoBalls++;
    updateTeamTwoScore();
    document.getElementById(
      "out"
    ).textContent = `Ball ${teamTwoBalls}: ${input}`;
    if (teamTwoWickets === maxWickets) {
      switchTeam();
      document.getElementById("playButton").textContent =
        "Play Ball (Team Two)";
    }
  }
}
