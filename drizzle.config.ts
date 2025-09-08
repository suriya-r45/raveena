import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./shared/*.ts", // adjust to your schema file
  out: "./drizzle",
  dialect: "postgresql", // or "mysql" / "sqlite"
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
