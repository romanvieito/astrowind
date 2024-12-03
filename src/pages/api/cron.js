import { generateText } from 'ai';
import { sql } from '@vercel/postgres';

/** @type {import('astro').APIRoute} */
export const GET = async ({ request }) => {
    try {
        // Check for authorization
        const authHeader = request.headers.get('Authorization');
        if (authHeader !== `Bearer ${import.meta.env.CRON_SECRET}`) {
            return new Response('Unauthorized', { status: 401 });
        }

        // Define topics for blog post generation
        const topics = [
            'Ai Fitness Coach',
            'Fitness Best Practices',
            'Fitness Frameworks',
            'Fitness Productivity',
            'Fitness Quality'
        ];
        
        // Randomly select a topic
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        
        // Generate blog post ideas
        const ideasGeneration = await generateText({
            model: 'gpt-4',
            prompt: `Generate 5 creative ideas for a blog post about ${randomTopic}.`,
        });

        // Pick the best idea
        const bestIdeaGeneration = await generateText({
            model: 'gpt-4',
            prompt: `Here are some blog post ideas about ${randomTopic}:
${ideasGeneration}

Pick the best idea from the list above and explain why it's the best.`,
        });

        // Generate the full blog post
        const blogPostGeneration = await generateText({
            model: 'gpt-4',
            prompt: `We've chosen the following blog post idea about ${randomTopic}:
${bestIdeaGeneration}

Create a complete, well-structured blog post based on this idea. Include an engaging title, introduction, main content with subheadings, and a conclusion.`,
        });

        // Extract title from the blog post (assuming it's the first line)
        const blogPostLines = blogPostGeneration.split('\n');
        const title = blogPostLines[0].replace('#', '').trim();
        const content = blogPostGeneration;

        // Save to database
        await sql`
            INSERT INTO blog_posts (title, content, published_at)
            VALUES (${title}, ${content}, NOW())
        `;

        console.log("Blog post generated and saved successfully!", {
            topic: randomTopic,
            title: title,
            selectedIdea: bestIdeaGeneration.slice(0, 100) + '...' // Log preview
        });
        
        return new Response(JSON.stringify({ 
            message: "Blog post generated and saved successfully",
            topic: randomTopic,
            ideas: ideasGeneration,
            selectedIdea: bestIdeaGeneration,
            blogPost: blogPostGeneration,
            savedPost: {
                title,
                content,
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
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};