import { createPool } from '@vercel/postgres';

// Make sure we DO NOT "prerender" this function to allow the ENV variables to update on the fly
export const prerender = false;

const client = createPool({
  connectionString: import.meta.env.POSTGRES_URL,
});

export { client as dbv2 };