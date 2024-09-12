'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MotionDiv, variants } from './MotionDiv';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
//   const menuRef = useRef(null);

  // Function to toggle menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MotionDiv 
      className=''
      variants={variants}
      initial='hidden'
      animate='visible'
      transition={{
        // using index of card as a index timer to sequentially show cards:
        delay: 3.5,
        ease: 'easeInOut',
        duration: 1
      }}
    >
      <nav className='w-full mx-auto'>
        {/* <div className='px-10'> */}

          {/* Navbar for screen sizes lg and above */}
          <div className={`max-lg:hidden lg:fixed top-0 z-40 w-full text-white transition-colors duration-300 ${isScrolled ? 'bg-transparent' : 'nav-color'}`}>
          {/* <div className={`max-lg:hidden lg:fixed top-0 z-20 w-full text-white transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}> */}
            <div className='flex justify-between p-2 px-5'>
              <div className='flex self-center'>
                <Link href={'/'}>
                  <Image
                    width={50}
                    height={50}
                    src='/joshua-kettle-unsplash.jpg'
                    // src={'/notch-fix-3-color-speak.png'}
                    // src="/notch-fix.png"
                    alt='Toggle Menu'
                  />
                </Link>
              </div>

              <div className='flex justify-around gap-5 items-center'>
                <h1>GAMEVAULT</h1>
                {/* <Link href={'#Artists'}><h1 className=''>New Releases</h1></Link>
                <Link href={'#About'}><h1 className=''>About</h1></Link>
                <Link href={'#Contact'}><h1 className=''>Lets Talk</h1></Link> */}
              </div>
            </div>
          </div>
          
          {/* Navbar for screen sizes max-lg */}
          <motion.div
            // className={`max-lg:fixed lg:hidden top-0 z-20 w-full text-white transition-colors duration-300 ${isScrolled ? 'bg-emerald-600' : 'bg-transparent'}`}
            className={`max-lg:fixed lg:hidden top-0 z-20 w-full text-white transition-colors duration-300 ${isOpen || isScrolled ? 'bg-transparent' : 'nav-color'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className='flex justify-between p-5'>
              <div className='flex self-center'>
                <Link href={'/'}>
                  <Image
                    width={30}
                    height={30}
                    src='/joshua-kettle-unsplash.jpg'
                    // src={'/notch-fix-3-color-speak.png'}
                    alt='Toggle Menu'
                  />
                </Link>
              </div>

              {/* Hamburger Icon */}
              <div className='lg:hidden'>
                {/* <button onClick={toggleMenu}>
                  <Image
                    width={30}
                    height={30}
                    src={isOpen ? '/close.svg' : '/hamburger-2.svg'}
                    alt='Toggle Menu'
                  />
                </button> */}
                <h1>GAMEVAULT</h1>
              </div>
            </div>

            {/* Animated Menu */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`${isOpen  ? 'pb-5' : ''}`}

            >
              <div className='flex flex-col pt-5'>
                {/* <Link href={'#Artists'}><h1 className='text-2xl'>New Releases</h1></Link>
                <Link href={'#About'}><h1 className='text-2xl'>About</h1></Link>
                <Link href={'#Contact'}><h1 className='text-2xl'>Lets Talk</h1></Link> */}
                
              </div>
            </motion.div>
          </motion.div>
        {/* </div> */}
      </nav>
    </MotionDiv>
  );
};

export default Navbar;

