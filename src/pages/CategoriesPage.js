import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, Wine, Beer, Coffee, Milk, GlassWater, PartyPopper } from 'lucide-react';

const CategoriesPage = () => {
    const categories = [
        {
            id: 'cocktail',
            name: 'Cocktails Classiques',
            icon: <GlassWater className="w-6 h-6" />,
            description: 'Les grands classiques de la mixologie',
            gradient: 'from-purple-500 to-blue-500'
        },
        {
            id: 'shot',
            name: 'Shots',
            icon: <Wine className="w-6 h-6" />,
            description: 'Petits mais puissants',
            gradient: 'from-red-500 to-pink-500'
        },
        {
            id: 'Punch%20%2F%20Party%20Drink',
            name: 'Punch & Boissons de Fête',
            icon: <PartyPopper className="w-6 h-6" />,
            description: 'Pour les grandes occasions',
            gradient: 'from-yellow-500 to-orange-500'
        },
        {
            id: 'soft_drink',
            name: 'Sans Alcool',
            icon: <Milk className="w-6 h-6" />,
            description: 'Tout le plaisir, sans alcool',
            gradient: 'from-green-500 to-teal-500'
        },
        {
            id: 'ordinary_drink',
            name: 'Boissons Ordinaires',
            icon: <Wine className="w-6 h-6" />,
            description: 'Les indémodables',
            gradient: 'from-blue-500 to-indigo-500'
        },
        {
            id: 'shake',
            name: 'Shakes',
            icon: <Milk className="w-6 h-6" />,
            description: 'Onctueux et rafraîchissants',
            gradient: 'from-pink-500 to-purple-500'
        },
        {
            id: 'cocoa',
            name: 'Cacao',
            icon: <Coffee className="w-6 h-6" />,
            description: 'Pour les amateurs de chocolat',
            gradient: 'from-amber-500 to-brown-500'
        },
        {
            id: 'Coffee%20%2F%20Tea',
            name: 'Café / Thé',
            icon: <Coffee className="w-6 h-6" />,
            description: 'Chaud ou glacé',
            gradient: 'from-brown-500 to-amber-500'
        },
        {
            id: 'homemade_liqueur',
            name: 'Liqueurs Maison',
            icon: <Wine className="w-6 h-6" />,
            description: 'Faites avec amour',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            id: 'beer',
            name: 'Bière',
            icon: <Beer className="w-6 h-6" />,
            description: 'Cocktails à base de bière',
            gradient: 'from-yellow-500 to-amber-500'
        },
        {
            id: 'Other%20%2F%20Unknown',
            name: 'Autres',
            icon: <Sparkles className="w-6 h-6" />,
            description: 'Découvrez plus de boissons',
            gradient: 'from-gray-500 to-slate-500'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
                        Explorez nos Catégories
                    </h1>
                    <p className="text-lg text-purple-200 max-w-2xl mx-auto">
                        Découvrez notre collection de cocktails classés par catégories pour trouver votre prochaine boisson préférée
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/categories/${category.id}`}
                            className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>

                            <div className="relative p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="p-3 bg-white/10 rounded-xl">
                                        {category.icon}
                                    </div>
                                    <h2 className="text-xl font-bold text-white font-display">
                                        {category.name}
                                    </h2>
                                </div>
                                <p className="text-purple-200 mb-4">
                                    {category.description}
                                </p>
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
            </div>
        </div>
    );
};

export default CategoriesPage;