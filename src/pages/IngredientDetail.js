import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCocktails, fetchCocktailsByFilter } from '../services/cocktailService';
import { Loader, ChevronRight, Sparkles, Info } from 'lucide-react';

const IngredientDetail = () => {
    const [ingredient, setIngredient] = useState(null);
    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { ingredientName } = useParams();

    useEffect(() => {
        const loadIngredientDetails = async () => {
            try {
                setLoading(true);

                const ingredientData = await fetchCocktails('i', ingredientName);
                setIngredient(ingredientData);

                console.log("ingredientName:", ingredientName);
                console.log("ingredient:", ingredientData);

                const cocktailsWithIngredient = await fetchCocktailsByFilter('i', ingredientName);
                setCocktails(cocktailsWithIngredient);
            } catch (err) {
                setError("Erreur lors du chargement des détails de l'ingrédient");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadIngredientDetails();
    }, [ingredientName]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex justify-center items-center">
                <Loader className="w-12 h-12 text-white animate-spin" />
            </div>
        );
    }

    if (error || !ingredient) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center p-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md">
                    <Info className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <p className="text-white text-lg">{error || "Ingrédient non trouvé"}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl mb-12">
                    <div className="flex flex-col md:flex-row items-center p-8 gap-8">
                        <div className="w-48 h-48 bg-white/5 rounded-2xl p-4">
                            <img
                                src={`https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Medium.png`}
                                alt={ingredientName}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl font-bold text-white mb-4 font-display">
                                {ingredientName}
                            </h1>
                            {ingredient.strDescription && (
                                <p className="text-purple-200 leading-relaxed">
                                    {ingredient.strDescription}
                                </p>
                            )}
                            {ingredient.strType && (
                                <div className="mt-4">
                                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white">
                                        {ingredient.strType}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-8 font-display text-center">
                        Cocktails avec {ingredientName}
                        <span className="text-lg text-purple-200 ml-3">
                            ({cocktails.length} recettes)
                        </span>
                    </h2>

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
                                    <h3 className="text-xl font-bold text-white mb-2 font-display">
                                        {cocktail.strDrink}
                                    </h3>
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
                </div>
            </div>
        </div>
    );
};

export default IngredientDetail;