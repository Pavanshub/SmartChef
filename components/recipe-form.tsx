"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Plus, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecipeFormProps {
  onSubmit: (ingredients: string[], dietaryPreference: string, surpriseMe?: boolean) => void;
  isLoading: boolean;
}

const dietaryOptions = [
  'None',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Keto',
  'Mediterranean',
  'Low-Carb',
  'Dairy-Free'
];

export function RecipeForm({ onSubmit, isLoading }: RecipeFormProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('None');

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleSubmit = (surpriseMe = false) => {
    if (ingredients.length > 0) {
      onSubmit(ingredients, dietaryPreference, surpriseMe);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center pb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ChefHat className="h-8 w-8 text-emerald-600" />
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            SmartChef
          </CardTitle>
        </div>
        <CardDescription className="text-lg">
          Tell me what ingredients you have, and I'll create amazing recipes for you! ✨
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="ingredient-input" className="text-base font-medium">
            What ingredients do you have?
          </Label>
          <div className="flex gap-2">
            <Input
              id="ingredient-input"
              placeholder="e.g., eggs, tomatoes, bread..."
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={addIngredient} 
              size="icon"
              variant="outline"
              disabled={!currentIngredient.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
              {ingredients.map((ingredient, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="flex items-center gap-1 py-1 px-3 text-sm"
                >
                  {ingredient}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeIngredient(ingredient)}
                    className="h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Dietary Preference</Label>
          <Select value={dietaryPreference} onValueChange={setDietaryPreference}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dietaryOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            onClick={() => handleSubmit(false)} 
            disabled={ingredients.length === 0 || isLoading}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Cooking up recipes...
              </div>
            ) : (
              'Get Recipes 🍳'
            )}
          </Button>
          
          <Button 
            onClick={() => handleSubmit(true)} 
            disabled={ingredients.length === 0 || isLoading}
            variant="outline"
            size="lg"
            className={cn(
              "flex-1 border-2 border-orange-200 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-950",
              "transition-all duration-200 hover:scale-105"
            )}
          >
            <Sparkles className="h-4 w-4 mr-2 text-orange-500" />
            Surprise Me! ✨
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}