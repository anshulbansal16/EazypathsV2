import { WebCrawler } from '../components/WebCrawler';
import dynamic from 'next/dynamic';

const AskAI = dynamic(() => import('@/components/AskAI'), { ssr: false });

export default function CrawlerPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Web Crawler</h1>
      <WebCrawler />
      <AskAI />
    </div>
  );
} 