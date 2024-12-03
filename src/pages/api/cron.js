import { generateText } from 'ai';
import { sql } from '@vercel/postgres';
import { openai } from '@ai-sdk/openai';

// Set maximum duration to 60 seconds
export const config = {
  maxDuration: 60
};

/** @type {import('astro').APIRoute} */
export const GET = async ({ request }) => {
    try {
        // Check for authorization
        const authHeader = request.headers.get('Authorization');
        if (authHeader !== `Bearer ${import.meta.env.CRON_SECRET}`) {
            return new Response('Unauthorized', { status: 401 });
        }

        const topics = ['Fitness Tips', 'Workout Plans', 'Nutrition Basics', 'Exercise Science', 'Health Goals'];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        
        // Generate the blog post
        const response = await generateText({
            model: openai('gpt-4o-mini'),
            messages: [
                {
                    role: 'user',
                    content: `Write a concise blog post about ${randomTopic}. Include a clear title on the first line. Keep the entire post under 500 words.`
                }
            ],
            temperature: 0.7,
            max_tokens: 800
        });

        // Extract title and content
        const contentLines = response.content.split('\n');
        const title = contentLines[0].replace(/^#\s*/, '').trim();
        const content = response.content;

        // Save to database
        await sql`
            INSERT INTO blog_posts (title, content, published_at)
            VALUES (${title}, ${content}, NOW())
        `;

        return new Response(JSON.stringify({ 
            message: "Blog post generated and saved successfully",
            savedPost: {
                title,
                published_at: new Date()
            }
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error('Cron error:', error);
        return new Response(JSON.stringify({ 
            error: 'Internal Server Error', 
            details: error.message
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};