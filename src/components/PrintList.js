import React, { useEffect, useState } from 'react';
import { fetchList } from '../services/cocktailService';

const PrintList = ({ list, onValueChange, selectedCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const categoriesData = await fetchList(list);
                setCategories(categoriesData);
            } catch (error) {
                console.error(error);
            }
        };

        loadData();
    }, [list]);

    const handleChange = (e) => {
        onValueChange(e.target.value);
    };

    return (
        <div className="mb-4">
            <select
                onChange={handleChange}
                value={selectedCategory || ""}
                className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            >
                <option value="">{selectedCategory}</option>
                {categories.map(category => (
                    <option key={category.strCategory || category.strGlass || category.strIngredient1 || category.strAlcoholic}>
                        {category.strCategory || category.strGlass || category.strIngredient1 || category.strAlcoholic}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PrintList;
