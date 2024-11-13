import React, { Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, Lightbulb, Wine } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
    // Créer des constantes pour les images optimisées
    const IMAGES = {
        hero: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&q=80&w=1920",
        features: "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?auto=format&q=80&w=1920",
        moment: "https://images.unsplash.com/photo-1519859155767-4b1b44102e3c?auto=format&q=80&w=1920",
        discover: "https://images.unsplash.com/photo-1567696911980-2c669794d2e8?auto=format&q=80&w=1920",
        newsletter: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&q=80&w=1920"
    };

    // Précharger les images
    const preloadImages = () => {
        Object.values(IMAGES).forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };

    // Utiliser React.lazy pour les composants
    const CocktailDuMoment = React.lazy(() => import('../components/CocktailDuMoment'));
    const RandomCocktail = React.lazy(() => import('../components/RandomCocktail'));

    useEffect(() => {
        preloadImages();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div
                className="relative min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${IMAGES.hero})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
                <div className="relative z-10 container mx-auto px-4 py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display animate-fade-in">
                            L'Art des Cocktails
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light">
                            Découvrez un monde de saveurs et créez des moments inoubliables
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link
                                to="/categories"
                                className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all shadow-lg text-lg"
                            >
                                Explorer les Cocktails
                            </Link>
                            <Link
                                to="/random"
                                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all text-lg"
                            >
                                Cocktail Aléatoire
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Suspense fallback={<LoadingSpinner />}>
                {/* Section Caractéristiques */}
                <section
                    className="relative py-20"
                    style={{ backgroundImage: `url(${IMAGES.features})` }}
                >
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
                    <div className="relative z-10 container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            <div className="p-8 text-center transform hover:scale-105 transition-all duration-300">
                                <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center shadow-lg">
                                    <Sparkles className="w-10 h-10 text-purple-600" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">Recettes Uniques</h3>
                                <p className="text-gray-600">Des cocktails originaux et créatifs pour tous les goûts</p>
                            </div>
                            <div className="p-8 text-center transform hover:scale-105 transition-all duration-300">
                                <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
                                    <Award className="w-10 h-10 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">Qualité Premium</h3>
                                <p className="text-gray-600">Sélection des meilleurs ingrédients pour des saveurs exceptionnelles</p>
                            </div>
                            <div className="p-8 text-center transform hover:scale-105 transition-all duration-300">
                                <div className="w-20 h-20 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center shadow-lg">
                                    <Lightbulb className="w-10 h-10 text-pink-600" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">Conseils d'Experts</h3>
                                <p className="text-gray-600">Astuces de mixologie professionnelle pour réussir vos cocktails</p>
                            </div>
                            <div className="p-8 text-center transform hover:scale-105 transition-all duration-300">
                                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                                    <Wine className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">Pour Tous</h3>
                                <p className="text-gray-600">Du débutant à l'expert, trouvez votre signature</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Cocktails du Moment */}
                <section
                    className="relative py-20"
                    style={{ backgroundImage: `url(${IMAGES.moment})` }}
                >
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                    <div className="relative z-10 container mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white font-display">
                            ✨ Cocktails du Moment
                        </h2>
                        <Suspense fallback={<LoadingSpinner />}>
                            <CocktailDuMoment />
                        </Suspense>
                    </div>
                </section>

                {/* Section Découverte */}
                <div className="relative py-20" style={{ backgroundImage: `url(${IMAGES.discover})` }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90"></div>
                    <div className="relative z-10 container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white font-display">
                                Découvrez de Nouvelles Saveurs
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <Suspense fallback={<LoadingSpinner />}>
                                    <RandomCocktail />
                                    <RandomCocktail />
                                    <RandomCocktail />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Catégories */}
                <div className="relative py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 font-display">
                            Explorez par Catégorie
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {categories.map((category, index) => (
                                <Link
                                    key={index}
                                    to={category.path}
                                    className="group relative overflow-hidden rounded-xl aspect-square shadow-lg transform hover:scale-105 transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75"></div>
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-2xl font-semibold text-white text-center">
                                            {category.name}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section Newsletter */}
                <div
                    className="relative py-20"
                    style={{
                        backgroundImage: `url(${IMAGES.newsletter})`,
                        backgroundSize: "cover"
                    }}
                >
                    <div className="absolute inset-0 bg-black/80"></div>
                    <div className="relative z-10 container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-display">
                                Restez Inspiré
                            </h2>
                            <p className="text-xl text-gray-300 mb-10">
                                Recevez nos meilleures recettes et conseils de mixologie
                            </p>
                            <form className="flex flex-col sm:flex-row gap-4 justify-center">
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-lg w-full sm:w-auto"
                                />
                                <button
                                    className="px-8 py-4 bg-purple-600 rounded-full font-semibold hover:bg-purple-700 transition-colors text-white text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                                >
                                    S'abonner
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

// Données des catégories
const categories = [
    {
        name: "Cocktails Classiques",
        path: "/categories/cocktail",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&q=80&w=800"
    },
    {
        name: "Sans Alcool",
        path: "/categories/soft_drink",
        image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3"
    },
    {
        name: "Shot",
        path: "/categories/shot",
        image: "https://images.unsplash.com/photo-1693679282116-5fe52daa12f3?q=80&w=3424&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Boisson Ordinaires",
        path: "/categories/ordinary_drink",
        image: "https://images.unsplash.com/photo-1468465236047-6aac20937e92?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

export default HomePage;