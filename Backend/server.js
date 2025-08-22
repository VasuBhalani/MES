import app from "./app.js";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
// import connectToDatabase from "./src/config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
// connectToDatabase();
// hash-password.js

// async function hashPassword(plainTextPassword) {
//   const saltRounds = 10;
//   const hashed = await bcrypt.hash(plainTextPassword, saltRounds);
//   console.log("Hashed Password:", hashed);
// }

// hashPassword("1234");  // replace with your password


app.listen(PORT,() => {
    console.log(`→_→ 🌍 🖥️ Server running on http://localhost:${PORT} 🚀 ^_____^;)`);
});