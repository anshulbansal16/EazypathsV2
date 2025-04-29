'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Send, MessageCircle } from "lucide-react";

interface Source {
  title: string;
  url: string;
}

interface AIResponse {
  answer: string;
  sources: Source[];
}

export default function AskAI() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = typeof window !== 'undefined' ? useRouter() : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const data = await res.json();
      setResponse(data);

      // Navigate to /recommendations after successful submission
      if (router) {
        router.push('/recommendations');
      }
    } catch (err) {
      setError('Failed to get answer. Please try again.');
      console.error('Error asking AI:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <Card className="p-6 bg-white shadow-lg rounded-lg">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-primary">
            <MessageCircle className="h-6 w-6" />
            <h2>Ingredient Expert AI</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about any cosmetic ingredient..."
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading || !question.trim()}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          {response && (
            <div className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{response.answer}</p>
              </div>
              
              {response.sources && response.sources.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">Sources:</h3>
                  <ul className="text-sm space-y-1">
                    {response.sources.map((source, index) => (
                      <li key={index}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {source.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
} 