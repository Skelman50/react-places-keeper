const { dbConnect } = require("./mongo");

exports.startApp = async (app, port) => {
  try {
    await dbConnect();
    app.listen(port, console.log(`Server run on port: ${port}`));
  } catch (error) {
    console.error(error);
  }
};
