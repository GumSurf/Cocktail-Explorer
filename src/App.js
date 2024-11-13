import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import CocktailDetail from './pages/CocktailDetail';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryCocktails from './components/CategoryCocktails';
import IngredientDetail from './pages/IngredientDetail';
import CocktailRandom from './pages/CocktailRandom';
import HeaderTest from './components/HeaderTest';

function App() {
  return (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search-result" element={<ResultsPage />} />
            <Route path="/cocktail/:id" element={<CocktailDetail />} />
            <Route path="/ingredient/:ingredientName" element={<IngredientDetail />} />
            <Route path="/cocktail/:cocktailOrIngredient/:id" element={<CocktailDetail />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:categoryId" element={<CategoryCocktails />} />
            <Route path="/random" element={<CocktailRandom />} />
            <Route path='/header_test' element={<HeaderTest />} />
        </Routes>
    </Router>
  );
}

export default App;
