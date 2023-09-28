let teamOneScore = 0;
let teamOneWickets = 0;
let teamOneBalls = 0;

let teamTwoScore = 0;
let teamTwoWickets = 0;
let teamTwoBalls = 0;

const availableInputs = [1, 2, 3, 4, 5, 6, 0, "Catch", "Bold"];
let currentPlayer = "Team One";
let ballsPerOver = 6; // Each team plays one over (6 balls)
let maxWickets = 5; // Maximum of 5 wickets for each team

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
      // Batsman dismissed
      teamOneWickets++;
    } else {
      // Update score based on the input
      teamOneScore += input;
    }

    // Update balls for Team One
    teamOneBalls++;

    // Update the score display for Team One
    updateTeamOneScore();

    // Display the ball's outcome
    document.getElementById(
      "out"
    ).textContent = `Ball ${teamOneBalls}: ${input}`;

    // Check if Team One has reached the maximum wickets
    if (teamOneWickets === maxWickets) {
      switchTeam();
      document.getElementById("playButton").textContent =
        "Play Ball (Team Two)";
    }
  } else if (currentPlayer === "Team Two" && teamTwoBalls < ballsPerOver) {
    const input = getRandomInput();

    // Check if the over is complete before checking for wickets
    if (teamTwoBalls === ballsPerOver - 1) {
      // Implement logic for determining the winner and ending the game
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
      // Batsman dismissed
      teamTwoWickets++;
    } else {
      // Update score based on the input
      teamTwoScore += input;
    }

    // Update balls for Team Two
    teamTwoBalls++;

    // Update the score display for Team Two
    updateTeamTwoScore();

    // Display the ball's outcome
    document.getElementById(
      "out"
    ).textContent = `Ball ${teamTwoBalls}: ${input}`;

    // Check if Team Two has reached the maximum wickets
    if (teamTwoWickets === maxWickets) {
      switchTeam();
      document.getElementById("playButton").textContent =
        "Play Ball (Team Two)";
    }
  }
}
