# SmartChef - AI-Powered Recipe Generator 🍳

[![Next.js](https://img.shields.io/badge/Next.js-13.5.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

Transform your ingredients into delicious recipes with AI. Get personalized cooking suggestions instantly with our intelligent recipe generator.

## 🌟 Features

### Core Functionality
- **AI-Powered Recipe Generation**: Uses advanced AI models to create personalized recipes based on your ingredients
- **Dietary Preferences**: Support for various dietary restrictions (Vegetarian, Vegan, Gluten-Free, Keto, Mediterranean, Low-Carb, Dairy-Free)
- **Surprise Me Mode**: Get creative, unexpected recipe suggestions for culinary adventures
- **Smart Ingredient Management**: Easy-to-use ingredient input with tag-based organization

### User Experience
- **Favorites System**: Save and organize your favorite recipes with local storage persistence
- **Recipe Details**: Comprehensive recipe cards with ingredients, step-by-step instructions, cooking time, and difficulty levels
- **Copy to Clipboard**: One-click recipe copying for easy sharing
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Full theme support with system preference detection

### Technical Features
- **Static Site Generation**: Optimized for fast loading and SEO
- **Progressive Web App Ready**: Installable and works offline
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Lazy loading, code splitting, and optimized bundle size

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smartchef.git
   cd smartchef
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🏗️ Project Structure

```
smartchef/
├── app/                    # Next.js 13+ App Router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main application page
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── favorites-dialog.tsx
│   ├── loading-skeleton.tsx
│   ├── recipe-card.tsx
│   ├── recipe-dialog.tsx
│   ├── recipe-form.tsx
│   └── theme-toggle.tsx
├── lib/                   # Utility functions and API
│   ├── api.ts            # Recipe generation API logic
│   └── utils.ts          # Common utility functions
├── types/                 # TypeScript type definitions
│   └── recipe.ts         # Recipe-related types
├── public/               # Static assets
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: Emerald (600-500) - Main brand color
- **Secondary**: Orange (500-400) - Accent and highlights
- **Neutral**: Gray scale for text and backgrounds
- **Semantic**: Success (green), Warning (yellow), Error (red)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Scale**: Responsive typography with proper line heights

### Components
Built with **shadcn/ui** components for consistency:
- Cards, Buttons, Inputs, Dialogs
- Badges, Skeletons, Scroll Areas
- Theme-aware with dark mode support

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
# Optional: Custom API configurations
NEXT_PUBLIC_APP_NAME=SmartChef
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### API Configuration
The app uses OpenRouter AI API with fallback to mock data:
- **Primary Model**: `google/gemma-3n-e4b-it:free`
- **Fallback**: Local mock recipe generation
- **Rate Limiting**: Automatic fallback on 429 errors

### Theme Configuration
Themes are managed through `next-themes`:
- **Storage Key**: `smartchef-theme`
- **Default**: System preference
- **Options**: Light, Dark, System

## 📱 Usage Guide

### Basic Recipe Generation

1. **Add Ingredients**
   - Type ingredients in the input field
   - Press Enter or click the + button to add
   - Remove ingredients by clicking the X on tags

2. **Select Dietary Preference**
   - Choose from the dropdown menu
   - Options include Vegetarian, Vegan, Keto, etc.

3. **Generate Recipes**
   - Click "Get Recipes" for 3 personalized recipes
   - Click "Surprise Me" for 1 creative recipe

### Managing Favorites

1. **Add to Favorites**
   - Click the heart icon on any recipe card
   - Recipes are saved to local storage

2. **View Favorites**
   - Click the "Favorites" button in the header
   - Browse your saved recipes in the dialog

3. **Remove from Favorites**
   - Click the heart icon again to remove

### Recipe Details

1. **View Full Recipe**
   - Click on any recipe card
   - See complete ingredients and instructions

2. **Copy Recipe**
   - Click the copy button in the card or dialog
   - Recipe is formatted and copied to clipboard

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type Checking
npx tsc --noEmit     # Check TypeScript types
```

### Code Style
- **ESLint**: Next.js recommended configuration
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict mode enabled
- **Tailwind**: Utility-first CSS approach

### Component Development
- Use TypeScript for all components
- Follow React hooks best practices
- Implement proper error boundaries
- Add loading states for async operations

## 🔌 API Integration

### Recipe Generation Flow

1. **User Input Processing**
   ```typescript
   interface RecipeGenerationRequest {
     ingredients: string[];
     dietaryPreference: string;
     surpriseMe?: boolean;
   }
   ```

2. **AI API Call**
   - Sends structured prompt to OpenRouter
   - Handles rate limiting and errors
   - Falls back to mock data if needed

3. **Response Processing**
   - Parses JSON response
   - Validates recipe structure
   - Generates unique IDs

### Mock Data Fallback
When API is unavailable:
- Generates realistic mock recipes
- Uses user ingredients and preferences
- Maintains consistent data structure

## 🎯 Performance Optimization

### Build Optimizations
- **Static Export**: Pre-rendered HTML for fast loading
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Removes unused code
- **Image Optimization**: Next.js Image component (disabled for static export)

### Runtime Optimizations
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Local Storage**: Efficient favorites management
- **Debounced Inputs**: Prevents excessive API calls

## 🔒 Security

### Data Privacy
- **No Server Storage**: All data stored locally
- **API Key Security**: Properly configured headers
- **XSS Protection**: Sanitized user inputs
- **HTTPS Only**: Secure communication

### Content Security
- **Input Validation**: TypeScript type checking
- **Error Handling**: Graceful failure modes
- **Rate Limiting**: Respects API limits

## 🌐 Deployment

### Static Deployment (Recommended)
The app is configured for static export:

```bash
npm run build
```

Deploy the `out/` folder to:
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Static hosting
- **AWS S3**: Static website hosting

### Server Deployment
For server-side features:

```bash
# Remove static export from next.config.js
npm run build
npm start
```

Deploy to:
- **Vercel**: Optimal Next.js hosting
- **Netlify Functions**: Serverless deployment
- **Railway**: Container deployment
- **DigitalOcean**: VPS deployment

## 🧪 Testing

### Manual Testing Checklist
- [ ] Recipe generation with various ingredients
- [ ] Dietary preference filtering
- [ ] Favorites add/remove functionality
- [ ] Theme switching (light/dark/system)
- [ ] Responsive design on mobile/tablet
- [ ] Copy to clipboard functionality
- [ ] Error handling (API failures)

### Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: ES2020, CSS Grid, Flexbox

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Guidelines
- Follow existing code style
- Add TypeScript types for new features
- Update documentation for API changes
- Test on multiple devices/browsers

### Issue Reporting
Please include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **shadcn/ui**: For the beautiful component library
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the comprehensive icon library
- **OpenRouter**: For AI model access

## 📞 Support

- **Documentation**: Check this README and inline comments
- **Issues**: Use GitHub Issues for bug reports
- **Discussions**: Use GitHub Discussions for questions
- **Email**: [your-email@example.com](mailto:your-email@example.com)

---

**Made with ❤️ and AI by [PAVAN KRISHNA D](https://thepavankrishna.netlify.app/) . Happy cooking! 🍳**

*SmartChef - Transform your ingredients into culinary masterpieces*#   S m a r t C h e f  
 