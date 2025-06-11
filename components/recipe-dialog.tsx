"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Clock, Users, Heart, Copy, CheckCircle, ChefHat } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface RecipeDialogProps {
  recipe: Recipe;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleFavorite: (recipe: Recipe) => void;
  isFavorite: boolean;
}

export function RecipeDialog({ recipe, open, onOpenChange, onToggleFavorite, isFavorite }: RecipeDialogProps) {
  const [copied, setCopied] = useState(false);

  const copyRecipe = async () => {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="space-y-3 pb-4">
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-2xl font-bold leading-tight flex-1">
              {recipe.name}
            </DialogTitle>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                size="icon"
                onClick={copyRecipe}
                className="h-9 w-9"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onToggleFavorite(recipe)}
                className="h-9 w-9"
              >
                <Heart className={cn(
                  "h-4 w-4 transition-colors",
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                )} />
              </Button>
            </div>
          </div>
          
          <p className="text-muted-foreground text-base leading-relaxed">{recipe.description}</p>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span className="font-medium">{recipe.cookTime}</span>
            </div>
            <Badge className={difficultyColors[recipe.difficulty]}>
              {recipe.difficulty}
            </Badge>
            {recipe.dietary && recipe.dietary !== 'None' && (
              <Badge variant="outline">{recipe.dietary}</Badge>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-emerald-600" />
                Ingredients
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <span className="flex-1 leading-relaxed">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Instructions</h3>
              <ol className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="flex-1 text-sm leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {recipe.tips && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-2">💡 Chef's Tips</h3>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg leading-relaxed">
                    {recipe.tips}
                  </p>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}