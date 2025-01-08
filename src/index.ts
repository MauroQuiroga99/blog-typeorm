import "reflect-metadata";
import app from "./app";
import appDataSource from "./database/ormconfig";

async function main() {
  try {
    await appDataSource.initialize();
    app.listen(3000);
    console.log("Hello Mauro");
    console.log("Server lisening on port", 3000);
  } catch (error) {
    console.log(error);
  }
}

main();
