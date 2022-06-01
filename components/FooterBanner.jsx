import React from 'react'

import { urlFor } from '../lib/client';
import Link from 'next/link';
import Product from './Product';

const FooterBanner = ({footerBanner: {discount,largeText,largeText2,saleTime,smallText,midText, desc,buttonText, product,image}}) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
            <p>{discount}</p>
            <h3>{largeText}</h3>
            <h3>{largeText2}</h3>
            <p>{saleTime}</p>
        </div>        
        <div className='right'>
            <p>{smallText}</p>
            <h3>{midText}</h3>
            <p>{desc}</p>
            <Link href={`/product/${product}`}>
              <button type='button'>{buttonText}</button>
            </Link>
        </div>

        <img src={urlFor(image)} className='footer-banner-image'/>
      </div>
    </div>
  )
}

export default FooterBanner