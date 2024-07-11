import type { APIRoute } from 'astro';
import { addUsersWaitList } from '../../utils/dbquery';
import type { TUserWaitList } from '~/types';

export const POST: APIRoute = async ({ request }) => {
    
  const data = await request.json() as TUserWaitList;

  try {
    const useradded = await addUsersWaitList(data);
    /*if (isNaN(useradded)) {
      return new Response(JSON.stringify({
        message: 'The user already exists'
      }), {
        status: 304
      });
    }*/
    return new Response(JSON.stringify(useradded), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    let error_status = 400;
    if(error.message === 'The user already exists') error_status = 304;
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: error_status,
      headers: {
        'Content-Type': 'application/json',
      },      
    });    
  }
};