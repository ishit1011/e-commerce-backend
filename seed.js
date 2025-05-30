const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const ApprovedEmail = require("./models/ApprovedEmails");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    seed();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// console.log('Connecting to:', process.env.MONGO_URI);

async function seed() {
  await Product.deleteMany();
  await User.deleteMany();
  await ApprovedEmail.deleteMany();

  const products = [
    {
      name: "PS5 Console",
      description: "Disc version",
      variants: [
        { color: "White", size: "Standard", price: 500 },
        { color: "Black", size: "Slim", price: 550 },
      ],
      imageUrl: "public/ps5.png",
    },
    {
      name: "iPhone 15 Pro",
      description: "Latest Apple smartphone",
      variants: [
        { color: "Titanium", size: "128GB", price: 999 },
        { color: "Titanium Blue", size: "256GB", price: 1099 },
      ],
      imageUrl: "public/iphone.png",
    },
    {
      name: "MacBook Air M2",
      description: "Lightweight and powerful laptop",
      variants: [
        { color: "Space Gray", size: "8GB RAM / 256GB SSD", price: 1199 },
        { color: "Silver", size: "16GB RAM / 512GB SSD", price: 1499 },
      ],
      imageUrl: "public/macbook.png",
    },
    {
      name: "Bose QuietComfort 45",
      description: "Noise-cancelling wireless headphones",
      variants: [
        { color: "Black", size: "One Size", price: 329 },
        { color: "White Smoke", size: "One Size", price: 329 },
      ],
      imageUrl: "public/bose.png",
    },
    {
      name: "Nike Air Max 270",
      description: "Comfortable running sneakers",
      variants: [
        { color: "Black/White", size: "9", price: 150 },
        { color: "Blue/Orange", size: "10", price: 150 },
      ],
      imageUrl: "public/nike.png",
    },
    {
      name: "Amazon Echo Dot (5th Gen)",
      description: "Smart speaker with Alexa",
      variants: [
        { color: "Charcoal", size: "One Size", price: 50 },
        { color: "Glacier White", size: "One Size", price: 50 },
      ],
      imageUrl: "public/amazonEcho.png",
    },
    {
      name: 'Sony Bravia 55" 4K TV',
      description: "Smart Google TV with HDR",
      variants: [
        { color: "Black", size: "55 inch", price: 799 },
        { color: "Black", size: "65 inch", price: 999 },
      ],
      imageUrl: "public/sonyBravia.png",
    },
  ];

  await Product.insertMany(products);

    const admin1 = await User.create({
        email: "singhishit.06@gmail.com", // Admin 1
        role: "admin",
    });

    const admin2 = await User.create({
        email: "abhishek@zuvees.com", // Admin 2
        role: "admin",
    });

  const rider1 = await User.create({
    email: "isingh2_be21@thapar.edu", // Rider
    role: "rider",
  });

  const rider2 = await User.create({
    email: "crossbaredits@gmail.com",
    role: "rider",
  });


  await ApprovedEmail.insertMany([
    { email: "singhishit.06@gmail.com" }, // Admin 1
    { email: "abhishek@zuvees.com" }, // Admin 2
    { email: "isingh2_be21@thapar.edu" }, // Rider 1
    { email: "crossbaredits@gmail.com" },      // Rider 2
    { email: "ishit.singh003@gmail.com" }, // Regular user
  ]);


  console.log("Seeding complete");
  process.exit();
}

// seed();
