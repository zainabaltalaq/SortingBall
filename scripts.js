function createBall() {
  const ball = document.createElement("div")
  ball.className = "ball"
  ball.style.display = "block"
  ball.draggable = true
  ball.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id)
  })
  return ball
}

function createTable(color1, color2, number) {
  let balls = 3
  const table = document.createElement("table")
  const row = document.createElement("tr")
  for (let i = 0; i < balls; i++) {
    if (number === 1) {
      const ball = createBall()
      ball.id = `ball${i + 1}`
      ball.style.backgroundColor = i % 2 === 0 ? color1 : color2
      row.appendChild(ball)
    }

    table.appendChild(row)
  }
  document.querySelector("main").appendChild(table)
}

const cylinder = document.querySelector("main")
cylinder.addEventListener("dragover", (event) => {
  event.preventDefault()
})

cylinder.addEventListener("drop", (event) => {
  event.preventDefault()
  const ballId = event.dataTransfer.getData("text/plain")
  const ball = document.getElementById(ballId)

  if (ball) {
    const targetTable = event.target.closest("table")
    if (targetTable) {
      const lastRow = targetTable.querySelector("tr")
      lastRow.appendChild(ball)
    }
  }
})

createTable("yellow", "green", 1)
createTable("green", "yellow", 1)
createTable()
