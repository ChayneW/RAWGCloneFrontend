'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MotionDiv, variants } from './MotionDiv';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        delay: .5,
        ease: 'easeInOut',
        duration: 1
      }}
    >
      <nav className='w-full mx-auto'>
        {/* <div className='px-10'> */}

          {/* Navbar for screen sizes lg and above */}
          <div className={`max-lg:hidden lg:fixed top-0 z-40 w-full text-white transition-colors duration-300 ${isScrolled ? 'nav-color' : 'bg-transparent'}`}>
            <div className='flex justify-between p-2 px-5'>
              <div className='flex self-center'>
                <Link href={'/'}>
                <Image
                  id='logo'
                  src="https://res.cloudinary.com/db8opthjz/image/upload/v1703042739/chaynedev-high-logo-transparent_aescxi.png"
                  height={150}
                  width={100} 
                  alt='banner'
                />
                </Link>
              </div>

              <div className='flex justify-around gap-5 items-center'>
                <Link href={'/'}>
                  <h1 className='text-lg'>GAMEVAULT</h1>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Navbar for screen sizes max-lg */}
          <motion.div
            className={`max-lg:fixed lg:hidden top-0 z-30 w-full text-white transition-colors duration-300 ${ isScrolled ? 'nav-color' : 'bg-transparent'}`}
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
                <h1>GAMEVAULT</h1>
              </div>
            </div>

            {/* Animated Menu */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
            </motion.div>
          </motion.div>
        {/* </div> */}
      </nav>
    </MotionDiv>
  );
};

export default Navbar;

