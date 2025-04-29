const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const FIRECRAWL_BASE_URL = 'https://api.firecrawl.co/v1';

export interface CrawlOptions {
  url: string;
  maxDepth?: number;
  followLinks?: boolean;
  javascript?: boolean;
  location?: string;
}

export interface CrawlResponse {
  success: boolean;
  data: any;
  error?: string;
}

export async function crawlWebsite(options: CrawlOptions): Promise<CrawlResponse> {
  try {
    const response = await fetch(`${FIRECRAWL_BASE_URL}/crawl`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
      },
      body: JSON.stringify({
        url: options.url,
        max_depth: options.maxDepth || 2,
        follow_links: options.followLinks ?? true,
        javascript: options.javascript ?? false,
        location: options.location || 'Noida',
        filters: {
          location: options.location || 'Noida',
          type: 'health-checkup'
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to crawl website');
    }

    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

export async function getCrawlStatus(crawlId: string): Promise<CrawlResponse> {
  try {
    const response = await fetch(`${FIRECRAWL_BASE_URL}/crawls/${crawlId}`, {
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get crawl status');
    }

    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
} 