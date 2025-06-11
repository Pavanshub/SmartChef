import { Recipe, RecipeGenerationRequest } from '@/types/recipe';

// Generate mock recipes as fallback
function generateMockRecipes(request: RecipeGenerationRequest): Recipe[] {
  const ingredients = request.ingredients.join(', ');
  const dietary = request.dietaryPreference;
  
  const mockRecipes: Recipe[] = [
    {
      id: '1',
      name: `${dietary} Fusion Bowl`,
      description: `A creative fusion dish combining ${ingredients} with aromatic spices and fresh herbs.`,
      ingredients: [
        ...request.ingredients.map(ing => `1 cup ${ing}`),
        '2 cloves garlic, minced',
        '1 tablespoon olive oil',
        'Salt and pepper to taste',
        'Fresh herbs for garnish'
      ],
      steps: [
        'Prepare all ingredients by washing and chopping as needed.',
        'Heat olive oil in a large pan over medium heat.',
        'Add garlic and sauté until fragrant, about 1 minute.',
        'Add main ingredients and cook until tender.',
        'Season with salt, pepper, and herbs.',
        'Serve hot and enjoy!'
      ],
      cookTime: '25 minutes',
      difficulty: 'Easy',
      tips: 'For extra flavor, marinate ingredients for 30 minutes before cooking.',
      dietary: request.dietaryPreference
    },
    {
      id: '2',
      name: `Hearty ${dietary} Stew`,
      description: `A warming, nutritious stew perfect for any season using ${ingredients}.`,
      ingredients: [
        ...request.ingredients.map(ing => `2 cups ${ing}`),
        '4 cups vegetable broth',
        '1 onion, diced',
        '2 carrots, chopped',
        'Bay leaves',
        'Thyme'
      ],
      steps: [
        'In a large pot, sauté onions until translucent.',
        'Add carrots and cook for 5 minutes.',
        'Add main ingredients and broth.',
        'Bring to a boil, then reduce heat and simmer.',
        'Add herbs and seasonings.',
        'Cook until all ingredients are tender, about 30 minutes.',
        'Serve with crusty bread.'
      ],
      cookTime: '45 minutes',
      difficulty: 'Medium',
      tips: 'This stew tastes even better the next day! Store in refrigerator.',
      dietary: request.dietaryPreference
    },
    {
      id: '3',
      name: `${dietary} Power Salad`,
      description: `A nutrient-packed salad featuring ${ingredients} with a zesty homemade dressing.`,
      ingredients: [
        ...request.ingredients.map(ing => `1 handful ${ing}`),
        'Mixed greens',
        '1/4 cup nuts or seeds',
        '2 tablespoons olive oil',
        '1 tablespoon lemon juice',
        'Honey or maple syrup',
        'Dijon mustard'
      ],
      steps: [
        'Wash and prepare all fresh ingredients.',
        'Arrange greens in a large bowl.',
        'Add prepared main ingredients on top.',
        'Whisk together olive oil, lemon juice, honey, and mustard.',
        'Drizzle dressing over salad.',
        'Sprinkle with nuts or seeds.',
        'Toss gently and serve immediately.'
      ],
      cookTime: '15 minutes',
      difficulty: 'Easy',
      tips: 'Add protein like grilled chicken or chickpeas for a more filling meal.',
      dietary: request.dietaryPreference
    }
  ];

  // If surprise me is requested, return just one creative recipe
  if (request.surpriseMe) {
    return [
      {
        id: 'surprise',
        name: `Mystery ${dietary} Delight`,
        description: `An unexpected and delightful creation using ${ingredients} in a way you've never tried before!`,
        ingredients: [
          ...request.ingredients.map(ing => `1 portion ${ing}`),
          'Secret spice blend',
          'A splash of creativity',
          'Unexpected ingredient combination'
        ],
        steps: [
          'Trust the process and embrace the mystery!',
          'Combine ingredients in an unusual but delicious way.',
          'Cook with intuition and taste as you go.',
          'Add the secret spice blend gradually.',
          'Present beautifully and surprise yourself!',
          'Take a photo - you might never recreate this exact magic again!'
        ],
        cookTime: '20 minutes',
        difficulty: 'Medium',
        tips: 'The best dishes come from experimentation. Don\'t be afraid to adjust!',
        dietary: request.dietaryPreference
      }
    ];
  }

  return mockRecipes;
}

export async function generateRecipes(request: RecipeGenerationRequest): Promise<Recipe[]> {
  const prompt = `You are a helpful and creative home chef. A user has these ingredients: ${request.ingredients.join(', ')}. Their dietary preference is: ${request.dietaryPreference}. Generate ${request.surpriseMe ? '1 creative surprise' : '3 easy, creative'} recipes.

For each recipe, provide:
1. Recipe Name
2. Short Description  
3. Ingredients List (with quantities)
4. Steps (numbered, detailed)
5. Cook Time & Difficulty (Easy/Medium/Hard)
6. Tips or Substitutions

Format your response as a JSON array of recipe objects with this structure:
{
  "id": "unique_id",
  "name": "Recipe Name",
  "description": "Short description",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "steps": ["step 1", "step 2"],
  "cookTime": "X minutes",
  "difficulty": "Easy|Medium|Hard",
  "tips": "helpful tips",
  "dietary": "${request.dietaryPreference}"
}`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://smartchefai.netlify.app/',
        'X-Title': 'SmartChef Recipe Generator'
      },
      body: JSON.stringify({
        model: 'google/gemma-3n-e4b-it:free',
        messages: [{ 
          role: 'user', 
          content: prompt 
        }],
        temperature: 0.8,
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.warn('API rate limit exceeded, using mock recipes');
        // Simulate API delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1500));
        return generateMockRecipes(request);
      }
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Try to parse JSON response
    try {
      // Clean up the response to extract JSON
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const recipes = JSON.parse(jsonMatch[0]);
        return recipes.map((recipe: any, index: number) => ({
          ...recipe,
          id: recipe.id || `recipe-${Date.now()}-${index}`
        }));
      }
    } catch (parseError) {
      console.warn('Failed to parse API response, using mock recipes');
    }
    
    // Fallback to mock recipes if parsing fails
    return generateMockRecipes(request);
    
  } catch (error) {
    console.warn('API request failed, using mock recipes:', error);
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    return generateMockRecipes(request);
  }
}