"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Recipe } from '@/types/recipe';
import { RecipeCard } from './recipe-card';
import { Heart } from 'lucide-react';

interface FavoritesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  favorites: Recipe[];
  onToggleFavorite: (recipe: Recipe) => void;
}

export function FavoritesDialog({ open, onOpenChange, favorites, onToggleFavorite }: FavoritesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            My Favorite Recipes
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[calc(90vh-120px)] pr-4">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Start adding recipes to your favorites by clicking the heart icon!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {favorites.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={true}
                  className="h-fit"
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}