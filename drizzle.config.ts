import { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: String(process.env.NODE_DATABASE_URL),
  },
} satisfies Config;
