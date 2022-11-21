require('dotenv').config();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.M_USER}:`+
    `${process.env.M_PASSWORD}`+
    `@${process.env.M_HOST}/${process.env.M_PORT}`
  );
}

module.exports = mongoose;