import type { APIRoute } from 'astro';
import { dbv2 } from '../../utils/dbclientv2';

export const GET: APIRoute = async ({ request }) => {

    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
        return new Response('No api key provided', {
            status: 401,
            headers: {
                "Content-Type": "text/plain"
            }
        });
    }

    const apikey = authHeader.split(' ')[1]; // Asumimos que el formato es "Bearer <token>"

    // Verificar el api key
    const isValid = validateApiKey(apikey);
    if (!isValid) {
        return new Response('Invalid api key', {
            status: 403,
            headers: {
                "Content-Type": "text/plain"
            }
        });
    }

    const client = await dbv2.connect();

    try {
        const result = await client.sql`SELECT token FROM tokens ORDER BY created_at DESC LIMIT 1;`;
        const token = result.rows[0]?.token;

        console.log('data from server: ', token);

        if (!token) {
            return new Response(null, {
                status: 404,
                statusText: 'Not found users waitlist'
            });
        }

        return new Response(token, {
            status: 200,
            headers: {
                "Content-Type": "text/plain"
            }
        });

    } catch (err) {
        console.error('Error executing query', err);
        return new Response('Error executing query', {
            status: 500,
            headers: {
                "Content-Type": "text/plain"
            }
        });
    } finally {
        client.release(); // Libera el cliente de vuelta al pool
    }
};

const validateApiKey = async (apikey: string) => {
    const token_api_key = import.meta.env.TOKEN_API_KEY || '';
    return token_api_key === apikey;
};