import React from 'react'
import RecommendedItems from './RecommendedItems'
import BuyAgain from './BuyAgain'
import AllProducts from './products/allProducts'
import AllCategories from './categories/allCategories'
import PopularItems from './PopularItems'

const Landing = () => {
  return (
    <div>
      <div className='px-10 pt-10'>
        <div className='mb-10'>
          <AllCategories/>
        </div>
        <div className='mb-10'>
          <AllProducts/>
        </div>
        {/* <div className='mb-10'>
          <PopularItems />
        </div>
        <div className='mb-10'>
          <RecommendedItems/>
        </div>
        <div className='mb-10'>
          <BuyAgain/>
        </div> */}
      </div>
    </div>
  )
}

export default Landing
