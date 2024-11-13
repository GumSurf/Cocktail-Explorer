import axios from 'axios';
import { API_URL } from '../config';

export const fetchCocktails = async (researchType, searchTerm = '') => {
    try {
        if (researchType === 'f') {
            searchTerm = searchTerm[0];
        }
        const response = await axios.get(`${API_URL}search.php`, {
            params: {
                [researchType]: searchTerm
            }
        });
        if (researchType === 'i') {
            console.log(response.data.ingredients[0]);
            return response.data.ingredients[0];
        } else {
            return response.data.drinks;
        }
    } catch (error) {
        throw new Error('Erreur lors de la récupération des cocktails : ' + error.message);
    }
};

export const fetchCocktailsByFilter = async (filterType, filterValue) => {
    try {
        const response = await axios.get(`${API_URL}filter.php`, {
            params: {
                [filterType]: filterValue
            }
        });
        return response.data.drinks || [];
    } catch (error) {
        throw new Error('Erreur lors de la récupération des cocktails : ' + error.message);
    }
};

export const fetchList = async (listType) => {
    try {
        const response = await axios.get(`${API_URL}list.php`, {
            params: {
                [listType]: 'list'
            }
        });
        return response.data.drinks || [];
    } catch (error) {
        throw new Error('Erreur lors de la récupération des cocktails : ' + error.message);
    }
};

export const fetchCocktailsDetails = async (type, searchTerm = '') => {
    try {
        const response = await axios.get(`${API_URL}lookup.php`, {
            params: {
                [type]: searchTerm
            }
        });
        if (type === 'iid') {
            return response.data.ingredients[0];
        } else {
            console.log(response.data.drinks[0])
            return response.data.drinks[0];
        }
    } catch (error) {
        throw new Error('Erreur lors de la récupération des cocktails : ' + error.message);
    }
};

//Lookup full cocktail details by id
//www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

//Lookup ingredient by ID
//www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552

export const fetchRandomCocktail = async () => {
    try {
        const response = await axios.get(`${API_URL}random.php`);
        return response.data.drinks[0];
    } catch (error) {
        throw new Error('Erreur lors de la récupération des cocktails : ' + error.message);
    }
};
