export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tips?: string;
  dietary?: string;
}

export interface RecipeGenerationRequest {
  ingredients: string[];
  dietaryPreference: string;
  surpriseMe?: boolean;
}