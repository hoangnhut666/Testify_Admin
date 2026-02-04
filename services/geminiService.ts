
import { GoogleGenAI } from "@google/genai";

// Always use the process.env.API_KEY directly for initialization as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  /**
   * Analyzes a test suite template and suggests additional test cases or improvements.
   */
  async analyzeTemplate(templateName: string, description: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a senior QA Automation Engineer. Analyze this test suite template:
        Name: ${templateName}
        Description: ${description}
        
        Provide a concise analysis in 3 points:
        1. Key scenarios covered.
        2. Potential missing edge cases.
        3. A recommended tool for this specific suite.
        Format as plain text with clear headings.`
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return "Unable to perform AI analysis at this time. Please try again later.";
    }
  },

  /**
   * Generates a new test case draft based on user prompt.
   */
  async generateTestCase(prompt: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a structured test case for the following requirement: "${prompt}".
        Include:
        - Title
        - Pre-conditions
        - Steps (Action and Expected Result)
        - Priority`,
        config: {
            temperature: 0.7
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Generation Error:", error);
      return "AI Generation failed.";
    }
  }
};
