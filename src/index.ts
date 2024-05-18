import "dotenv/config";
import sequelize from "./setup/dbSetup";
import app from "./config/express";
import { port } from "./config/appConfig";

(async function () {
  try {
    await sequelize
      .authenticate()
      .then(async () => {
        console.log("Connection has been established successfully.");
        await sequelize.sync({ alter: true });
      })
      .then(() => {
        app.listen(port.port, () => {
          console.log(`Server is running on port ${port.port}`);
        });
      });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
