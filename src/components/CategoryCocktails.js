import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCocktailsByFilter } from '../services/cocktailService';
import { Loader, ChevronRight, Sparkles } from 'lucide-react';

const CategoryCocktails = () => {
    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        const loadCocktails = async () => {
            try {
                setLoading(true);
                const data = await fetchCocktailsByFilter('c', categoryId);
                setCocktails(data);
            } catch (err) {
                setError('Erreur lors du chargement des cocktails');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCocktails();
    }, [categoryId]);

    const formatCategoryTitle = (category) => {
        return category
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex justify-center items-center">
                <Loader className="w-12 h-12 text-white animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center p-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md">
                    <p className="text-white text-lg">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
                        {formatCategoryTitle(categoryId)}
                    </h1>
                    <p className="text-lg text-purple-200">
                        {cocktails.length} cocktails à découvrir
                    </p>
                </div>

                {cocktails.length === 0 ? (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center max-w-2xl mx-auto">
                        <p className="text-white text-lg">
                            Aucun cocktail trouvé dans cette catégorie.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                                    <h2 className="text-xl font-bold text-white mb-2 font-display">
                                        {cocktail.strDrink}
                                    </h2>
                                    <div className="flex items-center text-purple-300 group-hover:text-white transition-colors">
                                        <span className="text-sm font-medium">Voir la recette</span>
                                        <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryCocktails;