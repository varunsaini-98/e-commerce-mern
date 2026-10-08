import mongoose from "mongoose";
import "dotenv/config";
import productModel from "./models/productModel.js";

const sampleProducts = [
  {
    name: "Classic Cotton Crew Neck T-Shirt",
    description: "Lightweight, breathable 100% premium cotton tee suitable for everyday casual wear.",
    price: 35,
    image: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: true,
    date: Date.now()
  },
  {
    name: "Slim Fit Denim Jacket",
    description: "Classic blue denim jacket featuring dual button chest pockets and sleek brass hardware.",
    price: 85,
    image: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["M", "L", "XL"],
    bestSeller: false,
    date: Date.now()
  },
  {
    name: "Floral Print Summer Dress",
    description: "Elegant lightweight summer dress with soft waist drawstring and flowy silhouette.",
    price: 65,
    image: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    bestSeller: true,
    date: Date.now()
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await productModel.deleteMany({});
    await productModel.insertMany(sampleProducts);
    console.log("Database Seeded Successfully with Sample Products!");
    process.exit();
  } catch (error) {
    console.error("Seeding Failed:", error);
    process.exit(1);
  }
};

seedData();
