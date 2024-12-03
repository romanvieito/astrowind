import OpenAI from 'openai';
import { sql } from '@vercel/postgres';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

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


        const paper = "https://arxiv.org/pdf/2310.10131.pdf";
        
        // Add paper scraping
        const browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });
        const page = await browser.newPage();
        await page.goto(paper, {
            waitUntil: 'networkidle0'
        });
        const paperContent = await page.evaluate(() => document.body.innerText);
        await browser.close();

        // Update OpenAI prompt to use scraped content
        const summarizeKeyPoints = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Summarize the key points of this paper content: ${paperContent}. Focus on the most important insights and any unique contributions of the source.`
                }
            ],
            temperature: 0.7,
            max_tokens: 60
        });

        const blogPostTopic = summarizeKeyPoints.choices[0].message.content.trim();
        
        // Generate the blog post using OpenAI directly
        const blogPostText = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Create a short blog post about ${blogPostTopic} in the style of Seth Godin. Focus on clarity, simplicity, and engagement. Keep the entire post under 500 words.`
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