import { customFetch } from "../utils";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { generateAmountOptions } from "../utils/index.jsx";
import { useDispatch } from "react-redux";
import { formatPrice } from "../utils";
import { addItem } from "../features/cart/cartSlice.js";
export const loader = async({params}) =>{
  const {id} = params;
  const {data} = await customFetch(`/products/${id}`)
  return {id, data}
}


const SingleProduct = () => {

const {data} = useLoaderData();

const pojedinacni = data.data
console.log(pojedinacni)
  const {image, title, price, description, colors, company} = pojedinacni.attributes;
  const [colore, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleAmount = (e) =>{
    setAmount(parseInt(e.target.value))
  }

  const cartProduct= {
    cartId: pojedinacni.id + colore,
    productId: pojedinacni.id,
    image,
    title,
    price,
    company,
    colore,
  }


  const addToCart = () =>{
    dispatch(addItem({product: cartProduct}))
  }

  const dispatch = useDispatch()

    return (
      <section>
      <div className='text-md breadcrumbs'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className='w-96 h-96 object-cover rounded-lg lg:w-full'
        />
        {/* PRODUCT */}
        <div>
          <h1 className='capitalize text-3xl font-bold'>{title}</h1>
          <h4 className='text-xl text-neutral-content font-bold mt-2'>
            {company}
          </h4>
          <p className='mt-3 text-xl'>{formatPrice(price)}</p>
          <p className='mt-6 leading-8'>{description}</p>
          {/* COLORS */}
          <div className='mt-6'>
            <h4 className='text-md font-medium tracking-wider capitalize'>
              colors
            </h4>
            <div className='mt-2'>
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type='button'
                    className={`badge w-6 h-6 mr-2 ${
                      color === colore && 'border-2 border-secondary'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className='form-control w-full max-w-xs'>
            <label className='label' htmlFor='amount'>
              <h4 className='text-md font-medium -tracking-wider capitalize'>
                amount
              </h4>
            </label>
            <select
              className='select select-secondary select-bordered select-md'
              id='amount'
              value={amount}
              onChange={handleAmount}
            >{generateAmountOptions(20)}
            </select>
          </div>
          {/* CART BTN */}
          <div className='mt-10'>
            <button className='btn btn-secondary btn-md' 
            onClick={addToCart} >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
    );
  }
  
  export default SingleProduct;
  