import React, { useState } from 'react'
import ItemBox from './ItemsBox'

const RecommendedItems = () => {
    const items = [
        {
            index: 1,
            image: 'https://m.media-amazon.com/images/I/51Y2jSytusL._SX300_SY300_QL70_FMwebp_.jpg',
            itemName: 'Colgate Optic White Overnight Teeth Whitening Pen',
            itemPrice: '$17.35',
        },
        {
            index:2,
            image: 'https://m.media-amazon.com/images/I/31Bfzl8w8qL._SX300_SY300_QL70_FMwebp_.jpg',
            itemName: 'Waterpik Aquarius Water Flosser Professional For Teeth',
            itemPrice: '$74.97',
        },        
        {
            index:3,
            image: 'https://m.media-amazon.com/images/I/312ijnXq4rL._SX300_SY300_QL70_FMwebp_.jpg',
            itemName: 'SKIN PERFECTING 2% BHA Liquid Salicylic Acid',
            itemPrice: '$34.93',
        },      
        {
            index: 4,
            image: 'https://m.media-amazon.com/images/I/71SU7uQJO5L.__AC_SX300_SY300_QL70_FMwebp_.jpg',
            itemName: 'RESTCLOUD Neck and Shoulder Relaxer',
            itemPrice: '$19.99',
        },        {
            image: 'https://m.media-amazon.com/images/I/31+mC6e0xkL._SY300_SX300_.jpg',
            itemName: 'SKIN PERFECTING 2% BHA Liquid Salicylic Acid',
            itemPrice: '$19.99',
        },        
        {
            index: 5,
            image: 'https://m.media-amazon.com/images/I/415jogGYMuL._SX300_SY300_QL70_FMwebp_.jpg',
            itemName: 'Proactiv Acne Treatment',
            itemPrice: '$54.87',
        },
    ]

    const [startIndex, setStartIndex] = useState(0);
    const repurchaseItems = items.slice(startIndex, startIndex + 5);

    const handleNext = () => {
        if (startIndex + 5 < items.length) {
            setStartIndex(startIndex + 5);
        }
    };

    const handlePrev = () => {
        if (startIndex - 5 >= 0) {
            setStartIndex(startIndex - 5);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <span className='text-3xl tracking-wider font-semibold'>Buy Again</span>
                <div className="flex">
                    <button className="text-gray-600" onClick={handlePrev}>&lt; Prev</button>
                    <span className="text-gray-600 mx-2">|</span>
                    <button className="text-gray-600" onClick={handleNext}>Next &gt;</button>
                </div>
            </div>
            <div className="overflow-x-auto flex pb-4">
                {repurchaseItems.map((item, index) => (
                    <ItemBox key={index} image={item.image} itemName={item.itemName} itemPrice={item.itemPrice} />
                ))}
            </div>
        </div>
    )
}

export default RecommendedItems
