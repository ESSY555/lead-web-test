const bcrypt = require("bcryptjs");
const { sequelize } = require("./config/db");
const User = require("./models/User");

async function seedUser() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database...");

    // Sync database
    await sequelize.sync();
    console.log("Database synced...");

    // Hash password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create user
    const user = await User.create({
      email: "test@mail.com",
      password: hashedPassword
    });

    console.log("✅ User seeded successfully!");
    console.log(`Email: ${user.email}`);
    console.log(`User ID: ${user.id}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
}

seedUser();
