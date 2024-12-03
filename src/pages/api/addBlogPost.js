import { Configuration, OpenAIApi } from 'openai';
import { generateText } from 'ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { topic } = req.body;

    // Generate blog post ideas
    const ideasGeneration = await generateText({
      model: 'gpt-4',
      prompt: `Generate 5 creative ideas for a blog post about ${topic}.`,
    });

    // Pick the best idea
    const bestIdeaGeneration = await generateText({
      model: 'gpt-4',
      prompt: `Here are some blog post ideas about ${topic}:
${ideasGeneration}

Pick the best idea from the list above and explain why it's the best.`,
    });

    // Generate the full blog post
    const blogPostGeneration = await generateText({
      model: 'gpt-4',
      prompt: `We've chosen the following blog post idea about ${topic}:
${bestIdeaGeneration}

Create a complete, well-structured blog post based on this idea. Include an engaging title and main content.`,
    });

    return res.status(200).json({
      ideas: ideasGeneration,
      selectedIdea: bestIdeaGeneration,
      blogPost: blogPostGeneration,
    });

  } catch (error) {
    console.error('Error generating blog post:', error);
    return res.status(500).json({ message: 'Error generating blog post' });
  }
}
