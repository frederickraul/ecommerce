import Link from 'next/link';
import React,{useState, useEffect} from 'react'
import {BsBagCheckFill} from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFirework } from '../lib/utils';
const Success = () => {
    const { setcartItems, settotalPrice, settotalQuantities} = useStateContext();
    useEffect(()=>{
      localStorage.clear();
      setcartItems([]);
      settotalPrice(0);
      settotalQuantities(0);
      runFirework();
    },[])
    
    const [order, setorder] = useState();

  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your order!</h2>
            <p className='email-msg'>Check your email inbox for the receipt</p>
            <p className='description'>
              If you have any questions, please email
              <a className='email' href='mailto:order@example.com'>
                order@example.com
              </a>
            </p>
            <Link href="/">
              <button className='btn' type='button' width='300px'>
                Continue Shopping
              </button>
            </Link>
        </div>
    </div>
  )
}

export default Success