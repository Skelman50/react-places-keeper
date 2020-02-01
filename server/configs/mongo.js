const mongoose = require("mongoose");

exports.dbConnect = async () => {
  await mongoose.connect("mongodb://localhost/react-places?retryWrites=false", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("DB STARTED");
};
