import React from 'react';
import AddToCartButton from './AddToCartButton';
import Link from 'next/link'

const ItemBox = ({ id, image, itemName, itemPrice }) => {
    // if (!id || typeof id !== 'object' || !id.slug) {
    //     console.log("error")
    //     return null;
    // }
    return (
        <Link href={`/products/${id}`}>
            <div className="bg-[#eae7e7] rounded-lg p-4 shadow-md mx-2 hover:scale-105 transition-transform duration-500">
                <img src={image} alt={itemName} className=" object-cover mb-2" draggable='false'/>
                <p className="text-left font-bold text-xs md:text-md lg:text-md">{itemName}</p>
                <p className="text-left text-xs md:text-md lg:text-md mt-3">{itemPrice}</p>
                <div className='mt-6'>
                    <AddToCartButton />
                </div>
            </div>
        </Link>
    );
};

export default ItemBox;
