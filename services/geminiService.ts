import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, GeneratedPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFitnessPlan = async (user: UserProfile): Promise<GeneratedPlan> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    Act as an expert fitness trainer and nutritionist specializing in personalized plans for Indian students and professionals.
    Create a detailed workout and diet plan for the following user:
    Name: ${user.name}
    Age: ${user.age}
    Weight: ${user.weight} kg
    Height: ${user.height} cm
    Goal: ${user.goal}
    Dietary Preference: ${user.preference}

    Constraints:
    - Diet suggestions must be practical, affordable, and widely available in India (e.g., using Paneer, Soya, Dal, Roti, Rice, Chicken, Eggs depending on preference).
    - Workout should be suitable for a student/beginner environment (mix of home/gym).
    - Provide a 7-day workout schedule.
    - Provide a representative daily meal plan.
    - Calculate BMI and estimated daily calorie needs.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      bmi: { type: Type.NUMBER, description: "Calculated BMI value" },
      bmiCategory: { type: Type.STRING, description: "BMI Category e.g. Normal, Overweight" },
      dailyCalories: { type: Type.NUMBER, description: "Target daily calorie intake" },
      macroSplit: {
        type: Type.ARRAY,
        description: "Macro nutrient distribution percentages",
        items: {
          type: Type.OBJECT,
          properties: {
            protein: { type: Type.NUMBER, description: "Percentage of protein" },
            carbs: { type: Type.NUMBER, description: "Percentage of carbs" },
            fats: { type: Type.NUMBER, description: "Percentage of fats" },
          }
        }
      },
      dietPlan: {
        type: Type.ARRAY,
        description: "A sample daily diet plan",
        items: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, enum: ['Breakfast', 'Lunch', 'Snack', 'Dinner'] },
            name: { type: Type.STRING, description: "Name of the meal" },
            calories: { type: Type.NUMBER, description: "Approximate calories" },
            description: { type: Type.STRING, description: "Brief description of ingredients or method" },
          }
        }
      },
      workoutPlan: {
        type: Type.ARRAY,
        description: "7-day workout routine",
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.STRING, description: "Day 1, Day 2, etc." },
            focus: { type: Type.STRING, description: "Main focus area e.g. Chest/Triceps, Rest" },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  sets: { type: Type.STRING },
                  reps: { type: Type.STRING },
                }
              }
            }
          }
        }
      },
      summary: { type: Type.STRING, description: "A short motivational summary and advice for the user." }
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeneratedPlan;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};