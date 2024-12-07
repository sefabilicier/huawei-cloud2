'use client';

import  { React, useState, useEffect } from 'react';
import {
  Dialog,
  DialogPanel,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import huaweiLogo from "../assets/huaweiLogo.jpg";
import { FiGithub } from "react-icons/fi";


import { useNavigate } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

import { Link } from 'react-router-dom';

import { MdOutlineArrowForwardIos } from "react-icons/md";

const HuaweiPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const people = [
    {
      name: 'Burak Ünal',
      role: 'Team member',
      title: 'Software Engineering',
      linkedinURL: 'https://tr.linkedin.com/in/ridvan-burak-unal',
      githubURL: 'https://github.com/rburakunal',
      imageUrl: 'https://www.linkedin.com/dms/prv/vid/v2/D4D06AQHRFoIUPtYCVg/messaging-attachmentFile/messaging-attachmentFile/0/1732974580029?m=AQIeDsXzbhb4yQAAAZN9fiTZIuU4U0mHcG64jNMRSSJEEYc7KNctCg-fAQ&ne=1&v=beta&t=Xj9gV92Sigep4xKlu0LFc6X6-kGSHXPCL3TelxYyNtw',
    },
    {
      name: 'Elif Yıldız',
      role: 'Team member',
      title: 'Industrial Engineering',
      linkedinURL: 'https://www.linkedin.com/in/elyfyl?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADH2RpMBOz_RxeZm2GfwzBj0TVW2d0XK2Ts&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_people%3B5gfHTfE0QTGPBpPW2ouGQA%3D%3D',
      githubURL: 'https://github.com/elyfyl',
      imageUrl: 'https://www.linkedin.com/dms/prv/vid/v2/D4D06AQFypDMhU0s1xg/messaging-attachmentFile/messaging-attachmentFile/0/1732974587688?m=AQI12CX-ssaqJgAAAZN9fiTTutnltU14A9QaHCQPi1nHStgWocdPfEqZSQ&ne=1&v=beta&t=wvwP8Tj954PN1W0oK_1dMhN8KDxQfFh1sxQ_NSAPcpw',
    },
    {
      name: 'Sefa Bilicier',
      role: 'Team member',
      title: 'Software Engineering',
      linkedinURL: 'https://tr.linkedin.com/in/sefabilicier',
      githubURL: 'https://github.com/sefabilicier',
      imageUrl: 'https://www.linkedin.com/dms/prv/vid/v2/D4D06AQGWeuEkP9sI-Q/messaging-attachmentFile/messaging-attachmentFile/0/1732977575826?m=AQLV0iH3t2v9FgAAAZN9g1XnPz09pIV-lT1QjaW1T1XGgOwz9gXP15U1zg&ne=1&v=beta&t=xN7lOZOv1a8tL3JmSFSmMKIADM6vsHSvay71SIbyIkY',
    },
    {
      name: 'Zeynep Atçeken',
      role: 'Team member',
      title: 'Computer Engineering',
      linkedinURL: 'https://www.linkedin.com/in/zeynepatceken?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADgiySoBeegXYptQ0V9Vnf6yQ6PCcOeBOY4&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BsFPKIgfYQoaOZkPd4%2Fr%2Fzg%3D%3D',
      githubURL: 'https://github.com/zeynepatceken',
      imageUrl: 'https://www.linkedin.com/dms/prv/vid/v2/D4D06AQHb-Q4L_33fNA/messaging-attachmentFile/messaging-attachmentFile/0/1732959397718?m=AQIxHaLGCaDqbwAAAZN8fmBfPmM3ZgVecSeZVzN1vllCAzT6qLMZIx8Pww&ne=1&v=beta&t=9Y4mQ-1QhhgQfPK5dGMExhABAzWT7zmVfwoPT3-5-ao',
    },
    


  ]

  const navigate = useNavigate();

  const handleStartClick = () => {
    setTimeout(() => {
      navigate("/scenario");
    }, 500); // 500ms sonra yönlendirme yapılır
  };

  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state

  const nextStep = () => {
    setActiveStep((prevStep) => (prevStep < 3 ? prevStep + 1 : 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed
    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="loader"></div> {/* Loader animation */}
        </div>
      ) : (
        // Your existing main page JSX
        <div className="huawei-page">
          {/* Main Page Content */}
          {/*header section*/}
          <header className="bg-white font-title">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
              <div className="flex lg:flex-1">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Cloud for Everyone</span>
                  <Link to="/">
                    <img
                      alt="Huawei Logo"
                      src={huaweiLogo}
                      className="h-10 w-auto"
                    />
                  </Link>
                </a>
              </div>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                <a href="#" className="text-sm/6 font-semibold text-gray-900">
                  Project
                </a>
                <a
                  href="https://github.com/sefabilicier/huawei-cloud/tree/restored-branch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  <FiGithub size={24} />
                </a>
              </div>

            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
              <div className="fixed inset-0 z-10" />
              <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img
                      alt=""
                      src={huaweiLogo}
                      className="h-8 w-auto"
                    />
                  </a>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {/* <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Team
                  </a> */}
                      <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Project
                      </a>
                      <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        <FiGithub />
                      </a>
                    </div>

                  </div>
                </div>
              </DialogPanel>
            </Dialog>
          </header>

          {/*main section*/}
          <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 font-title">
            <div className="text-center /* col-start-1 row-start-1 */">
              <p className="text-base font-semibold text-red-600">Possible with</p>
              <h1 className="mt-4 text-5xl font-bold tracking-tight bg-gradient-to-r from-red-600 via-gray-300 to-gray-700 bg-clip-text text-transparent sm:text-7xl leading-[1.2] pt-2 pb-2 animate-gradient-flow bg-[length:200%]">
                Cloud for Everyone
              </h1>
              <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                Delivering tailored solutions directly to your account with precision.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  onClick={handleStartClick}
                  href="#"
                  className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-red-600 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Get Started
                </a>
                {/* <a href="#" className="text-sm font-semibold text-gray-900">
              Information <span aria-hidden="true">&rarr;</span>
            </a> */}
              </div>
            </div>

            {/*  <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 font-title col-start-1 row-start-1 transform -translate-x-[800px]">

          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
              <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Home page</h3>
            <p className="text-sm"></p>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Account Info</h3>
            <p className="text-sm">Step details here</p>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Review</h3>
            <p className="text-sm">Step details here</p>
          </li>
          <li className="ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Confirmation</h3>
            <p className="text-sm">Step details here</p>
          </li>
        </ol> */}
          </main >

          <div className="flex flex-col items-center justify-center bg-white font-title space-y-8">
            {/* Heading */}
            <p className="text-center text-2xl font-bold text-red-600">Guiding Your Path</p>

            {/* Path */}
            <ol className="flex items-center justify-center w-full space-y-4 sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
              <li className="flex items-center text-red-600 dark:text-red-500 space-x-2.5 rtl:space-x-reverse">
                <span className="flex items-center justify-center w-8 h-8 border border-red-600 rounded-full shrink-0 dark:border-red-500">
                  1
                </span>
                <span>
                  <h3 className="font-semibold leading-tight">Info</h3>
                  <p className="text-sm">Click Get Started!</p>
                </span>

              </li>
              <MdOutlineArrowForwardIos
                className={`place-items-center text-red-600 ${activeStep === 1 ? 'animate-bounce' : ''
                  }`}
              />
              <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
                <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  2
                </span>
                <span>
                  <h3 className="font-medium leading-tight">Scenario Selection</h3>
                  <p className="text-sm">Find a scenario fits your needs!</p>
                </span>
              </li>
              <MdOutlineArrowForwardIos className="place-items-center text-gray-600" />
              <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
                <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  3
                </span>
                <span>
                  <h3 className="font-medium leading-tight">Confirmation</h3>
                  <p className="text-sm">Your credentials.</p>
                </span>
              </li>
            </ol>
          </div>

          {/*team section*/}
          <div className="bg-white py-24 sm:py-32 font-title" >
            <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
              <div className="max-w-xl">
                <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  Meet our team
                </h2>
                <p className="mt-6 text-lg/8 text-gray-600">
                  We are Big4, cloud engineering interns at
                  <span className='text-red-600 font-bold'> Huawei</span>.
                  We built this project to help you use Huawei Cloud services more easily and effectively.
                  Do not hesitate to contact us!

                </p>
                <p className="mt-6 text-lg/8 text-gray-600 font-semibold">
                  Stay cloud-connected!
                </p>

              </div>
              <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                {people.map((person) => (
                  <li key={person.name}>
                    <a

                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-x-16"
                    >
                      {/* Görsel */}
                      <div className="relative overflow-hidden rounded-full">
                        <img
                          alt={person.name}
                          src={person.imageUrl}
                          className="h-16 w-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      {/* İsim ve Rol */}
                      <div>
                        <h3 className="text-base font-semibold tracking-tight text-gray-900">
                          {person.name}
                        </h3>
                        <p className="text-sm text-red-600">{person.role}</p>
                        <p className="text-sm font-semibold text-red-500">{person.title}</p>

                        <div className='flex items-center mt-2 space-x-3'>
                          <a href={person.linkedinURL} target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className='bg-color' />
                          </a>
                          <a href={person.githubURL} target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                          </a>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div >
          {/*team section*/}
          <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 font-title" >
            <div className="flex flex-col lg:flex-row justify-center gap-8">
              <div className="w-full lg:w-5/12 flex flex-col text-center">
                <h1 className="text-2xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 j">About Us</h1>
                <p className="font-normal text-base leading-6 text-gray-600 ">
                  Welcome to Big4! We are a dedicated team of Cloud Engineering Interns at Huawei, passionate about empowering users to make the most of Huawei Cloud services. Throughout our journey, we have worked together to develop a project designed to help you navigate the cloud with greater ease, efficiency, and effectiveness.
                </p>
              </div>
              {/* <div className="w-full lg:w-8/12 ">
            <img className="w-full h-full" src="https://i.ibb.co/FhgPJt8/Rectangle-116.png" alt="A group of People" />
          </div> */}
            </div>

            <div className="flex lg:flex-row flex-col justify-center gap-8 pt-12">
              <div className="w-full lg:w-5/12 flex flex-col justify-center text-center">
                <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Story</h1>
                <p className="font-normal text-base leading-6 text-gray-600 ">Our primary goal is to simplify the process of discovering and implementing the right Huawei Cloud solutions for your unique needs. Whether you're a business, developer, or cloud enthusiast, we’ve crafted a resource to guide you through the vast array of services that Huawei Cloud offers.</p>
              </div>
              <div className="w-full lg:w-5/12 flex flex-col justify-center text-center">
                <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-red-600 pb-4">Let's begin</h1>
                <p className="font-normal text-base leading-6 text-gray-600 ">Join us as we explore the possibilities of Huawei Cloud! We invite you to explore our project in detail and discover how we can help you unlock the full potential of Huawei Cloud services.</p>
              </div>

              {/* People Section */}
              {/* <div className="w-full lg:w-8/12 lg:pt-8">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
              {people.map((person) => (
                <div
                  key={person.name}
                  className="p-4 pb-6 flex justify-center flex-col items-center"
                >
                  <img
                    className="md:block hidden w-24 h-24 rounded-full object-cover"
                    alt={person.name}
                    src={person.imageUrl}
                  />
                  <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                    {person.name}
                  </p>
                </div>
              ))}
            </div>
          </div> */}

            </div>
          </div >


          {/*Footer*/}
          <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 font-title" >
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="" className="hover:underline">Big4</a> All Rights Reserved.
              </span>
              <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                  <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                  <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Contact</a>
                </li>
                <li>
                </li>
              </ul>
            </div>

          </footer >
          {/*Footer*/}
        </div>
      )}
    </>
  );
};

export default HuaweiPage;
