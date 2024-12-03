import OpenAI from 'openai';
import { sql } from '@vercel/postgres';

// Set maximum duration to 60 seconds
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

        // Generate a topic using OpenAI
        const topicCompletion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: "Summarize the key points of link: https://arxiv.org/pdf/2310.10131. Focus on the most important insights and any unique contributions of the source."
                }
            ],
            temperature: 0.7,
            max_tokens: 60
        });

        const generatedTopic = topicCompletion.choices[0].message.content.trim();
        
        // Generate the blog post using OpenAI directly
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Create a short blog post about ${generatedTopic}, style: https://seths.blog/ by seth godin. Short, simple and easy to digest. Include a clear title on the first line. Keep the entire post under 500 words.`
                }
            ],
            temperature: 0.7,
            max_tokens: 800
        });

        const response = completion.choices[0].message.content;

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