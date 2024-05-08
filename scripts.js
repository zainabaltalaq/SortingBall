const numOfBalls = 3
const cylindersArray = []
var pickedBall = null
const timeLimit = 30
const winText = document.getElementById("win")
const playAgain = document.getElementById("playAgain")
const nextLevel = document.getElementById("next")
const timer = document.getElementById("timer")
playAgain.addEventListener("click", reset)

play = true

let timerInterval
function createBall(color) {
  const ball = document.createElement("div")
  ball.className = "ball"
  ball.style.backgroundColor = color
  if (color) {
    ball.style.display = "block"
  }
  return ball
}

function createTable(colorArray) {
  const stack = []
  for (i = 0; i < colorArray.length; i++) {
    stack.push(createBall(colorArray[i]))
  }
  cylindersArray.push(stack)
}

function add() {
  for (let i = 0; i < cylindersArray.length; i++) {
    const cylinderDiv = document.createElement("div")
    cylinderDiv.className = "cylinder"
    if (cylindersArray[i].length > 0)
      for (let j = cylindersArray[i].length - 1; j >= 0; j--) {
        if (cylindersArray[i][j]) {
          cylinderDiv.appendChild(cylindersArray[i][j])
        }
      }
    document.querySelector("main").appendChild(cylinderDiv)

    cylinderDiv.addEventListener("click", function () {
      if (!play) {
        return
      }
      if (pickedBall) {
        if (cylindersArray[i].length >= numOfBalls) {
          return
        }
        cylindersArray[i].push(pickedBall)
        cylinderDiv.insertBefore(pickedBall, cylinderDiv.firstChild)
        pickedBall = null
        checkWinner()
      } else {
        if (cylindersArray[i].length > 0 && cylinderDiv.firstChild) {
          cylinderDiv.removeChild(cylinderDiv.firstChild)
          pickedBall = cylindersArray[i].pop()
        }
      }
    })
  }
}
let purple = 0
let pink = 0
function checkWinner() {
  for (let i = 0; i < cylindersArray.length; i++) {
    if (cylindersArray[i].length > 0) {
      let countpink = 0
      let countpurple = 0
      for (let j = 0; j < cylindersArray[i].length; j++) {
        if (cylindersArray[i][j].style.backgroundColor === "pink") {
          countpink++
        }
        if (countpink === 3) {
          pink = countpink
        }
        if (cylindersArray[i][j].style.backgroundColor === "purple") {
          countpurple++
        }
        if (countpurple === 3) {
          purple = countpurple
        }

        if (purple === 3 && pink === 3) {
          winText.innerText = "Winner Winner chicken dinner!"
          nextLevel.style.display = "block"
          play = false
          clearInterval(timerInterval)
          return
        }
      }
    }
  }
  purple = 0
  pink = 0
}

function reset() {
  play = true
  winText.innerText = ""
  document.querySelector("main").innerHTML = ""
  cylindersArray.length = 0
  nextLevel.style.display = "none"
  green = 0
  yellow = 0
  clearInterval(timerInterval)
  createTable(["purple", "pink", "purple"])
  createTable(["pink", "purple", "pink"])
  createTable([])
  add()
  startTimer()
}

function startTimer() {
  let timeLeft = timeLimit
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--
      timer.textContent = timeLeft
    } else {
      clearInterval(timerInterval)
      window.location.href = "looser.html"
    }
  }, 1000)
}

createTable(["purple", "pink", "purple"])
createTable(["pink", "purple", "pink"])
createTable([])
add()
startTimer()
