export enum FitnessGoal {
  FAT_LOSS = 'Fat Loss',
  MUSCLE_GAIN = 'Muscle Gain',
  ENDURANCE = 'Endurance',
  MAINTENANCE = 'General Fitness'
}

export enum DietaryPreference {
  VEGETARIAN = 'Vegetarian',
  EGGETARIAN = 'Eggetarian',
  NON_VEGETARIAN = 'Non-Vegetarian',
  VEGAN = 'Vegan'
}

export interface UserProfile {
  name: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  goal: FitnessGoal;
  preference: DietaryPreference;
}

export interface DailyMeal {
  type: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner';
  name: string;
  calories: number;
  description: string;
}

export interface DayWorkout {
  day: string;
  focus: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
  }[];
}

export interface GeneratedPlan {
  bmi: number;
  bmiCategory: string;
  dailyCalories: number;
  macroSplit: {
    protein: number;
    carbs: number;
    fats: number;
  }[];
  dietPlan: DailyMeal[];
  workoutPlan: DayWorkout[];
  summary: string;
}