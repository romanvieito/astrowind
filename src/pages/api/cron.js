import OpenAI from 'openai';
import { sql } from '@vercel/postgres';
import puppeteer from 'puppeteer';

// Set maximum duration to 5 minutes
export const config = {
  maxDuration: 300
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


        const paper = "https://arxiv.org/abs/2407.08101";
        
        // Add paper scraping with timeout and optimization
        const browser = await puppeteer.launch({
            args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            timeout: 30000, // 30 second timeout
        });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(30000); // 30 second navigation timeout
        
        // Only wait for the specific content we need
        await page.goto(paper, {
            waitUntil: 'domcontentloaded' // Changed from 'networkidle0' for faster loading
        });
        
        // More specific content extraction
        const paperContent = await page.evaluate(() => {
            const abstract = document.querySelector('.abstract').innerText;
            const title = document.querySelector('.title').innerText;
            return `${title}\n\n${abstract}`;
        });
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
                    content: `Write a blog post about ${blogPostTopic} in Seth Godin’s style. Keep it friendly, simple, and engaging. Use short, impactful sentences. Limit the post to 500 words or less. Every word should earn its place.`
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