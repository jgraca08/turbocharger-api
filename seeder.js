const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Brand = require('./models/Brand');
const Turbo = require('./models/Turbo');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Read JSON files
const brands = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/brands.json`, 'utf-8')
);

const turbos = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/turbos.json`, 'utf-8')
  );

// Import into DB
const importData = async () => {
  try {
    await Brand.create(brands);

    await Turbo.create(turbos);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Brand.deleteMany();
    await Turbo.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}