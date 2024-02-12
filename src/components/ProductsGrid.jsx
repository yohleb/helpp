
import {Link, useLoaderData} from 'react-router-dom'

const ProductsGrid = () => {
  const {products} = useLoaderData();
  console.log(products);
  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
    {products.map((item) =>{
      console.log(item);
      const {price, image, title} = item.attributes
      return <Link  key={item.id} to={`/product/${item.id}`} className='card w-full shadow-xl hover:shadow-2xl transition duration-300'>

      <figure className='px-4 pt-4'>
      <img src={image} alt={title} className='rounded-xl h-64 md:h-48 w-full object-cover' />

      </figure>
      <div className='card-body items-center text-center'>
              <h2 className='card-title capitalize tracking-wider'>{title}</h2>
              <span className='text-secondary'>{price / 100} $</span>
            </div>
      </Link>
    })}
      
    </div>
  );
}

export default ProductsGrid;
