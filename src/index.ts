import express from "express";
import {setupApp} from "./setup-app";
import {runDB} from "./db/mongo.db";

const app = express();
setupApp(app);


const PORT = process.env.PORT || 3003;

export const startApp = async () => {

   await runDB();

   app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
   });
}

startApp();

module.exports = app;
