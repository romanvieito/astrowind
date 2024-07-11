import type { APIRoute } from 'astro';
import { addUsersWaitList } from '../../utils/dbquery';
import type { TUserWaitList } from '~/types';

export const POST: APIRoute = async ({ request }) => {
    
  const data = await request.json() as TUserWaitList;

  try {
    const useradded = await addUsersWaitList(data);
    if (!useradded) {
      return new Response(null, {
        status: 404,
        statusText: 'Not add user waitlist'
      });
    }
    return new Response(JSON.stringify(useradded), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(null, {
      status: 400,
      statusText: error.message
    });    
  }
};