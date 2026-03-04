import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { env } from '../env/env';



@Injectable({ providedIn: 'root' })
export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: `${env.chatbotURL}` });
 

  async sendMessage(prompt: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      
      // Make sure find the text
      return response.text || 'لم يتم إرجاع أي بيانات';
    } catch (err) {
      console.error('Gemini error:', err);
      return 'Something wrong connection with You exceeded your current quota, please check your plan and billing details.Gemini';
    }
  }
}
