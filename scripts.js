const numOfBalls = 3
const stacks = []
// stacks.addEventListener("click")

function createBall(color) {
  const ball = document.createElement("div")
  ball.className = "ball"
  ball.style.backgroundColor = color
  if (color) {
    ball.style.display = "block"
  }
  return ball
}

function createTable(color1, color2) {
  const stack = []
  stack.push(createBall(color1))
  stack.push(createBall(color2))
  stack.push(createBall(color1))
  stacks.push(stack)
}

function add() {
  for (let i = 0; i < stacks.length; i++) {
    const div = document.createElement("div")
    div.className = "cylinder"
    for (let j = 0; j < stacks[i].length; j++) {
      if (stacks[i][j]) {
        div.appendChild(stacks[i][j])
      }
    }
    document.querySelector("main").appendChild(div)

    div.addEventListener("click", function () {
      if (stacks[i].length > 0) {
        const save = [stacks[i]]
        const ball = stacks[i].shift()
        div.removeChild(div.firstChild)
        console.log("Removed ball")
      }
      console.log("Cylinder clicked!")
    })
  }
}

createTable("green", "yellow")
createTable("yellow", "green")
createTable()
add()
