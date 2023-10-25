import React from 'react'

const productBox = ({ productImage, productName, productDescription, productPrice}) => {
  return (
    <div className="bg-[#eae7e7] rounded-lg p-4 shadow-md mx-2 hover:scale-105 transition-transform duration-500">
        <img src={productImage} alt={productName} className=" object-cover mb-2" draggable='false'/>
        <p className="text-left font-bold text-xs md:text-md lg:text-md">{productName}</p>
        <p className="text-left text-xs md:text-md lg:text-md mt-3">{productDescription}</p>
        <p className="text-left text-xs md:text-md lg:text-md mt-3">{productPrice}</p>
        <div className='mt-6'>
            <AddToCartButton />
        </div>
    </div>
    )
}

export default productBox