import React, { useState } from 'react';
import PrintList from '../components/PrintList';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResults';

const SearchPage = () => {
    const [selectedValues, setSelectedValues] = useState({
        category: '',
        glass: '',
        ingredient: '',
        alcohol: ''
    });

    const [results, setResults] = useState([]);
    const [searchParam, setParam] = useState([]);

    const handleValueChange = (type, value) => {
        setSelectedValues(prevValues => ({
            ...prevValues,
            [type]: value
        }));
    };

    const handleResultsChange = (newResults) => {
        console.log('new:', newResults);
        setResults(newResults);
    };

    const handleParamChange = (newParam) => {
        console.log('new:', newParam);
        setParam(newParam);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Recettes de Cocktails</h1>
            <SearchBar selectedValues={selectedValues} onResultsChange={handleResultsChange} onParamChange={handleParamChange} />
            <p className='mb-3'>Choisi tes filtre afin d'affiner tes recherche parmis les cocktails disponible</p>
            <div className="flex flex-wrap justify-between mb-6">
                <PrintList list="c" onValueChange={(value) => handleValueChange('category', value) } selectedCategory="Choisi Ta Boisson" />
                <PrintList list="g" onValueChange={(value) => handleValueChange('glass', value)} selectedCategory="Choisi Ton Verre" />
                <PrintList list="i" onValueChange={(value) => handleValueChange('ingredient', value)} selectedCategory="Choisi Un Ingrédient" />
                <PrintList list="a" onValueChange={(value) => handleValueChange('alcohol', value)} selectedCategory="Choisi Avec Ou Sans Alcool" />
            </div>
            <SearchResult results={results} searchParam={searchParam} />
        </div>
    );
};

export default SearchPage;
