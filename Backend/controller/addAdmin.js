const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createAdmin() {
  const adminExists = await User.findOne({
    email: "zunairaiqbal078@gmail.com",
  });
  if (adminExists) {
    console.log("Admin user already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const adminUser = new User({
    name: "Admin User",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
  });

  await adminUser.save();
  console.log("Admin user created successfully!");
}

createAdmin();
