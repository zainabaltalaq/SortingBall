const numOfBalls = 3
const cylindersArray = []
var pickedBall = null
const winText = document.getElementById("win")
play = true

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
let green = 0
let yellow = 0
function checkWinner() {
  for (let i = 0; i < cylindersArray.length; i++) {
    if (cylindersArray[i].length > 0) {
      let countYellow = 0
      let countGreen = 0
      for (let j = 0; j < cylindersArray[i].length; j++) {
        if (cylindersArray[i][j].style.backgroundColor === "yellow") {
          countYellow++
        }
        if (countYellow === 3) {
          yellow = countYellow
        }
        if (cylindersArray[i][j].style.backgroundColor === "green") {
          countGreen++
        }
        if (countGreen === 3) {
          green = countGreen
        }

        if (green === 3 && yellow === 3) {
          winText.innerText = "Winner Winner chicken dinner!"
          play = false
          return
        }
      }
    }
  }
  green = 0
  yellow = 0
}

createTable(["green", "yellow", "green"])
createTable(["yellow", "green", "yellow"])
createTable([])
add()
