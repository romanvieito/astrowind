import pg from 'pg';

// Make sure we DO NOT "prerender" this function to allow the ENV variables to update on the fly
export const prerender = false;

const client = new pg.Client({
  connectionString: import.meta.env.POSTGRES_URL,
});

await client.connect()

export { client as db };