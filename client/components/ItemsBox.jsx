import React from 'react';
import AddToCartButton from './AddToCartButton';
import Link from 'next/link'
// import Image from 'next/image';


const ItemBox = ({ id, image, name, price }) => {
    console.log()

    return (
        <div className="bg-[#eae7e7] rounded-lg p-4 shadow-md mx-2 hover:scale-105 transition-transform duration-500" key={id}>
                <Link href={`/products/${id}/view`}>
                    <img src={image} alt={name} className=" object-cover mb-2" draggable='false'/>
                    <p className="text-left font-bold text-xs md:text-md lg:text-md">{name}</p>
                    <p className="text-left text-xs md:text-md lg:text-md mt-3">{price}</p>
                </Link>
                <div className='mt-6'>
                    <AddToCartButton />
                </div>
            </div>
    );
};

export default ItemBox;
