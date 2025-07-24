import { FormData, InsuranceRecommendation } from '../types';

export async function getInsuranceRecommendation(data: FormData): Promise<InsuranceRecommendation> {
  // Simulate OpenAI API call for demo purposes
  // In production, replace with actual OpenAI API integration
  
  const prompt = `Calculate health insurance recommendation for ${data.name}, aged ${data.age}, in ${data.city}, earning ₹${data.income.toLocaleString('en-IN')}, supporting ${data.dependents} dependents`;
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Calculate cover based on income and dependents
    const baseMultiplier = data.income < 300000 ? 3 : data.income < 500000 ? 4 : 5;
    const dependentMultiplier = 1 + (data.dependents * 0.5);
    const ageMultiplier = data.age > 45 ? 1.2 : data.age > 35 ? 1.1 : 1;
    
    const cover = Math.round((data.income * baseMultiplier * dependentMultiplier * ageMultiplier) / 100000) * 100000;
    
    const reasoning = `Based on your profile, we recommend a cover of ₹${cover.toLocaleString('en-IN')}. This considers your age (${data.age}), income level, location in ${data.city}, and ${data.dependents} dependents. This amount provides adequate protection while keeping premiums affordable.`;
    
    return {
      cover,
      reasoning
    };
    
    // Production OpenAI integration would look like:
    /*
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `${prompt}. Respond with JSON format: {"cover": number, "reasoning": string}`
        }],
        max_tokens: 200,
      }),
    });
    
    const result = await response.json();
    return JSON.parse(result.choices[0].message.content);
    */
  } catch (error) {
    console.error('Error getting insurance recommendation:', error);
    throw new Error('Failed to get insurance recommendation. Please try again.');
  }
}