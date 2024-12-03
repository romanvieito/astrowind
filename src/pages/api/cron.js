import { generateText } from 'ai';
import { sql } from '@vercel/postgres';
import { openai } from '@ai-sdk/openai';

/** @type {import('astro').APIRoute} */
export const GET = async ({ request }) => {
    try {
        // Check for authorization
        const authHeader = request.headers.get('Authorization');
        if (authHeader !== `Bearer ${import.meta.env.CRON_SECRET}`) {
            return new Response('Unauthorized', { status: 401 });
        }

        // Define topics with more focused scope
        const topics = [
            'Ai Fitness Coach',
            'Fitness Best Practices',
            'Fitness Frameworks',
            'Fitness Productivity',
            'Fitness Quality'
        ];
        
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        
        // Combine the first two prompts to reduce API calls
        const combinedPrompt = `Generate 5 creative ideas for a blog post about ${randomTopic}, then select the best idea and explain why it's the best choice.`;
        
        const ideaAndSelection = await generateText({
            model: openai('gpt-4o'),
            prompt: combinedPrompt,
            temperature: 0.7,
            max_tokens: 1000
        });

        // Generate the blog post with a more focused prompt
        const blogPostGeneration = await generateText({
            model: openai('gpt-4o'),
            prompt: `Create a concise but complete blog post about ${randomTopic} based on this idea: ${ideaAndSelection}. Include a clear title, and keep it under 400 words.`,
            temperature: 0.7,
            max_tokens: 1500
        });

        // Extract title and save to database
        const blogPostLines = blogPostGeneration.split('\n');
        const title = blogPostLines[0].replace(/^#\s*/, '').trim();
        const content = blogPostGeneration;

        await sql`
            INSERT INTO blog_posts (title, content, published_at)
            VALUES (${title}, ${content}, NOW())
        `;

        return new Response(JSON.stringify({ 
            message: "Blog post generated and saved successfully",
            savedPost: {
                title,
                content: content.substring(0, 100) + '...',
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
            details: error.message,
            stack: error.stack
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};