import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for remote hosted Supabase instances
  max: 10, // Adjust pool size based on your concurrent load limits
  idleTimeoutMillis: 30000,
});
