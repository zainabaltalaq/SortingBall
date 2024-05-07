const numOfBalls = 3
const cylindersArray = []
var pickedBall = null

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
    for (let j = 0; j < cylindersArray[i].length; j++) {
      if (cylindersArray[i][j]) {
        cylinderDiv.appendChild(cylindersArray[i][j])
      }
    }
    document.querySelector("main").appendChild(cylinderDiv)

    cylinderDiv.addEventListener("click", function () {
      if (pickedBall) {
        if (cylindersArray[i].length >= numOfBalls) {
          return
        }
        cylindersArray[i].push(pickedBall)
        cylinderDiv.appendChild(pickedBall)
        //cylinderDiv.insertBefore(pickedBall, cylinderDiv.firstChild)
        pickedBall = null
      } else {
        if (cylindersArray[i].length > 0 && cylinderDiv.firstChild) {
          cylinderDiv.removeChild(cylinderDiv.firstChild)
          pickedBall = cylindersArray[i].shift()
        }
      }
    })
  }
}

createTable(["green", "yellow", "green"])
createTable(["yellow", "green", "yellow"])
createTable([])
add()
