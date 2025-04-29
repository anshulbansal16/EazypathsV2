import { AskAI } from "@/components/AskAI";

export default function AskPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Ingredient Expert AI</h1>
          <p className="text-gray-600">
            Ask anything about cosmetic ingredients & formulations
          </p>
        </div>
        <AskAI />
      </main>
    </div>
  );
} 