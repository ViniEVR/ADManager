const express = require("express");
const { execFile } = require("child-process-promise");
const cors = require("cors");
const app = express();
app.use(cors());

const port = 3000;

app.get("/run-script/scripts/:scriptName", async (req, res) => {   

  const scriptName = req.params.scriptName;
  const scriptPath = `scripts/${scriptName}`;
  const { Username, Password, DisplayName, Email, Group } = req.query;

  let scriptOutput = "";
  try {
    scriptOutput = await execFile("powershell.exe", ["-File", scriptPath, Username, Password, DisplayName, Email, Group]);
    if (typeof scriptOutput === "string") {
      const outputJson = JSON.parse(scriptOutput);
      res.send(outputJson);
    } else {
      res.send(scriptOutput);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error running script");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
