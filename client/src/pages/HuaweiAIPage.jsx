'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogPanel,
} from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

import huaweiLogo from "../assets/aiLogo.jpg";
import { FiGithub } from "react-icons/fi";
import { Collapse, Button, Card, Typography, CardBody } from "@material-tailwind/react";

import { Link } from 'react-router-dom';
import { MdOutlineArrowForwardIos } from "react-icons/md";

import { useNavigate } from 'react-router-dom';
import AIProgressBar from '../components/AIProgressBar';

const HuaweiAIPage = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [prompt, setPrompt] = useState(""); // Kullanıcının girdiği prompt
    const [response, setResponse] = useState(null); // API yanıtı
    const [loading, setLoading] = useState(false); // Yükleme durumu
    const [error, setError] = useState(null); // Hata mesajı

    const [activeStep, setActiveStep] = useState(1);

    const navigate = useNavigate();


    const fetchGenerateResponse = async (prompt) => {
        try {
            setLoading(true); // Yükleme başlar
            setError(null); // Hataları sıfırla

            const res = await fetch("http://localhost:8081/api/ai/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            const content = data?.choices?.[0]?.message?.content; /* setResponse(data.data); */ // Yanıtı state'e kaydet

            if (!content) {
                throw new Error("AI response content is missing");
            }
            setResponse(content);
        } catch (err) {
            setError(err.message); // Hata mesajını state'e kaydet
        } finally {
            setLoading(false); // Yükleme durumu sona erer
        }
    };

    // Generate button click handler
    const handleGenerate = () => {
        fetchGenerateResponse(prompt);
    };

    const [openIndex, setOpenIndex] = useState(null);

    // Açma ve kapama işlevi
    const toggleOpen = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleApply = () => {
        navigate("/execute");
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

            <div className="flex flex-col mt-8 items-center justify-center bg-white font-title space-y-8">
                {/* Heading */}
                <p className="text-center text-2xl font-bold text-blue-600">Guiding Your Path</p>

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
                    <li className="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse">
                        <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                            2
                        </span>
                        <span>
                            <h3 className="font-semibold leading-tight">Generate Scenario</h3>
                            <p className="text-sm">Explore a scenario fits your needs!</p>
                        </span>
                    </li>
                    <MdOutlineArrowForwardIos
                        className={`place-items-center text-blue-600 ${activeStep === 1 ? 'animate-bounce' : ''
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
                <div className="text-center">

                    <h3 className="-mt-10 text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-gray-300 to-gray-700 bg-clip-text text-transparent sm:text-7xl leading-[1.2] pt-2 pb-2 animate-gradient-flow bg-[length:200%]">
                        It is your turn with AI!
                    </h3>
                    <div className="mt-10 w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <label htmlFor="comment" className="sr-only"></label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                rows="4"
                                className="w-full text-sm text-gray-900 bg-white border-none resize-none focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                                placeholder="I want two servers within one subnet which has TCP, HTTP and its protocols"
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={handleGenerate}
                            disabled={loading}
                            className="flex py-2.5 px-6 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading && (
                                <div role="status" className="items-center mr-2">
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
                                </div>
                            )}
                            {loading ? "Generating..." : "Generate"}
                        </button>
                    </div>

                    {loading && (
                        <div className="flex justify-center items-center mt-6 mb-6">
                            <div className="w-full max-w-md">
                                <AIProgressBar color="#2563eb" />
                            </div>
                        </div>
                    )}

                    {/* Response Section */}
                    {response && (
                        <div className="mt-4 bg-gray-100 p-4 rounded max-w-4xl mx-auto shadow-md">
                            <h2 className="text-lg font-bold mb-2">Generated Terraform Code:</h2>
                            <pre className="bg-gray-200 p-2 rounded text-sm overflow-auto max-h-[600px]">
                                {response}
                            </pre>
                        </div>
                    )}

                    {/* Error Section */}
                    {error && (
                        <div className="mt-4 bg-red-100 text-red-700 p-4 rounded">
                            <strong>Error:</strong> {error}
                        </div>
                    )}


                    {response && (
                        <div className="flex flex-col items-end mt-4">
                            <button
                                type="button"
                                onClick={handleApply}
                                className="flex items-center rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-green-600 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"

                            >
                                Apply
                            </button>
                        </div>
                    )}

                    <p className="mt-9 mb-5 font-semibold font-medium text-gray-600">Curious what is generated so far?</p>
                    <div className="space-y-6">
                        <Button
                            type="button"
                            className="w-full py-5 px-6 text-sm font-medium text-gray-600 bg-white border-none resize-none rounded-lg focus:ring-1 focus:ring-gray-200 dark:focus:ring-blue-300 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => toggleOpen(1)}>
                            Hosting a web page consisting just an HTML and CSS file, which is basic.
                        </Button>
                        <Collapse open={openIndex === 1}>
                            <Card className="my-4 mx-auto max-w-4xl h-[300px] overflow-auto shadow-lg">
                                <CardBody>
                                    <Typography className="text-sm leading-relaxed">
                                        To host a simple web page using an HTML and CSS file, you will need to set up a compute instance with a security group that allows HTTP access. Below is an example Terraform configuration to achieve this setup:
                                    </Typography>
                                    <pre className="mt-4 p-4 bg-white-200 text-sm rounded overflow-auto max-h-[200px]">
                                        <code>
                                            {`terraform {
  required_providers {
    huaweicloud = {
      source  = "huaweicloud/huaweicloud"
      version = ">=1.20.0"
    }
  }
}

provider "huaweicloud" {
  auth_url   = "https://iam.ap-southeast-1.myhuaweicloud.com/v3"
  region     = "ap-southeast-1"
  access_key = var.access_key
  secret_key = var.secret_key
}

resource "huaweicloud_vpc" "vpc_1" {
  name = "example_vpc"
  cidr = "10.0.0.0/16"
}

resource "huaweicloud_vpc_subnet" "subnet1" {
  name       = "example-subnet"
  cidr       = "10.0.0.0/24"
  gateway_ip = "10.0.0.1"
  vpc_id     = huaweicloud_vpc.vpc_1.id
}

resource "huaweicloud_networking_secgroup" "web_sg" {
  name = "web-sg"
}

resource "huaweicloud_networking_secgroup_rule" "allow_http" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 80
  port_range_max    = 80
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = huaweicloud_networking_secgroup.web_sg.id
}

resource "huaweicloud_compute_instance" "mycompute" {
  name               = "example-instance"
  image_id           = data.huaweicloud_images_image.myimage.id
  flavor_id          = data.huaweicloud_compute_flavors.myflavor.ids[0]
  availability_zone  = data.huaweicloud_availability_zones.myaz.names[0]
  security_group_ids = [huaweicloud_networking_secgroup.web_sg.id]

  network {
    uuid = huaweicloud_vpc_subnet.subnet1.id
  }
}`}
                                        </code>
                                    </pre>
                                </CardBody>
                            </Card>
                        </Collapse>

                        <Button
                            type="button"
                            className="w-full py-5 px-6 text-sm font-medium text-gray-600 bg-white border-none resize-none rounded-lg focus:ring-1 focus:ring-gray-200 dark:focus:ring-blue-300 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => toggleOpen(2)}
                        >
                            Hosting a database server for storing structured data, which requires additional resources.
                        </Button>
                        <Collapse open={openIndex === 2}>
                            <Card className="my-4 mx-auto max-w-4xl h-[300px] overflow-auto shadow-lg">
                                <CardBody>
                                    <Typography className="text-sm leading-relaxed">
                                        To host a database server, you'll need a more powerful compute instance with adequate resources and security configurations. Below is an example Terraform configuration for setting up a database server:
                                    </Typography>
                                    <pre className="mt-4 p-4 bg-gray-200 text-sm rounded overflow-auto max-h-[200px]">
                                        <code>
                                            {`terraform {
  required_providers {
    huaweicloud = {
      source  = "huaweicloud/huaweicloud"
      version = ">=1.20.0"
    }
  }
}

provider "huaweicloud" {
  auth_url   = "https://iam.ap-southeast-1.myhuaweicloud.com/v3"
  region     = "ap-southeast-1"
  access_key = var.access_key
  secret_key = var.secret_key
}

resource "huaweicloud_vpc" "vpc_1" {
  name = "database_vpc"
  cidr = "10.0.0.0/16"
}

resource "huaweicloud_vpc_subnet" "subnet1" {
  name       = "database-subnet"
  cidr       = "10.0.1.0/24"
  gateway_ip = "10.0.1.1"
  vpc_id     = huaweicloud_vpc.vpc_1.id
}

resource "huaweicloud_networking_secgroup" "db_sg" {
  name = "db-sg"
}

resource "huaweicloud_networking_secgroup_rule" "allow_db" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 3306
  port_range_max    = 3306
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = huaweicloud_networking_secgroup.db_sg.id
}

resource "huaweicloud_compute_instance" "db_instance" {
  name               = "database-instance"
  image_id           = data.huaweicloud_images_image.myimage.id
  flavor_id          = data.huaweicloud_compute_flavors.myflavor.ids[1]
  availability_zone  = data.huaweicloud_availability_zones.myaz.names[0]
  security_group_ids = [huaweicloud_networking_secgroup.db_sg.id]

  network {
    uuid = huaweicloud_vpc_subnet.subnet1.id
  }
}`}
                                        </code>
                                    </pre>
                                </CardBody>
                            </Card>
                        </Collapse>

                        <Button
                            type="button"
                            className="w-full py-5 px-6 text-sm font-medium text-gray-600 bg-white border-none resize-none rounded-lg focus:ring-1 focus:ring-gray-200 dark:focus:ring-blue-300 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => toggleOpen(3)}
                        >
                            Hosting a high-traffic web application with a load balancer and auto-scaling.
                        </Button>
                        <Collapse open={openIndex === 3}>
                            <Card className="my-4 mx-auto max-w-4xl h-[300px] overflow-auto shadow-lg">
                                <CardBody>
                                    <Typography className="text-sm leading-relaxed">
                                        For hosting a high-traffic web application, you'll need a load balancer and auto-scaling configurations to handle traffic spikes effectively. Below is an example Terraform configuration:
                                    </Typography>
                                    <pre className="mt-4 p-4 bg-gray-200 text-sm rounded overflow-auto max-h-[200px]">
                                        <code>
                                            {`terraform {
  required_providers {
    huaweicloud = {
      source  = "huaweicloud/huaweicloud"
      version = ">=1.20.0"
    }
  }
}

provider "huaweicloud" {
  auth_url   = "https://iam.ap-southeast-1.myhuaweicloud.com/v3"
  region     = "ap-southeast-1"
  access_key = var.access_key
  secret_key = var.secret_key
}

resource "huaweicloud_lb_loadbalancer" "load_balancer" {
  name          = "web-load-balancer"
  vip_subnet_id = huaweicloud_vpc_subnet.subnet1.id
}

resource "huaweicloud_lb_listener" "http_listener" {
  name            = "http-listener"
  protocol        = "HTTP"
  protocol_port   = 80
  loadbalancer_id = huaweicloud_lb_loadbalancer.load_balancer.id
}

resource "huaweicloud_auto_scaling_group" "web_as_group" {
  name                  = "web-scaling-group"
  min_instance_number   = 1
  max_instance_number   = 5
  vpc_id                = huaweicloud_vpc.vpc_1.id
  network_id            = huaweicloud_vpc_subnet.subnet1.id
  security_group        = huaweicloud_networking_secgroup.web_sg.id
}

resource "huaweicloud_auto_scaling_policy" "scale_up" {
  scaling_group_id = huaweicloud_auto_scaling_group.web_as_group.id
  scaling_type     = "ALARM"
  adjustment_type  = "INCREASE"
  adjustment_value = 1
}`}
                                        </code>
                                    </pre>
                                </CardBody>
                            </Card>
                        </Collapse>
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

export default HuaweiAIPage;
