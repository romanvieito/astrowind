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
        
        // Single prompt to generate both idea and content
        const blogPostGeneration = await generateText({
            model: openai('gpt-3.5-turbo'),
            prompt: `Write a concise blog post about ${randomTopic}. Include a clear title on the first line. Keep the entire post under 500 words.`,
            temperature: 0.7,
            max_tokens: 800
        });

        // Extract title and content
        const blogPostLines = blogPostGeneration.split('\n');
        const title = blogPostLines[0].replace(/^#\s*/, '').trim();
        const content = blogPostGeneration;

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