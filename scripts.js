// Define the table variable outside functions so it's accessible everywhere
const table = document.createElement("table")
const table2 = document.createElement("table")

function createBall(ballArray) {
  const ball = document.createElement("div")
  ball.className = "ball"
  ball.style.display = "inline-block"
  ball.draggable = true
  ballArray.push(ball)
  return ball
}

function createTable(color1, color2) {
  const ballArray = []
  const rows = 3
  const ballsPerRow = 1
  table.id = "cylinder"

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr")
    for (let j = 0; j < ballsPerRow; j++) {
      const ball = createBall(ballArray)
      ball.style.backgroundColor = i % 2 === 0 ? color1 : color2
      const cell = document.createElement("td")
      cell.appendChild(ball)
      row.appendChild(cell)
    }
    table.appendChild(row)
  }

  document.querySelector("main").appendChild(table)

  ballArray.forEach((ball) => {
    ball.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", ball.id)
    })
  })
}

function empty() {
  table.id = "cylinder"
  const rows = 3
  const cellsPerRow = 1
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr")
    for (let j = 0; j < cellsPerRow; j++) {
      const cell = document.createElement("td")
      row.appendChild(cell)
    }
    table2.appendChild(row)
  }

  document.querySelector("main").appendChild(table2)

  // Add dragover and drop event listeners to the empty table
  table.addEventListener("dragover", (event) => {
    event.preventDefault()
  })

  table.addEventListener("drop", (event) => {
    event.preventDefault()
    const data = event.dataTransfer.getData("text/plain")
    const draggedElement = document.getElementById(data)

    if (draggedElement.classList.contains("ball")) {
      const targetCell = event.target.closest("td")
      targetCell.appendChild(draggedElement)
    }
  })
}

createTable("blue", "yellow")
empty()
