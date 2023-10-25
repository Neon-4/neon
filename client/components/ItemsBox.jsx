import React from 'react';
import AddToCartButton from './AddToCartButton';
import Link from 'next/link'

const ItemBox = ({ id, image, itemName, itemPrice }) => {
    return (
        <div className="bg-[#eae7e7] rounded-lg p-4 shadow-md mx-2 hover:scale-105 transition-transform duration-500">
            <Link href={`/store/${encodeURIComponent(id.slug)}/view`}>
                <img src={image} alt={itemName} className=" object-cover mb-2" draggable='false'/>
                <p className="text-left font-bold text-xs md:text-md lg:text-md">{itemName}</p>
                <p className="text-left text-xs md:text-md lg:text-md mt-3">{itemPrice}</p>
            </Link>
            <div className='mt-6'>
                <AddToCartButton />
            </div>
        </div>
    );
};

export default ItemBox;
