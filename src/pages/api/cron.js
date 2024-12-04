import { parseStringPromise } from 'xml2js';
import { sql } from '@vercel/postgres';

export const config = {
  maxDuration: 300
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const papers = await fetchArxivPapers('cat:cs.LG');
    await savePapersToDb(papers);
    
    return res.status(200).json({ message: 'Papers updated successfully' });
  } catch (error) {
    console.error('Cron job failed:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function fetchArxivPapers(query, maxResults = 100) {
  const today = new Date();
  const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
  
  const startDate = lastMonth.toISOString().split('T')[0];
  const endDate = new Date().toISOString().split('T')[0];
  
  const baseUrl = 'http://export.arxiv.org/api/query';
  const fullQuery = `${baseUrl}?search_query=${encodeURIComponent(query)}+AND+submittedDate:[${startDate}+TO+${endDate}]&start=0&max_results=${maxResults}&sortBy=submittedDate&sortOrder=descending`;
  
  const response = await fetch(fullQuery);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }
  
  const xmlData = await response.text();
  const parsedData = await parseStringPromise(xmlData);
  
  return parsedData.feed.entry?.map(entry => ({
    title: entry.title[0],
    abstract: entry.summary[0],
    authors: entry.author?.map(author => author.name[0]),
    arxivId: entry.id[0].split('/abs/')[1],
    pdfUrl: entry.link?.find(link => link.$.title === 'pdf')?.$.href,
    categories: entry.category?.map(cat => cat.$.term),
    publishedDate: new Date(entry.published[0]),
    updatedDate: new Date(entry.updated[0])
  })) || [];
}

async function savePapersToDb(papers) {
  for (const paper of papers) {
    await sql`
      INSERT INTO papers (
        arxiv_id,
        title,
        abstract,
        authors,
        pdf_url,
        categories,
        published_date,
        updated_date
      ) VALUES (
        ${paper.arxivId},
        ${paper.title},
        ${paper.abstract},
        ${paper.authors},
        ${paper.pdfUrl},
        ${paper.categories},
        ${paper.publishedDate},
        ${paper.updatedDate}
      )
      ON CONFLICT (arxiv_id) DO UPDATE SET
        title = EXCLUDED.title,
        abstract = EXCLUDED.abstract,
        authors = EXCLUDED.authors,
        pdf_url = EXCLUDED.pdf_url,
        categories = EXCLUDED.categories,
        published_date = EXCLUDED.published_date,
        updated_date = EXCLUDED.updated_date
    `;
  }
}
