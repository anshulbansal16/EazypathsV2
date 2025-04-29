import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    // Validate the request
    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Here you would typically make a call to your AI service
    // For now, we'll return a mock response
    const response = {
      answer: `Here's what I know about ${question}:
      
Based on available research and cosmetic safety guidelines:

1. Safety Profile: The ingredient has been extensively studied and is generally considered safe for cosmetic use when used as directed.

2. Common Uses: It's frequently found in skincare and personal care products for its specific benefits and properties.

3. Potential Benefits: Research suggests it may provide various advantages in cosmetic formulations.

4. Safety Considerations: As with any ingredient, some individuals may have sensitivities. It's always recommended to patch test new products.

5. Regulatory Status: This ingredient is approved for cosmetic use by major regulatory bodies including the FDA and EMA.

Would you like to know more about any specific aspect of this ingredient?`,
      sources: [
        {
          title: "Cosmetic Ingredient Review",
          url: "https://example.com/research1"
        },
        {
          title: "FDA Cosmetic Safety Database",
          url: "https://example.com/research2"
        }
      ]
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing AI request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 