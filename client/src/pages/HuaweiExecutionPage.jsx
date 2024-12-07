'use client';

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
import { Input, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useExecutionScenarioStore } from "../stores/Execution"; // Zustand store
import { useLocation } from "react-router-dom"; // React Router for receiving passed state

import { Link } from 'react-router-dom';

import { MdOutlineArrowForwardIos } from "react-icons/md";

import { SiHuawei } from "react-icons/si";

import ProgressBar from "../components/ProgressBar"

const HuaweiExecutionPage = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const location = useLocation();
    const scenarioId = location.state?.scenarioId; // Retrieve scenarioId passed from MainPage

    const [accessKey, setAccessKey] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [executionResult, setExecutionResult] = useState(null); // Execution result

    const { executeScenario } = useExecutionScenarioStore(); // Zustand store method for execution

    const [isAlertVisible, setIsAlertVisible] = useState(true); // State for visibility
    

    const handleClose = () => {
        setIsAlertVisible(false); // Hide the alert
    };

    useEffect(() => {
        if (!scenarioId) {
            //alert("Scenario ID is missing. Please go back and select a valid scenario.");
        }
    }, [scenarioId]);

    const handleApply = async () => {
        if (!scenarioId || !accessKey || !secretKey) {
            alert("Access Key, and Secret Key are required.");
            return;
        }

        setIsLoading(true);

        try {
            const result = await executeScenario(scenarioId, accessKey, secretKey);

            if (result.success) {
                setExecutionResult({
                    success: true,
                    message: result.message,
                    terraformOutput: result.terraformOutput,
                });
                alert("Scenario executed successfully!");
            } else {
                setExecutionResult({
                    success: false,
                    message: result.message,
                });

                if (result.message.includes("Authentication failed")) {
                    //alert("Authentication failed. Please check your Access Key and Secret Key.");
                } else {
                    alert(`Failed to execute scenario: ${result.message}`);
                }
            }
        } catch (error) {
            console.error("Error executing scenario:", error.message);
            setExecutionResult({
                success: false,
                message: "An unexpected error occurred.",
            });

            if (error.response && error.response.status === 401) {
                //alert("Authentication failed. Please check your Access Key and Secret Key.");
            } else {
                alert("An unexpected error occurred. Please try again.");
            }

        } finally {
            setIsLoading(false);
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
                    <li className="flex items-center text-red-600 dark:text-red-500 space-x-2.5 rtl:space-x-reverse">
                        <span className="flex items-center justify-center w-8 h-8 border border-red-600 rounded-full shrink-0 dark:border-red-500 ">
                            3
                        </span>
                        <span>
                            <h3 className="font-semibold leading-tight">Confirmation</h3>
                            <p className="text-sm">Your credentials.</p>
                        </span>
                    </li>
                </ol>
            </div>

            {/*main section*/}
            <main className={`grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 font-title ${isLoading ? "opacity-50" : "opacity-100"}`
            }>
                <div className="text-center">
                    {/* Header */}
                    <h1 className="text-lg font-bold text-gray-800 mb-4">
                        Please include your credentials
                    </h1>

                    <div className="w-96 mb-6">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-medium text-left"
                        >
                            Access Key
                        </Typography>
                        <Input
                            value={accessKey}
                            onChange={(e) => setAccessKey(e.target.value)}
                            maxLength={50}
                            placeholder="e.g., BPTVZE0T08YL6DJUILAW"
                            /* pattern="^\+\d{1,3}\s\d{1,4}-\d{1,4}-\d{4}$" */
                            className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-0 placeholder:opacity-100 focus:!border-t-gray-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none rounded-md"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />

                    </div>

                    <div className="w-96">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-medium text-left"
                        >
                            Secret Key
                        </Typography>
                        <Input
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                            maxLength={50}
                            placeholder="e.g., 98NInBkbfSFhAjukASlcCha0ip5y0OUSasLl"
                            /* pattern="^\+\d{1,3}\s\d{1,4}-\d{1,4}-\d{4}$" */
                            className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none rounded-md"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />

                        {isAlertVisible && ( // Render the alert only if it is visible
                            <div
                                id="alert-1"
                                className="flex mt-7 mb-3 items-center p-4  text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                                role="alert"
                            >
                                <svg
                                    className="flex-shrink-0 w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div className="ms-3 text-sm font-medium">
                                    Once applied, the scenario will show up on your account.
                                </div>
                                <button
                                    type="button"
                                    className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                                    aria-label="Close"
                                    onClick={handleClose} // Attach the click handler
                                >
                                    <span className="sr-only">Close</span>
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                </button>
                            </div>


                        )}

                        <div className="mt-6 mb-6 flex w-96 justify-end">
                            <button
                                onClick={handleApply}
                                className="flex items-center rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-green-600 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <div role="status" className="flex items-center mr-2">
                                        <svg
                                            aria-hidden="true"
                                            className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )}
                                {isLoading ? "Executing..." : "Apply"}
                            </button>
                        </div>

                        {isLoading && (
                            <div className="mt-6 mb-6">
                                <ProgressBar radius = "2px" />
                            </div>
                        )}




                        {/* Execution Result 
                        {executionResult && (
                            <div
                                className={`mt-6 w-96 mx-auto p-4 ${executionResult.success ? "bg-green-100" : "bg-red-100"
                                    } text-gray-800`}
                            >
                                <p className="font-bold">
                                    {executionResult.success ? "Success!" : "Error:"}
                                </p>
                                <p>{executionResult.message}</p>
                                {executionResult.terraformOutput && (
                                    <pre className="mt-2 p-2 bg-gray-200 text-sm rounded">
                                        {JSON.stringify(executionResult.terraformOutput, null, 2)}
                                    </pre>
                                )}
                            </div>
                        )}*/}




                        {/* <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Deploying your 'seçilen senaryo ismi':</h2>
                        <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
                            <li className="flex items-center">
                                <svg className="w-4 h-4 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                Initializing the application
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                Checking your Access Key and Secret Key
                            </li>
                            <li className="flex items-center">
                                <div role="status">
                                    <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                Deploying to your account
                            </li>
                        </ul> */}


                        {
                            executionResult && (
                                executionResult.success ? (
                                    <div
                                        id="alert-additional-content-3"
                                        className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                                        role="alert"
                                    >
                                        <div className="flex items-center">
                                            <svg
                                                className="flex-shrink-0 w-4 h-4 me-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 1 1 0 2Z" />
                                            </svg>
                                            <span className="sr-only">Info</span>
                                            <h3 className="text-lg font-medium">Success!</h3>
                                        </div>
                                        <div className="mt-2 mb-4 text-sm text-left">
                                            {executionResult.message}
                                        </div>
                                        <div className="flex">
                                            <button
                                                type="button"
                                                className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
                                                onClick={() => setExecutionResult(null)} // Reset the result on click
                                            >
                                                OK
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        id="alert-additional-content-2"
                                        className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                                        role="alert"
                                    >
                                        <div className="flex items-center">
                                            <svg
                                                className="flex-shrink-0 w-4 h-4 me-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 1 1 0 2Z" />
                                            </svg>
                                            <span className="sr-only">Info</span>
                                            <h3 className="text-lg font-medium">Error</h3>
                                        </div>
                                        <div className="mt-2 mb-4 text-sm text-left">
                                            {executionResult.message}
                                        </div>
                                        <div className="flex">
                                            <button
                                                type="button"
                                                className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
                                                onClick={() => setExecutionResult(null)} // Reset the result on click
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )
                            )
                        }

                        {executionResult && executionResult.success && (
                            <button
                                type="button"
                                onClick={() => window.open("https://www.huaweicloud.com/intl/en-us/", "_blank")}
                                className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:text-white me-2 mb-2"
                            >
                                <SiHuawei className="w-6 h-5 text-red-600 me-2 -ms-1" />
                                Connect to Huawei Cloud
                            </button>
                        )}
                    </div>
                </div>
            </main >

            {/*Footer*/}
            < footer className="fixed bottom-0 left-0 w-full bg-white rounded-lg shadow dark:bg-gray-800 font-title" >
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
            </footer >

            {/*Footer*/}
        </>
    );
};

export default HuaweiExecutionPage;