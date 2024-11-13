import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCocktailsDetails } from '../services/cocktailService';
import { Loader, GlassWater, Tag, Info, ChevronRight } from 'lucide-react';

const CocktailDetails = () => {
    const [cocktail, setCocktail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const loadCocktailDetails = async () => {
            try {
                setLoading(true);
                const data = await fetchCocktailsDetails('i', id);
                setCocktail(data);
            } catch (err) {
                setError("Erreur lors du chargement des détails du cocktail");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCocktailDetails();
    }, [id]);

    // Fonction pour extraire les ingrédients et mesures
    const getIngredients = (cocktail) => {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];
            if (ingredient) {
                ingredients.push({
                    name: ingredient,
                    measure: measure || 'Au goût'
                });
            }
        }
        return ingredients;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
                <Loader className="w-12 h-12 text-white animate-spin" />
            </div>
        );
    }

    if (error || !cocktail) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center p-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md">
                    <Info className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <p className="text-white text-lg">{error || "Cocktail non trouvé"}</p>
                </div>
            </div>
        );
    }

    const ingredients = getIngredients(cocktail);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl">
                    {/* En-tête du cocktail avec image en hero */}
                    <div className="relative">
                        <div className="aspect-video w-full overflow-hidden">
                            <img
                                src={cocktail.strDrinkThumb}
                                alt={cocktail.strDrink}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        </div>

                        {/* Informations principales superposées */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                                {cocktail.strDrink}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4">
                                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                                    {cocktail.strCategory}
                                </span>
                                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center gap-2">
                                    <GlassWater className="w-4 h-4" />
                                    {cocktail.strGlass}
                                </span>
                                {cocktail.strAlcoholic && (
                                    <span className={`px-4 py-2 rounded-full text-sm backdrop-blur-sm ${cocktail.strAlcoholic === 'Alcoholic'
                                        ? 'bg-red-500/20 text-red-100'
                                        : 'bg-green-500/20 text-green-100'
                                        }`}>
                                        {cocktail.strAlcoholic}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contenu principal */}
                    <div className="p-8">
                        {/* Ingrédients */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6 font-display">Ingrédients</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {ingredients.map((ingredient, index) => (
                                    <Link
                                        to={`/ingredient/${ingredient.name}`}
                                        className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex items-center space-x-4 transform hover:scale-105 transition-all duration-300"
                                    >
                                        <div
                                            key={index}
                                            className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex items-center space-x-4 transform hover:scale-105 transition-all duration-300"
                                        >
                                            <div className="w-16 h-16 bg-white/5 rounded-lg p-2">
                                                <img
                                                    src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.name}-Small.png`}
                                                    alt={ingredient.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{ingredient.name}</p>
                                                <p className="text-sm text-purple-200">{ingredient.measure}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Instructions */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6 font-display">Instructions</h2>
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                                <p className="text-purple-100 whitespace-pre-line leading-relaxed">
                                    {cocktail.strInstructions}
                                </p>
                            </div>
                        </section>

                        {/* Instructions en français si disponibles */}
                        {cocktail.strInstructionsFR && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-white mb-6 font-display">Instructions en Français</h2>
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                                    <p className="text-purple-100 whitespace-pre-line leading-relaxed">
                                        {cocktail.strInstructionsFR}
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Tags */}
                        {cocktail.strTags && (
                            <section className="mt-8">
                                <div className="flex items-center gap-4 flex-wrap">
                                    <Tag className="w-5 h-5 text-purple-300" />
                                    {cocktail.strTags.split(',').map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-purple-200"
                                        >
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CocktailDetails;