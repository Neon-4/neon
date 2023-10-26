import React, { useState, useEffect } from 'react'

const AllCategories = () => {
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Fetch categories from the API endpoint
                const response = await fetch('https://ecom-back.thehive-services.com/api/store/categories/');
                if (response.ok) {
                    const categoriesData = await response.json();
                    console.log("the categories", categoriesData);
                    setAllCategories(categoriesData);
                } else {
                    throw new Error("Failed to fetch categories");
                }
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <span className='text-3xl tracking-wider font-semibold'>Featured Categories</span>
            </div>
            <div className="overflow-x-auto flex pb-4">
                {allCategories.map(category => (
                    <div className="relative w-36 h-36 bg-purple-50 rounded-full flex justify-center items-center text-center p-5 shadow-xl hover:scale-110 transition-transform duration-500" key={category.id}>
                        <p className='absolute text-2xl text-charcoal-800'>
                        {category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    ) 
}        

export default AllCategories