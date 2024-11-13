import { useState, useEffect } from 'react';
import { fetchRandomCocktail } from '../services/cocktailService';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, Loader } from 'lucide-react';

const RandomCocktail = () => {
    const [cocktail, setCocktail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCocktail = async () => {
            try {
                setLoading(true);
                const randomCocktail = await fetchRandomCocktail();
                setCocktail(randomCocktail);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCocktail();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px] bg-white/5 backdrop-blur-sm rounded-2xl">
                <Loader className="w-8 h-8 text-white/70 animate-spin" />
            </div>
        );
    }

    if (!cocktail) {
        return (
            <div className="min-h-[300px] bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center">
                <p className="text-white/70">Impossible de charger le cocktail...</p>
            </div>
        );
    }

    return (
        <Link 
            to={`/cocktail/i/${cocktail.idDrink}`}
            className="block group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
        >
            <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                    src={cocktail.strDrinkThumb} 
                    alt={cocktail.strDrink} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full transform rotate-3 group-hover:rotate-6 transition-transform">
                    <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="text-sm text-white font-medium">Aléatoire</span>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-purple-200 transition-colors">
                    {cocktail.strDrink}
                </h3>
                <div className="flex items-center space-x-3 mb-3">
                    <span className="text-sm text-white/70">
                        {cocktail.strCategory}
                    </span>
                    <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                    <span className="text-sm text-white/70">
                        {cocktail.strAlcoholic}
                    </span>
                </div>
                <div className="flex items-center text-purple-300 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Voir la recette</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </div>
        </Link>
    );
};

export default RandomCocktail;