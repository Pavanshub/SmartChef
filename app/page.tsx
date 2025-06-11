"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { generateRecipes } from '@/lib/api';
import { RecipeForm } from '@/components/recipe-form';
import { RecipeCard } from '@/components/recipe-card';
import { FavoritesDialog } from '@/components/favorites-dialog';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import { toast } from 'sonner';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('smartchef-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('smartchef-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleGenerateRecipes = async (ingredients: string[], dietaryPreference: string, surpriseMe = false) => {
    setIsLoading(true);
    try {
      const generatedRecipes = await generateRecipes({
        ingredients,
        dietaryPreference,
        surpriseMe
      });
      setRecipes(generatedRecipes);
      
      if (surpriseMe) {
        toast.success('🎉 Surprise recipe generated! Hope you love it!');
      } else {
        toast.success(`🍳 Generated ${generatedRecipes.length} delicious recipes for you!`);
      }
    } catch (error) {
      console.error('Failed to generate recipes:', error);
      toast.error('Failed to generate recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (recipe: Recipe) => {
    const isFavorite = favorites.some(fav => fav.id === recipe.id);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== recipe.id));
      toast.success('Removed from favorites');
    } else {
      setFavorites([...favorites, recipe]);
      toast.success('Added to favorites! ❤️');
    }
  };

  const isFavorite = (recipe: Recipe) => favorites.some(fav => fav.id === recipe.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              SmartChef
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFavorites(true)}
              className="flex items-center gap-2 relative"
            >
              <Heart className="h-4 w-4" />
              Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Recipe Form */}
        <section>
          <RecipeForm onSubmit={handleGenerateRecipes} isLoading={isLoading} />
        </section>

        {/* Loading State */}
        {isLoading && (
          <section>
            <h2 className="text-2xl font-bold text-center mb-8">
              Cooking up something amazing... 👨‍🍳
            </h2>
            <LoadingSkeleton />
          </section>
        )}

        {/* Generated Recipes */}
        {recipes.length > 0 && !isLoading && (
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">
                {recipes.length === 1 ? 'Your Surprise Recipe! 🎉' : 'Your Personalized Recipes 🍽️'}
              </h2>
              <p className="text-muted-foreground text-lg">
                {recipes.length === 1 
                  ? 'Here\'s something creative and unexpected!'
                  : 'Click on any card to see the full recipe with detailed instructions'
                }
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="animate-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <RecipeCard
                    recipe={recipe}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={isFavorite(recipe)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Getting Started Message */}
        {recipes.length === 0 && !isLoading && (
          <section className="text-center py-12 space-y-4">
            <div className="text-6xl mb-4">👨‍🍳</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Ready to cook something amazing?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Enter your ingredients above and let our AI chef create personalized recipes just for you!
            </p>
          </section>
        )}
      </main>

      {/* Favorites Dialog */}
      <FavoritesDialog
        open={showFavorites}
        onOpenChange={setShowFavorites}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />

      {/* Footer */}
      <footer className="border-t bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            Made with ❤️ and AI. Happy cooking! 🍳
          </p>
        </div>
      </footer>
    </div>
  );
}