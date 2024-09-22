import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from 'react-icons/fa'
import Flex from '../../designLayouts/Flex'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { paginationItems } from '../../../constants'
import { BiCategory } from 'react-icons/bi'

const HeaderBottom = () => {
  const products = useSelector(state => state.orebiReducer.products)
  const [show, setShow] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const navigate = useNavigate()
  const ref = useRef()
  useEffect(() => {
    document.body.addEventListener('click', e => {
      if (ref.current.contains(e.target)) {
        setShow(true)
      } else {
        setShow(false)
      }
    })
  }, [show, ref])

  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showSearchBar, setShowSearchBar] = useState(false)

  const handleSearch = e => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    const filtered = paginationItems.filter(item =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchQuery])

  return (
    <div className='w-full bg-[#F5F5F3] relative'>
      <div className='max-w-container mx-auto'>
        <Flex className='flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 lg:px-8 py-2 h-full'>
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className='flex h-14 cursor-pointer items-center gap-2 text-primeColor'
          >
            <BiCategory className='w-5 h-5' />
            <p className='text-[14px] font-normal'>Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className='absolute top-16 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6'
              >
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Accessories
                </li>
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Furniture
                </li>
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Electronics
                </li>
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Clothes
                </li>
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Bags
                </li>
                <li className='text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer'>
                  Home appliances
                </li>
              </motion.ul>
            )}
          </div>
          <div className='relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl'>
            <input
              className='flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]'
              type='text'
              onChange={handleSearch}
              value={searchQuery}
              placeholder='Search your products here'
            />
            <FaSearch className='w-5 h-5' />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {searchQuery &&
                  filteredProducts.map(item => (
                    <div
                      onClick={() =>
                        navigate(
                          `/product/${item.productName
                            .toLowerCase()
                            .split(' ')
                            .join('')}`,
                          {
                            state: {
                              item: item
                            }
                          }
                        ) &
                        setShowSearchBar(true) &
                        setSearchQuery('')
                      }
                      key={item._id}
                      className='max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3'
                    >
                      <img className='w-24' src={item.img} alt='productImg' />
                      <div className='flex flex-col gap-1'>
                        <p className='font-semibold text-lg'>
                          {item.productName}
                        </p>
                        <p className='text-xs'>{item.des}</p>
                        <p className='text-sm'>
                          Price:{' '}
                          <span className='text-primeColor font-semibold'>
                            ${item.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className=''></div>
        </Flex>
      </div>
    </div>
  )
}

export default HeaderBottom
