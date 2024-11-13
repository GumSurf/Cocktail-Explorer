import React, { useState } from 'react';
import { fetchCocktails } from '../services/cocktailService';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ selectedValues, onResultsChange, onParamChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cocktail, setCocktail] = useState('');
    const [searchType, setSearchType] = useState('full'); // Type de recherche par défaut
    const navigate = useNavigate();

    const handleSearch = async (e, type) => {
        e.preventDefault();
        try {
            const searchMapping = {
                full: 's',
                firstLetter: 'f',
                ingredients: 'i'
            };

            const searchParam = searchMapping['full']; //Use searchType pour les filtres
            console.log("searchParam =", searchParam);
            console.log("searchTerm =", searchTerm);
            //onParamChange(searchParam);
            const results = await fetchCocktails(searchParam, searchTerm);
            //onResultsChange(results);
            navigate('/search-result', { 
                state: { results: results }
            });
            /*if (results && searchParam === 'i') {
                const cocktailOrIngredient = 'iid';
                navigate(`/cocktail/${cocktailOrIngredient}/${results.idIngredient}`);
                return;
            }

            if (selectedValues.category == '' && selectedValues.glass == '' && selectedValues.alcohol == '') {
                onResultsChange(results);
            }

            const cocktailRes = results.map((result) => {
                if (result.strCategory.toLowerCase() === selectedValues.category.toLowerCase()
                    && result.strGlass.toLowerCase() === selectedValues.glass.toLowerCase()
                    && result.strAlcoholic.toLowerCase() === selectedValues.alcohol.toLowerCase()) {
                    for (let i = 1; i <= 15; i++) {
                        const ingredientKey = `strIngredient${i}`;
                        const ingredientValue = result[ingredientKey];

                        if (ingredientValue && ingredientValue.toLowerCase() === selectedValues.ingredient.toLowerCase()) {
                            onResultsChange(result);
                            setCocktail(result);
                            break;
                        }
                    }
                }
            });*/

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
            {/*<form onSubmit={handleSearch} className="w-full max-w-lg m-auto">
                <div className="flex flex-col-reverse md:flex-row items-stretch">
                    <select
                        value={searchType}
                        onChange={(e) => selectTab(e.target.value)}
                        className="mt-2 md:mt-0 block p-2 border border-gray-300 rounded-lg md:rounded-r-none shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="full">Recherche Complète</option>
                        <option value="firstLetter">Première Lettre</option>
                        <option value="ingredients">Ingrédients</option>
                    </select>
                    <div className="relative w-full">
                        <input
                            type="search"
                            id="search-dropdown"
                            className="block p-2 w-full h-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg md:rounded-l-none border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={getPlaceholder()}
                            required
                        />
                        <button
                            type="submit"
                            className="absolute top-0 right-0 p-2 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>*/}

            <form onSubmit={handleSearch} className="max-w-md mx-auto">
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
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
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>

        </div>
    );
};

export default SearchBar;
