import type { TUserWaitList } from '~/types';
import { db } from './dbclient';

export async function getUsersWaitList() {
    const query = 'SELECT * FROM users_waitlist';
    try {
        const res = await db.query(query);
        return res.rows;
    } catch (err) {
        console.error('Error fetching users waitlist:', err);
        throw err;
    }
}

export async function getUsersWaitListByEmail(email: string) {
    const query = 'SELECT * FROM users_waitlist WHERE email = $1';
    try {
      const res = await db.query(query, [email]);
      return res.rows[0];
    } catch (err) {
      console.error('Error fetching users waitlist:', err);
      throw err;
    }
}

export async function addUsersWaitList(data: TUserWaitList) {

  const temp = await getUsersWaitListByEmail(data.email!);
  return temp;
  /*
  if (!temp) {
    const keys = Object.keys(data).join(', ');
    const values = Object.values(data);  
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO users_waitlist (${keys}) VALUES (${placeholders}) RETURNING *`;
    try {
      const res = await db.query(query, values);
      return res.rows[0];
    } catch (err) {
      console.error('Error inserting data:', err);
      throw err;
    }
  }
  else throw Error('The user already exists');
  */
}