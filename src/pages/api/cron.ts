import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
    // Check for authorization
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${import.meta.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    // Your cron job logic here
    console.log("Cron job executed!");
    
    return new Response(JSON.stringify({ message: "Cron job executed successfully" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}; 