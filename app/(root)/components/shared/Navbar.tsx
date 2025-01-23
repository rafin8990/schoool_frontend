'use client';

import { navigation } from '@/data/navigation';
import { useGetList } from '@/hooks/APIHooks';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HeaderData {
  _id: string;
  logo: string;
  school_name: string;
  address: string;
  eiin: number;
  school_code: number;
  email: string;
  mobile_no: string;
  website: string;
}

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const { data: headerData, isLoading } = useGetList<HeaderData>('/info', 'info');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 180); // Adjust this value based on the header height
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <header className="py-6 pb-8 bg-[#20526B] text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="">
              <Image
                src="/logo/govtimg.png"
                alt="govt logo"
                width={100}
                height={100}
                className="h-28 w-auto"
              />
            </div>
            <div className="h-full flex flex-col justify-between items-start grow">
              <div className="text-3xl font-semibold pb-2">
                {isLoading ? (
                  <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-60 "></div>
                ) : (
                  <h1>{headerData && headerData[0]?.school_name}</h1>
                )}
              </div>
              <div className="">
                <div className="text-md">
                  {isLoading ? (
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 "></div>
                  ) : (
                    <p>{headerData && headerData[0]?.address}</p>
                  )}
                </div>
                <p className="text-md">
                  EIIN: {headerData && headerData[0]?.eiin}, Institute Code:{' '}
                  {headerData && headerData[0]?.school_code}
                </p>
              </div>
            </div>
          </div>
          <div className="">
            {isLoading ? (
              <div
                role="status"
                className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center h-28 w-28"
              >
                <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              </div>
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${headerData ? headerData[0]?.logo : 'logo/logo.jpg'}`}
                alt="school logo"
                width={100}
                height={100}
                className="h-28 w-auto"
              />
            )}
          </div>
        </div>
      </header>

      <nav
        className={`bg-white border-b shadow-lg ${
          isSticky ? 'fixed top-0 left-0 right-0 z-50 transition-transform duration-300' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {navigation.mainNav.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.title)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  {item.items ? (
                    <button
                      className={`inline-flex items-center px-3 py-5 text-sm font-medium transition-colors hover:bg-[#20526B] hover:text-white
                      ${activeMenu === item.title ? 'bg-[#20526B] text-white' : 'text-gray-700'}
                    `}
                      aria-expanded={activeMenu === item.title}
                      aria-haspopup="true"
                    >
                      {item.title}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className={`inline-flex items-center px-3 py-5 text-sm font-medium transition-colors hover:bg-[#20526B] hover:text-white
                      ${activeMenu === item.title ? 'bg-[#20526B] text-white' : 'text-gray-700'}
                    `}
                    >
                      {item.title}
                    </Link>
                  )}
                  {item.items && activeMenu === item.title && (
                    <div
                      className="absolute left-0 mt-0 w-60 bg-white border shadow-lg z-50"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby={`${item.title}-menu`}
                    >
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#20526B] hover:text-white"
                          role="menuitem"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
              >
                LOGIN
              </Link>
              <Link
                href="/apply"
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
              >
                ONLINE APPLICATION
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
