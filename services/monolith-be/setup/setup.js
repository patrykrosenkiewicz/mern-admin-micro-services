async function createAdmin() {
  try {
    const Admin = require("../models/Admin");
    var newAdmin = new Admin();
    const passwordHash = newAdmin.generateHash("123456");

    await new Admin({
      email: "admin@demo.com",
      password: passwordHash,
      name: "admin",
      surname: "demo",
    }).save();
    console.log("👍👍👍👍👍👍👍👍 Admin created : Done!");
  } catch (e) {
    console.log("\n👎👎👎👎👎👎👎👎 Error! The Error info is below");
    console.log(e);
  }
}

module.exports = createAdmin;
