import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Search, ChevronRight, Sparkles } from 'lucide-react';

const SearchResult = () => {
    const cocktailOrIngredient = 'i';
    const location = useLocation();
    const results = location.state?.results || [];
    const searchQuery = location.state?.searchQuery || '';

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4 font-display">
                        Résultats de recherche
                    </h2>
                    <p className="text-lg text-purple-200">
                        {results.length > 0
                            ? `${results.length} cocktails trouvés pour "${searchQuery}"`
                            : 'Aucun résultat trouvé'
                        }
                    </p>
                </div>

                {results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {results.map((result) => (
                            <Link
                                key={result.idDrink}
                                to={`/cocktail/${cocktailOrIngredient}/${result.idDrink}`}
                                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={result.strDrinkThumb}
                                        alt={result.strDrink}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full transform rotate-12 group-hover:rotate-45 transition-transform">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2 font-display group-hover:text-purple-200 transition-colors">
                                        {result.strDrink}
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
                ) : (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center max-w-2xl mx-auto">
                        <Search className="w-16 h-16 text-purple-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">
                            Aucun résultat trouvé
                        </h3>
                        <p className="text-purple-200 mb-8">
                            Essayez avec d'autres mots-clés ou explorez nos catégories populaires.
                        </p>
                        <Link
                            to="/categories"
                            className="inline-flex items-center px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all transform hover:scale-105 group"
                        >
                            <span className="font-medium">Explorer les catégories</span>
                            <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResult;