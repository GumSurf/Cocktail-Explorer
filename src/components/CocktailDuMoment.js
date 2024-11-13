import { useState, useEffect } from 'react';
import { fetchCocktailsDetails } from '../services/cocktailService';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight } from 'lucide-react';

const CocktailDuMoment = () => {
    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCocktails = async () => {
            try {
                const cocktailIds = ['11007', '11000', '11001', '11002', '11003', '11004'];
                const cocktailsData = await Promise.all(
                    cocktailIds.map(id => fetchCocktailsDetails('i', id))
                );
                setCocktails(cocktailsData);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCocktails();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {cocktails.map((cocktail) => (
                    <Link
                        key={cocktail.idDrink}
                        to={`/cocktail/i/${cocktail.idDrink}`}
                        className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                                src={cocktail.strDrinkThumb}
                                alt={cocktail.strDrink}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full transform rotate-12 group-hover:rotate-45 transition-transform">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-2xl font-bold text-white mb-2 font-display">
                                {cocktail.strDrink}
                            </h3>
                            <div className="flex items-center space-x-4 mb-3">
                                <span className="text-sm text-white/80">
                                    {cocktail.strCategory}
                                </span>
                                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                                <span className="text-sm text-white/80">
                                    {cocktail.strAlcoholic}
                                </span>
                            </div>
                            <div className="flex items-center text-purple-300 group-hover:text-white transition-colors">
                                <span className="text-sm font-medium">Découvrir</span>
                                <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="mt-12 text-center">
                <Link
                    to="/categories"
                    className="inline-flex items-center px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all transform hover:scale-105 group"
                >
                    <span className="font-medium">Découvrir plus de cocktails</span>
                    <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default CocktailDuMoment;