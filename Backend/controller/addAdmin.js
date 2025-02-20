const bcrypt = require("bcrypt");
const User = require("../models/user");

async function createAdmin() {
  const adminExists = await User.findOne({
    email: "zunairaiqbal078@gmail.com",
  });
  if (adminExists) {
    console.log("Admin user already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("1234567890", 10);

  const adminUser = new User({
    name: "Talan Dais",
    email: "TalanDais@gmail.com",
    password: hashedPassword,
    role: "admin",
  });

  await adminUser.save();
  console.log("Admin user created successfully!");
}

module.exports = createAdmin;
