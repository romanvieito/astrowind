import type { APIRoute } from 'astro';
import { getUsersWaitList } from '../../utils/dbquery';

export const GET: APIRoute = async () => {
    
  const users = await getUsersWaitList();
  //console.log('data from server: ', users);

  if (!users) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found users waitlist'
    });
  }
  
  return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};