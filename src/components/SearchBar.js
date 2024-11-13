import React, { useState } from 'react';
import { fetchCocktails } from '../services/cocktailService';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ selectedValues, onResultsChange, onParamChange, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cocktail, setCocktail] = useState('');
    const [searchType, setSearchType] = useState('full');
    const navigate = useNavigate();

    const handleSearch = async (e, type) => {
        e.preventDefault();
        try {
            const searchMapping = {
                full: 's',
                firstLetter: 'f',
                ingredients: 'i'
            };

            const searchParam = searchMapping[searchType]; // Use searchType pour les filtres

            const results = await fetchCocktails(searchParam, searchTerm);
            navigate('/search-result', { 
                state: { results: results }
            });

            if (onClose) {
                onClose(); // Ferme la modal après la recherche
            }

        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        }
    };

    const selectTab = (type) => {
        setSearchType(type);
    };

    const getPlaceholder = () => {
        switch (searchType) {
            case 'full':
                return "Entrer un cocktail...";
            case 'firstLetter':
                return "Entrez la première lettre...";
            case 'ingredients':
                return "Entrez un ingrédient...";
            default:
                return "Rechercher un cocktail";
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={getPlaceholder()}
                        required
                    />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
