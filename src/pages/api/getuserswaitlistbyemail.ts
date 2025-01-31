import type { APIRoute } from 'astro';
import { getUsersWaitListByEmail } from '../../utils/dbquery';
import type { TUserWaitList } from '~/types';

export const POST: APIRoute = async ({ request }) => {
    
  const data = await request.json() as TUserWaitList;

  try {
    const usersearch = await getUsersWaitListByEmail(data.email!);
    return new Response(JSON.stringify(usersearch), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 400
    });    
  }
};