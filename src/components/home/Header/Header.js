import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { HiMenuAlt2 } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { logo, logoLight } from '../../../assets/images'
import Image from '../../designLayouts/Image'
import { navBarList } from '../../../constants'
import Flex from '../../designLayouts/Flex'
import MobileNavBar from '../../MobileNavBar/MobileNavBar'
import { useSelector } from 'react-redux'
import { FaCaretDown, FaShoppingCart, FaUser } from 'react-icons/fa'

const Header = () => {
  const [showMenu, setShowMenu] = useState(true)
  const [sidenav, setSidenav] = useState(false)
  const [category, setCategory] = useState(false)
  const [brand, setBrand] = useState(false)
  const location = useLocation()

  const products = useSelector(state => state.orebiReducer.products)
  const [show, setShow] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const navigate = useNavigate()
  const ref = useRef()

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false)
      } else {
        setShowMenu(true)
      }
    }
    ResponsiveMenu()
    window.addEventListener('resize', ResponsiveMenu)
  }, [])

  return (
    <div className='w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200'>
      <nav className='h-full px-4 lg:px-8 max-w-container mx-auto relative'>
        <Flex className='flex items-center justify-between h-full'>
          <Link to='/'>
            <div>
              <Image className='w-20 object-cover' imgSrc={logo} />
            </div>
          </Link>
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='flex items-center w-auto z-50 p-0 gap-2'
              >
                <>
                  {navBarList.map(({ _id, title, link }) => (
                    <NavLink
                      key={_id}
                      className='flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0'
                      to={link}
                      state={{ data: location.pathname.split('/')[1] }}
                    >
                      <li>{title}</li>
                    </NavLink>
                  ))}
                </>
              </motion.ul>
            )}
          </div>

          <div className='flex gap-4 items-center cursor-pointer relative'>
            <div onClick={() => setShowUser(!showUser)} className='flex'>
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className='absolute top-8 right-0 z-50 bg-primeColor p-3 w-44 rounded-md text-[#767676] h-auto'
              >
                <Link to='/signin'>
                  <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                    Login
                  </li>
                </Link>
                <Link onClick={() => setShowUser(false)} to='/signup'>
                  <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                    Sign Up
                  </li>
                </Link>
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Profile
                </li>
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Others
                </li>
              </motion.ul>
            )}
            <Link to='/cart'>
              <div className='relative'>
                <FaShoppingCart />
                <span className='absolute font-titleFont -top-3 -right-3 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white'>
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>

            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className='inline-block md:hidden cursor-pointer w-8 h-6'
            />
          </div>
          {sidenav && <MobileNavBar setSidenav={setSidenav} />}
        </Flex>
      </nav>
    </div>
  )
}

export default Header
