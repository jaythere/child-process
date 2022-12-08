const express = require("express");
const { fork } = require("child_process");

const app = express();

app.get("/heavy-calculation", (req, res) => {
  const sum = heavyCalculation();
  res.send({ sum: sum });
});

app.get("/heavy-async-calculation", async (req, res) => {
  const sum = await heavyAsyncOperation();
  res.send({ sum: sum });
});

app.get("/heavy-calculation-with-fork", (req, res) => {
  const child = fork("./heavy-processing-task.js");
  child.send("start");
  child.on("message", (sum) => {
    res.send({ sum: sum });
  });
});

app.listen(3000, () =>
  console.log(
    `server on port 3000...\nHit below endpoints\nhttp://localhost:3000/heavy-calculation\nhttp://localhost:3000/heavy-async-calculation\nhttp://localhost:3000/heavy-calculation-with-fork`
  )
);

function heavyCalculation() {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }
  return sum;
}

function heavyAsyncOperation() {
  return new Promise((resolve, reject) => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
      sum += i;
    }
    resolve(sum);
  });
}
