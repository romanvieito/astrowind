import { Dropbox } from 'dropbox';
import { sql } from '@vercel/postgres';

// Initialize Dropbox with your access token
const dbx = new Dropbox({ 
    accessToken: process.env.DROPBOX_ACCESS_TOKEN
});

async function generateMarkdownFiles() {
    try {
        const result = await sql`
            SELECT title, content, published_at 
            FROM blog_posts 
            ORDER BY published_at ASC;
        `;

        for (let i = 0; i < result.rows.length; i++) {
            const post = result.rows[i];
            const markdownContent = `---
publishDate: ${post.published_at.toISOString()}
title: ${post.title}
---
${post.content}`;

            // Upload to Dropbox
            await dbx.filesUpload({
                path: `/blog-posts/${i + 1}.md`,
                contents: markdownContent
            });
            
            console.log(`Uploaded post ${i + 1} to Dropbox`);
        }

        console.log('All files uploaded to Dropbox!');
    } catch (error) {
        console.error('Error:', error);
    }
}

generateMarkdownFiles(); 
