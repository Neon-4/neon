// components/AllCategories.js
import { useState, useEffect } from 'react';
import CategoryItem from './CategoryItem';

const AllCategories = () => {
const [categories, setCategories] = useState([]);

useEffect(() => {
// Fetch categories from your API or database

fetch('http://localhost:8000/categories')
    .then((response) => response.json())
    .then((data) => setCategories(data));
}, []);

return (
<div>
    <h1>All Categories</h1>
    <ul>
    {categories.map((category) => (
        <li key={category.id}>
        <CategoryItem category={category} />
        </li>
    ))}
    </ul>
</div>
);
};

export default AllCategories;
