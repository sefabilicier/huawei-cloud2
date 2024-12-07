'use client';

import { React, useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";
import { useTerraformFileStore } from "../stores/terraformFile";
import { useScenarioStore } from "../stores/scenario";


import huaweiLogo from "../assets/huaweiLogo.jpg";
import { FiGithub } from "react-icons/fi";

import.meta.url

import { Link } from 'react-router-dom';

import { MdOutlineArrowForwardIos } from "react-icons/md";

const HuaweiScenario = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Zustand Store'larından gelen fonksiyon
  const { fetchTerraformFiles } = useTerraformFileStore();
  const { fetchScenarios } = useScenarioStore();

  const [selectedScenario, setSelectedScenario] = useState("");
  const [selectedCost, setSelectedCost] = useState("");

  const [isAlertVisible, setIsAlertVisible] = useState(true); // State for visibility
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message

  const handleClose = () => {
    setIsAlertVisible(false); // Hide the alert
  };

  const [activeStep, setActiveStep] = useState(1);

  const nextStep = () => {
    setActiveStep((prevStep) => (prevStep < 3 ? prevStep + 1 : 1));
  };


  // Scenario ve Cost seçimine göre ID eşleştirme
  const scenarioMapping = {
    "Simple Website Hosting": {
      "Low Performance/Low Cost": { id: "673d86bb9cb3b9bf0269aaa2", img: "1A.jpg" },
      "High Performance/High Cost": { id: "673d86bc9cb3b9bf0269aaa5", img: "1B.jpg" },
      "Medium Performance/Medium Cost": { id: "673d86bc9cb3b9bf0269aaa8", img: "1C.jpg" },
      "High Performance/Low Cost": { id: "673d86bc9cb3b9bf0269aaab", img: "1D.jpg" },
    },
    "Database Hosting": {
      "Low Performance/Low Cost": { id: "673d86bd9cb3b9bf0269aab1", img: "2A.jpg" },
      "High Performance/High Cost": { id: "673d86bd9cb3b9bf0269aab4", img: "2B.jpg" },
      "Medium Performance/Medium Cost": { id: "673d86be9cb3b9bf0269aab7", img: "2C.jpg" },
      "High Performance/Low Cost": { id: "673d86be9cb3b9bf0269aaba", img: "2D.jpg" },
    },
    "High Traffic Web Application": {
      "Low Performance/Low Cost": { id: "673d86bf9cb3b9bf0269aac0", img: "3A.jpg" },
      "High Performance/High Cost": { id: "673d86bf9cb3b9bf0269aac3", img: "3B.jpg" },
      "Medium Performance/Medium Cost": { id: "673d86c09cb3b9bf0269aac6", img: "3C.jpg" },
      "High Performance/Low Cost": { id: "673deac914accbd8609451fe", img: "3D.jpg" },
    },
    "Data Storage and Backup": {
      "Low Performance/Low Cost": { id: "673deaca14accbd860945202", img: "4A.jpg" },
      "High Performance/High Cost": { id: "673deaca14accbd860945205", img: "4B.jpg" },
      "Medium Performance/Medium Cost": { id: "673deaca14accbd860945208", img: "4C.jpg" },
      "High Performance/Low Cost": { id: "673deacb14accbd86094520b", img: "4D.jpg" },
    },
    "High Security Application": {
      "Low Performance/Low Cost": { id: "67418695f730fcadc4870eec", img: "5A.jpg" },
      "High Performance/High Cost": { id: "67418695f730fcadc4870eef", img: "5B.jpg" },
      "Medium Performance/Medium Cost": { id: "67418695f730fcadc4870ef2", img: "5C.jpg" },
      "High Performance/Low Cost": { id: "67418696f730fcadc4870ef5", img: "5D.jpg" },
    },
  };


  const selectedImage =
    selectedScenario && selectedCost
      ? new URL(
        `../assets/scenarioPictures/${scenarioMapping[selectedScenario]?.[selectedCost]?.img}`,
        import.meta.url
      ).href
      : null;

  useEffect(() => {
    if (selectedScenario && selectedCost) {
      setIsAlertVisible(false); // Automatically hide alert
    }
  }, [selectedScenario, selectedCost]); // Run whenever these states change


  useEffect(() => {
    fetchScenarios();
  }, [fetchScenarios]);

  const handleSubmit = () => {
    if (selectedScenario && selectedCost) {
      const scenarioId = scenarioMapping[selectedScenario]?.[selectedCost]?.id;

      if (!scenarioId) {
        setAlertMessage("Invalid scenario or cost selection")
        setIsAlertVisible(true);
        //alert("Invalid scenario or cost selection")
        return
      }

      if (scenarioId) {
        const url = `http://localhost:8081/api/terraform/costPerformance/${scenarioId}`;
        console.log("Selected Scenario URL:", url);
      }

      if (scenarioId) {
        // Backend'den veri çekmek için Terraform Store kullanılır
        fetchTerraformFiles("scenario", scenarioId)
          .then(() => {
            navigate("/execute", { state: { scenarioId } }); // Direkt navigasyon
          })
          .catch((error) => {
            /* console.error("Error fetching Terraform files:", error);
            alert("An error occurred while fetching the scenario data."); */
            console.error("Error fetching Terraform files:", error);
            setAlertMessage("An error occurred while fetching the scenario data.");
            setIsAlertVisible(true);
          });
      } else {
        alert("Invalid scenario or cost selection.");
      }
    } else {
      setAlertMessage("Please select both Scenario and Cost options.");
      setIsAlertVisible(true);
      //alert("Please select both Scenario and Cost options."); 
      /**@todo: alert needed**/
    }
  };


  return (
    <>
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
              className="text-sm/6 font-semibold text-gray-900">
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

      <div className="flex flex-col mt-8 -mb-10 items-center justify-center bg-white font-title space-y-8">
        {/* Heading */}
        <p className="text-center text-2xl font-bold text-red-600">Guiding Your Path</p>

        {/* Path */}
        <ol className="flex items-center justify-center w-full space-y-4 sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
          <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0  dark:border-gray-400">
              1
            </span>
            <span>
              <h3 className="font-medium leading-tight">Info</h3>
              <p className="text-sm">Click Get Started!</p>
            </span>
          </li>
          <MdOutlineArrowForwardIos className="place-items-center text-gray-600" />
          <li className="flex items-center text-red-600 dark:text-red-500 space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-8 h-8 border border-red-600 rounded-full shrink-0 dark:border-red-500">
              2
            </span>
            <span>
              <h3 className="font-semibold leading-tight">Scenario Selection</h3>
              <p className="text-sm">Find a scenario fits your needs!</p>
            </span>
          </li>
          <MdOutlineArrowForwardIos
            className={`place-items-center text-red-600 ${activeStep === 1 ? 'animate-bounce' : ''
              }`} />
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


      {/*main section*/}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 font-title">

        {/* Scenario Selection */}
        <div className="w-full max-w-sm min-w-[200px]">
          <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Huawei Cloud Service Options</h1>
          <div className="relative">
            <select
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
            >
              <option value="" disabled>Select a Scenario</option>
              <option value="Simple Website Hosting">Simple Website Hosting</option>
              <option value="Database Hosting">Database Hosting</option>
              <option value="High Traffic Web Application">High Traffic Web Application</option>
              <option value="Data Storage and Backup"> Data Storage and Backup</option>
              <option value="High Security Application"> High Security Application</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2 right-2.5 text-slate-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </div>
        </div>
        {/* CostPerformance Selection */}
        <div className="w-full max-w-sm min-w-[200px] mt-4">
          <div className="relative">
            <select
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              value={selectedCost}
              onChange={(e) => setSelectedCost(e.target.value)}
            >
              <option value="" disabled>Select a Cost Option</option>
              <option value="Low Performance/Low Cost">Low Performance/Low Cost</option>
              <option value="High Performance/High Cost">High Performance/High Cost</option>
              <option value="Medium Performance/Medium Cost">Medium Performance/Medium Cost</option>
              <option value="High Performance/Low Cost">High Performance/Low Cost</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>

            {/* AI Link and Submit Button */}
            <div className="mt-6 flex flex-col items-end gap-y-4">
              <button
                onClick={() => navigate('/generate')} // Direct navigation to the /generate page

                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-300 to-white text-sm font-semibold hover:underline transition-all duration-500 ease-in-out focus-visible:outline-none animate-gradient"
              >
                Ask AI
              </button>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-red-600 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Continue
              </button>
            </div>

            {/* Alert once scenario not selected */}
            {isAlertVisible && alertMessage && ( // Render the alert only if it is visible
              <div id="alert-2" className="flex items-center p-4 mt-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="ms-3 text-sm font-medium">
                  {alertMessage}
                </div>
                <button
                  type="button"
                  className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                  aria-label="Close"
                  onClick={handleClose}
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                </button>
              </div>


            )}


            {/* Image Display */}
            <div className="mt-8 text-center">
              {selectedImage ? (
                <>
                  <h1 className="w-full text-lg font-semibold text-gray-800">
                    The scenario’s architecture is as follows,
                  </h1>
                  <img
                    src={selectedImage}
                    alt="Selected Scenario"
                    className="mt-4 max-w-full h-auto border border-gray-300 rounded shadow"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </>
              ) : (
                <p className="text-gray-500">Please select a scenario and cost to see the related image.</p>
              )}
            </div>


          </div>
        </div>
      </main>

      {/*Footer*/}
      <footer className="bottom-0 left-0 w-full bg-white rounded-lg shadow dark:bg-gray-800 font-title">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 <a href="#" className="hover:underline">Big4™</a> All Rights Reserved.
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
          </ul>
        </div>
      </footer>

      {/*Footer*/}

    </>
  );
};

export default HuaweiScenario;