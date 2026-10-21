import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(import.meta.dirname, "../../dev.env"),
});

import { connectDB } from "@/db-connection.js";

import { faker } from "@faker-js/faker";
import Blog from "@/models/blog.entity.js";
import User from "@/models/user.entity.js";
import mongoose from "mongoose";

/**
 * Inserts `count` random blogs, each owned by a randomly picked existing user.
 * Expects an open mongoose connection; returns the number of blogs created.
 */
export async function seedBlogs(count = 20): Promise<number> {
  const authors = await User.find().distinct("_id");
  if (authors.length === 0) {
    throw new Error("Cannot seed blogs: no users exist. Seed users first.");
  }

  const blogs = Array.from({ length: count }, () => ({
    author: faker.helpers.arrayElement(authors),
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    body: faker.lorem.paragraphs({ min: 3, max: 8 }, "\n\n"),
    tags: faker.helpers.uniqueArray(
      faker.word.noun,
      faker.number.int({ min: 1, max: 5 }),
    ),
  }));

  const created = await Blog.insertMany(blogs);
  return created.length;
}

await connectDB();

seedBlogs(process.argv[2] ? parseInt(process.argv[2], 10) : 20)
  .then((count) => {
    console.log(`Seeded ${count} blogs`);
  })
  .catch((err) => {
    console.error("Error seeding blogs:", err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
