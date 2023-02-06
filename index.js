const express = require("express");
const app = express();
const port  = 8000;
const parselogRoute = require('./routes/parselogRoute')
const { logError, returnError, isOperationalError } = require('./utils/errorHandler/errorHandle')

app.use(express.json());

app.use("/log", parselogRoute);

process.on('unhandledRejection', error => {
    throw error
})
   
process.on('uncaughtException', error => {
    logError(error)

    if (!isOperationalError(error)) {
    process.exit(1)
    }
})

app.use(logError)
app.use(returnError)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });