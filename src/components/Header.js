import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Sparkles, LucideAlignHorizontalSpaceBetween } from 'lucide-react';
import logo from '../assets/images/Cocktail_Explorer_Logo.png';
import SearchBar from './SearchBar';

const SearchModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleBackgroundClick} // Ajout du gestionnaire de clic
        >
            <div className="absolute bg-white md:rounded-lg p-6 w-full max-w-md mx-4" style={{ top: "70px" }}>
                <div className='flex justify-between'>
                    <h2 className="text-lg text-black font-semibold mb-4">Recherche</h2>
                    <button
                        onClick={onClose}
                        className="transform -translate-y-4 text-gray-400 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>
                <SearchBar
                    onClose={onClose} // Passe onClose ici
                />

            </div>
        </div>
    );
};


const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/80 backdrop-blur-md text-gray-800 shadow-lg'
            : 'bg-transparent text-white'
            }`}>
            <div className="hidden md:block container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <Link to="/" className="flex items-center space-x-4 group">
                        <img
                            src={logo}
                            alt="Cocktail Explorer Logo"
                            className="h-12 md:h-14 transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="hidden sm:block">
                            <h1 className="text-xl md:text-2xl font-display font-bold">
                                Cocktail Explorer
                            </h1>
                            <p className={`text-sm ${isScrolled ? 'text-purple-600' : 'text-purple-200'}`}>
                                L'art des cocktails
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`nav-link font-medium p-2 hover:text-purple-500 transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'
                                }`}
                        >
                            Accueil
                        </Link>

                        <div className="relative group">
                            <button className={`nav-link flex items-center space-x-2 p-2 font-medium group-hover:text-purple-500 transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'
                                }`}>
                                <span>Catégories</span>
                                <svg className="w-5 h-5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className="absolute left-0 w-80 bg-white/90 backdrop-blur-md rounded-xl shadow-xl py-2 hidden group-hover:block transform transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
                                <div className="px-6 py-3 border-b border-gray-100">
                                    <span className="text-sm font-semibold text-purple-600">
                                        Catégories Populaires
                                    </span>
                                </div>

                                {categories.map((category, index) => (
                                    <Link
                                        key={index}
                                        to={category.path}
                                        className="block px-6 py-3 hover:bg-purple-50 transition-colors group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700 group-hover:text-purple-600 transition-colors">
                                                {category.name}
                                            </span>
                                            <Sparkles className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </Link>
                                ))}

                                <div className="border-t border-gray-100 mt-2 pt-2">
                                    <Link
                                        to="/categories"
                                        className="block px-6 py-3 text-purple-600 hover:bg-purple-50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">Voir toutes les catégories</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <button
                            className={`p-2 rounded-full hover:bg-purple-600 transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'
                                }`}
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        <Link
                            to="/random"
                            className={`px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 ${isScrolled
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md hover:shadow-lg'
                                : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
                                }`}
                        >
                            Cocktail Aléatoire
                        </Link>
                    </nav>

                    {/*<button
                        className="md:hidden p-2 rounded-full hover:bg-purple-100 transition-colors text-gray-700"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>*/}
                </div>
            </div>
            <nav class="md:hidden">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-4 group">
                        <img
                            src={logo}
                            alt="Cocktail Explorer Logo"
                            className="h-12 md:h-14 transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="hidden sm:block">
                            <h1 className="text-xl md:text-2xl font-display font-bold">
                                Cocktail Explorer
                            </h1>
                            <p className={`text-sm ${isScrolled ? 'text-purple-600' : 'text-purple-200'}`}>
                                L'art des cocktails
                            </p>
                        </div>
                    </Link>
                    <div class="flex">
                        <button
                            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600
                                }`}
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleBackgroundClick}>
                            <div className="absolute bg-white shadow-md w-full p-6 max-w-md" style={{ top: "70px" }} id="navbar-search">
                                <div className='flex justify-between'>
                                    <h2 className="text-lg text-black font-semibold mb-4">Liens</h2>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="transform -translate-y-4 text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                                <ul class="flex flex-col p-4 font-medium border border-gray-100 rounded-lg bg-gray-50 rtl:space-x-reverse dark:bg-gray-800 dark:border-gray-700">
                                    <li>
                                        <Link to="/" className="block py-2 px-3 text-white bg-purple-700 rounded" aria-current="page" onClick={() => setIsModalOpen(false)}>Accueil</Link>
                                    </li>
                                    <li>
                                        <Link to="/categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700" onClick={() => setIsModalOpen(false)}>Catégories</Link>
                                    </li>
                                    <li>
                                        <Link to="/random" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:text-white dark:border-gray-700" onClick={() => setIsModalOpen(false)}>Random</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>
    );
};

// Données des catégories
const categories = [
    {
        name: "Cocktails Classiques",
        path: "/categories/cocktail",
    },
    {
        name: "Shots",
        path: "/categories/shot",
    },
    {
        name: "Punch & Boissons de Fête",
        path: "/categories/punch_party_drink",
    },
    {
        name: "Sans Alcool",
        path: "/categories/soft_drink",
    }
];

export default Header;
