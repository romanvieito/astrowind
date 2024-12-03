/** @type {import('astro').APIRoute} */
export const GET = async ({ request }) => {
    try {
        // Check for authorization
        const authHeader = request.headers.get('Authorization');
        if (authHeader !== `Bearer ${import.meta.env.CRON_SECRET}`) {
            return new Response('Unauthorized', { status: 401 });
        }

        // Generate blog post content using AI
        const blogPost = {
            publishDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
            title: "Sample AI Generated Title",
            content: "Sample AI Generated Content"
        };

        // Create the markdown content
        const markdownContent = `---
publishDate: ${blogPost.publishDate}
title: ${blogPost.title}
---
${blogPost.content}`;

        // Generate a unique filename (you might want to implement your own naming logic)
        const postNumber = Math.floor(Math.random() * 1000);
        const filePath = `src/content/post/${postNumber}.md`;

        // Write to file system
        const fs = await import('fs/promises');
        await fs.writeFile(filePath, markdownContent);
        
        console.log(`Blog post created: ${filePath}`);
        
        return new Response(JSON.stringify({ message: "Blog post generated successfully", filePath }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error('Cron error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};