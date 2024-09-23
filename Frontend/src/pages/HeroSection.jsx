
import Navbar from '../components/global/Navbar'
import React, { useState, useEffect, useRef } from 'react';
import { ContainerScroll } from '../components/ui/ContainerScroll';
import { MacbookScroll } from '../components/ui/macbook-scroll';
import { GoogleGeminiEffect } from '../components/ui/GeminiEffect';
import { HeroParallax } from '../components/ui/HeroParellox';
import { products } from '../lib/constants';
import { LampContainer } from '../components/ui/LampEffect';
import { motion } from 'framer-motion';
import { CardContainer, CardItem, CardBody } from '../components/ui/InfiniteMovingCards';
import { IconCheck } from '@tabler/icons-react';

function HeroSection() {
   
  
    return (
        <div>
            <Navbar />
            <ContainerScroll titleComponent={<div className="flex items-center justify-center flex-col">
                <button size={'lg'} className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                    Start For Free Today
                  </span>
                </button>
                <h1 className="text-5xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">Automate Your Work With Questor-Ai</h1>
              </div>}>
            </ContainerScroll>
            <HeroParallax products={products} className="relative"/>
            <div>
            <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 relative bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Plans That <br /> Fits You The Best
      </motion.h1>
    </LampContainer>
    <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 -mt-72">
            <CardContainer>
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ={"50"}
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Hobby
                  <h2 className="text-6xl">$0</h2>
                </CardItem>
                <CardItem
                  translateZ={"60"}
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  Get a glimpse of what our software is capable of. Just a heads up {"You'll"} never leave us after this!
                  <ul className="my-4 flex flex-col gap-2">
                    <li className="flex items-center gap-2">
                      <IconCheck/> 3 Free automations
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck/> 100 tasks per month
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck/> two steps action
                    </li>
                    <div className="flex justify-between items-center mt-8">
                      <CardItem
                        translateZ={20}
                        as={"button"}
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                      >
                        Try Now {"->"}
                      </CardItem>
                      <CardItem
                        translateZ={20}
                        as={"button"}
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                      >
                        Get Started Now
                      </CardItem>
                    </div>
                  </ul>
                </CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer>
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ={"50"}
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Pro Plan
                  <h2 className="text-6xl">$29/mon</h2>
                </CardItem>
                <CardItem
                  translateZ={"60"}
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  Get a glimpse of what our software is capable of. Just a heads up {"You'll"} never leave us after this!
                  <ul className="my-4 flex flex-col gap-2">
                    <li className="flex items-center gap-2">
                      <IconCheck /> 3 Free automations
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck/> 100 tasks per month
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck/> two steps action
                    </li>
                    <div className="flex justify-between items-center mt-8">
                      <CardItem
                        translateZ={20}
                        as={"button"}
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                      >
                        Try Now {"->"}
                      </CardItem>
                      <CardItem
                        translateZ={20}
                        as={"button"}
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                      >
                        Get Started Now
                      </CardItem>
                    </div>
                  </ul>
                </CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer>
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ={"50"}
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Unlimited
                  <h2 className="text-6xl">$60/mon</h2>
                </CardItem>
                <CardItem
                  translateZ={"60"}
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  Get a glimpse of what our software is capable of. Just a heads up {"You'll"} never leave us after this!
                  <ul className="my-4 flex flex-col gap-2">
                    <li className="flex items-center gap-2">
                      <IconCheck /> 3 Free automations
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck/> 100 tasks per month
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck/> two steps action
                    </li>
                    <div className="flex justify-between items-center mt-8">
                      <CardItem
                        translateZ={20}
                        as={"button"}
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                      >
                        Try Now {"->"}
                      </CardItem>
                      <CardItem
                        translateZ={20}
                        as={"button"}
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                      >
                        Get Started Now
                      </CardItem>
                    </div>
                  </ul>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
            </div>
        </div>
    );
  }
  
  export default HeroSection;

