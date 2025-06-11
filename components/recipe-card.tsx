"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Heart, Copy, CheckCircle } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { RecipeDialog } from './recipe-dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: (recipe: Recipe) => void;
  isFavorite: boolean;
  className?: string;
}

export function RecipeCard({ recipe, onToggleFavorite, isFavorite, className }: RecipeCardProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyRecipe = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const recipeText = `
🍽️ ${recipe.name}

📋 Description:
${recipe.description}

🧂 Ingredients:
${recipe.ingredients.map((ingredient, i) => `${i + 1}. ${ingredient}`).join('\n')}

📖 Instructions:
${recipe.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

⏱️ Cook Time: ${recipe.cookTime}
🎯 Difficulty: ${recipe.difficulty}

💡 Tips: ${recipe.tips || 'Enjoy your cooking!'}
    `.trim();

    try {
      await navigator.clipboard.writeText(recipeText);
      setCopied(true);
      toast.success('Recipe copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy recipe');
    }
  };

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  return (
    <>
      <Card 
        className={cn(
          "cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
          "group border-2 hover:border-emerald-200 dark:hover:border-emerald-800",
          className
        )}
        onClick={() => setShowDialog(true)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-emerald-600 transition-colors">
                {recipe.name}
              </CardTitle>
              <CardDescription className="mt-2 line-clamp-2">
                {recipe.description}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(recipe);
              }}
              className="shrink-0 ml-2"
            >
              <Heart className={cn(
                "h-5 w-5 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
              )} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {recipe.cookTime}
            </div>
            <Badge className={difficultyColors[recipe.difficulty]}>
              {recipe.difficulty}
            </Badge>
            {recipe.dietary && recipe.dietary !== 'None' && (
              <Badge variant="outline">{recipe.dietary}</Badge>
            )}
          </div>

          <div className="space-y-2">
            <p className="font-medium text-sm">Key Ingredients:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {ingredient.split(',')[0].trim()}
                </Badge>
              ))}
              {recipe.ingredients.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{recipe.ingredients.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                setShowDialog(true);
              }}
            >
              View Recipe
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={copyRecipe}
              className="px-3"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <RecipeDialog 
        recipe={recipe}
        open={showDialog}
        onOpenChange={setShowDialog}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
      />
    </>
  );
}