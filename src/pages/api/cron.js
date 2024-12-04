import OpenAI from 'openai';
import { sql } from '@vercel/postgres';

// Set maximum duration to 5 minutes
export const config = {
  maxDuration: 60
};

const openai = new OpenAI({
    apiKey: import.meta.env.OPENAI_API_KEY
});

/** @type {import('astro').APIRoute} */
export const GET = async ({ request }) => {
    try {
        // Check for authorization
        const authHeader = request.headers.get('Authorization');
        if (authHeader !== `Bearer ${import.meta.env.CRON_SECRET}`) {
            return new Response('Unauthorized', { status: 401 });
        }

        // Generate a random topic for the blog post
        const topicResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: "Generate an interesting blog topic about technology, business, or marketing. Be specific but concise."
                }
            ],
            temperature: 0.8,
            max_tokens: 50
        });

        const blogPostTopic = topicResponse.choices[0].message.content.trim();
        
        // Generate the blog post using OpenAI
        const blogPostText = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Write a blog post about ${blogPostTopic} in Seth Godin's style. Keep it friendly, simple, and engaging. Use short, impactful sentences. Limit the post to 500 words or less. Every word should earn its place.`
                }
            ],
            temperature: 0.7,
            max_tokens: 800
        });

        const response = blogPostText.choices[0].message.content;

        // Extract title and content
        const lines = response.split('\n');
        const title = lines[0].replace(/^#\s*/, '').trim();
        const content = response;

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
