import React, { useState } from 'react'
import { navBarList } from '../../constants'
import { motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { logoLight } from '../../assets/images'
import { MdClose } from 'react-icons/md'

const MobileNavBar = ({ setSidenav }) => {
  const [showMenu, setShowMenu] = useState(true)
  const [category, setCategory] = useState(false)
  const [brand, setBrand] = useState(false)
  const location = useLocation()

  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50'>
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='w-[80%] h-full relative'
      >
        <div className='w-full h-full bg-primeColor p-6'>
          <img className='w-28 mb-6' src={logoLight} alt='logoLight' />
          <ul className='text-gray-200 flex flex-col gap-2'>
            {navBarList.map(item => (
              <li
                className='font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0'
                key={item._id}
              >
                <NavLink
                  to={item.link}
                  state={{ data: location.pathname.split('/')[1] }}
                  onClick={() => setSidenav(false)}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className='mt-4'>
            <h1
              onClick={() => setCategory(!category)}
              className='flex justify-between text-base cursor-pointer items-center font-titleFont mb-2'
            >
              Shop by Category{' '}
              <span className='text-lg'>{category ? '-' : '+'}</span>
            </h1>
            {category && (
              <motion.ul
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className='text-sm flex flex-col gap-1'
              >
                <li className='headerSedenavLi'>New Arrivals</li>
                <li className='headerSedenavLi'>Gudgets</li>
                <li className='headerSedenavLi'>Accessories</li>
                <li className='headerSedenavLi'>Electronics</li>
                <li className='headerSedenavLi'>Others</li>
              </motion.ul>
            )}
          </div>
          <div className='mt-4'>
            <h1
              onClick={() => setBrand(!brand)}
              className='flex justify-between text-base cursor-pointer items-center font-titleFont mb-2'
            >
              Shop by Brand
              <span className='text-lg'>{brand ? '-' : '+'}</span>
            </h1>
            {brand && (
              <motion.ul
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className='text-sm flex flex-col gap-1'
              >
                <li className='headerSedenavLi'>New Arrivals</li>
                <li className='headerSedenavLi'>Gudgets</li>
                <li className='headerSedenavLi'>Accessories</li>
                <li className='headerSedenavLi'>Electronics</li>
                <li className='headerSedenavLi'>Others</li>
              </motion.ul>
            )}
          </div>
        </div>
        <span
          onClick={() => setSidenav(false)}
          className='w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300'
        >
          <MdClose />
        </span>
      </motion.div>
    </div>
  )
}

export default MobileNavBar
