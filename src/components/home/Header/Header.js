import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { HiMenuAlt2 } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { logo, logoLight } from '../../../assets/images'
import Image from '../../designLayouts/Image'
import { navBarList } from '../../../constants'
import Flex from '../../designLayouts/Flex'
import MobileNavBar from '../../MobileNavBar/MobileNavBar'

const Header = () => {
  const [showMenu, setShowMenu] = useState(true)
  const [sidenav, setSidenav] = useState(false)
  const [category, setCategory] = useState(false)
  const [brand, setBrand] = useState(false)
  const location = useLocation()
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
      <nav className='h-full px-4 max-w-container mx-auto relative'>
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
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className='inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4'
            />
            {sidenav && <MobileNavBar setSidenav={setSidenav} />}
          </div>
        </Flex>
      </nav>
    </div>
  )
}

export default Header
