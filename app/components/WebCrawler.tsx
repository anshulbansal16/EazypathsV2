'use client';

import { useState } from 'react';
import { crawlWebsite, CrawlResponse } from '@/lib/firecrawl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function WebCrawler() {
  const [url, setUrl] = useState('');
  const [location, setLocation] = useState('Noida');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CrawlResponse | null>(null);

  const handleCrawl = async () => {
    if (!url) return;

    setLoading(true);
    try {
      const response = await crawlWebsite({
        url,
        maxDepth: 2,
        followLinks: true,
        javascript: false,
        location: location
      });
      setResult(response);
    } catch (error) {
      console.error('Crawling failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="Enter website URL to crawl"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Noida">Noida</SelectItem>
            <SelectItem value="Delhi">Delhi</SelectItem>
            <SelectItem value="Gurgaon">Gurgaon</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleCrawl} disabled={loading}>
          {loading ? 'Crawling...' : 'Start Crawl'}
        </Button>
      </div>

      {result && (
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Crawl Result</h3>
          {result.success ? (
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          ) : (
            <div className="text-red-500">{result.error}</div>
          )}
        </Card>
      )}
    </div>
  );
} 