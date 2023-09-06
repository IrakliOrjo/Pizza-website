'use client'

import React,{useState, useEffect, useContext} from 'react'

import Image from 'next/image'

import SizeSelection from './SizeSelection'
import CrustSelection from './CrustSelection'
import Topping from './Topping'

//context
import { CartContext } from '../context/CartContext'

const PizzaDetails = ({ pizza, setModal }) => {
//pizza site state
  const [size, setSize] = useState('small')
// pizza crust state
  const [crust, setCrust] = useState('traditional')
//pizza topping state
  const [additionalTopping, setAdditionalTopping] = useState([])
  // additional topping price
  const [additionalToppingPrice, setAdditionalToppingPrice] = useState(0)

  const [price, setPrice] = useState(0)

  const { addToCart } = useContext(CartContext)

  

  //set the price on the pizza size
  useEffect(() => {
    size === 'small' ? setPrice(parseFloat(pizza.priceSm + additionalToppingPrice).toFixed(2)) :
    size === 'medium' ? setPrice(parseFloat(pizza.priceMd + additionalToppingPrice).toFixed(2)) :
    size === 'large' ? setPrice(parseFloat(pizza.priceLg + additionalToppingPrice).toFixed(2)) 
    : null;
  })

  //set additional topping price

  useEffect(() => {
    if(additionalTopping.length > 0){
      const toppingPrice = additionalTopping.reduce((a,c) => {
        return a * c.price
      }, 0)
      setAdditionalToppingPrice(toppingPrice)
    }else{
      setAdditionalToppingPrice(0)
    }
  },[additionalTopping])

  return (
    <div className='flex flex-col lg:flex-row lg:gap-x-8 h-full md:p-8'>
      <div className='lg:flex-1 flex justify-center items-center'>
        <div className='max-w-[300px] lg:max-w-none mt-6 lg:mt-0'>
          <Image width={450} height={450} src={pizza.image} alt='pizza' 
          priority={1} className='mx-auto relative' />
        </div>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex-1 p-2 text-center lg:text-left '>
          <div className='flex-1 bg-white overflow-y-scroll h-[46vh] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-white pr-2 '>
            <div className='font-semibold'>
              <h2 className='capitalize text-3xl mb-1'>{pizza.name}</h2>
            <div className='mb-6 text-lg font-medium '>
              <span>{size === 'small' 
               ? '25cm' : size === 'medium'
               ? '30 cm' 
               : size=== 'large' 
               ? '35 cm' 
               : null}</span>
               <span>{crust} crust</span>
            </div>
            </div>
            <SizeSelection pizza={pizza} size={size} setSize={setSize} />
            <CrustSelection crust={crust} setCrust={setCrust} />
            <div className='mb-4 text-xl font-semibold '>Choose Topping</div>
            <div className='flex flex-1 flex-wrap gap-2 py-1 justify-center lg:justify-start'>
              {pizza.toppings?.map((topping, index) => {
                return <Topping topping={topping} 
                additionalTopping={additionalTopping} 
                setAdditionalTopping={setAdditionalTopping} 
                key={index} />
              })}
            </div>
          </div>
        </div>
        {/*add to cart btn */}
        <div className='h-full flex items-center px-2 lg:items-end '>
          <button 
          onClick={() =>
            {
            addToCart(
               pizza.id, 
               pizza.image, 
               pizza.name, 
               price, 
               additionalTopping, 
               size, 
               crust
               ),
               setModal(false)
            }
          } 
          className='btn btn-lg gradient w-full flex justify-center gap-x-2 '>
            <div>add to cart for</div>
            <div>$ {price}</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaDetails