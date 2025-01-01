'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { menuData, calculateMaxPrice } from '@/data/Menu'
import Image from 'next/image'

const categories = ['Vegetarian', 'Gluten-Free', 'Spicy']

interface HeaderProps {
  onSearch: (term: string) => void
  onFilter: (filters: FilterOptions) => void
}

export interface FilterOptions {
  priceRange: [number, number]
  categories: string[]
}

export interface Sections {
  title: string
  image?: string
}

export function Header({ onSearch, onFilter }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, calculateMaxPrice(menuData)])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [sections, setSections] = useState<Sections[]>([])
  const navRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (menuData) {
      const formattedSections = Object.entries(menuData).map(([title, { vectorImageUrl }]) => ({
        title,
        image: vectorImageUrl,
      }));
      setSections(formattedSections);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sectionElements = sections.map(section => document.getElementById(section.title));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].title);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleFilter = () => {
    onFilter({ priceRange, categories: selectedCategories });
    setIsFilterOpen(false);
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    const header = document.getElementById('header');
    if (element) {
      const headerHeight = header?.offsetHeight || 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setActiveSection(section);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm shadow-sm" id="header">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-between py-4 border-b border-gray-700 bg-[#f4f1e5] shadow-lg rounded-lg">
            <h1
              className="text-3xl font-serif font-extrabold px-3 text-gray-900 uppercase tracking-wide leading-none"
              style={{
                letterSpacing: '0.05em',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              }}
            >
              AAHAR
            </h1>
            <div className="flex space-x-2 px-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-2 rounded-full hover:bg-[#eae6d9] bg-[#f4f1e5] border border-gray-700 transition-colors"
                aria-label="Open filter menu"
              >
                <Filter className="h-5 w-5 text-gray-700" />
              </button>
              <button
                onClick={() => setIsSearchActive(!isSearchActive)}
                className="p-2 rounded-full hover:bg-[#eae6d9] bg-[#f4f1e5] border border-gray-700 transition-colors"
                aria-label="Open search menu"
              >
                <Search className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
          <nav
            className="py-3 border-t border-b border-gray-700 bg-[#f4f1e5] relative shadow-sm rounded-lg"
            ref={navRef}
          >
            <div className="flex space-x-4 overflow-x-auto px-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {sections.map(({ title, image }) => (
                <button
                  key={title}
                  onClick={() => scrollToSection(title)}
                  className={`px-4 py-2 whitespace-nowrap rounded-md flex justify-center items-center font-serif font-medium uppercase tracking-wide ${activeSection === title
                    ? 'bg-gray-800 text-white shadow-inner'
                    : 'bg-transparent text-gray-800 hover:bg-gray-200 hover:text-gray-900'
                    } transition-all`}
                >
                  {image && (
                    <div
                      className={`w-6 h-6 inline-block mr-2 rounded object-cover overflow-hidden ${activeSection === title ? 'bg-white' : ''
                        }`}
                      style={{
                        filter: activeSection === title ? 'brightness(1.2)' : 'brightness(0.8)',
                      }}
                    >
                      <Image
                        src={image}
                        alt={title}
                        width={25}
                        height={25}
                        className="w-full h-full"
                      />
                    </div>
                  )}

                  {title}
                </button>
              ))}
            </div>
          </nav>
        </div>
        {isSearchActive && (
          <div className="relative py-4">
            <input
              type="search"
              placeholder="Search menu items..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() => {
                  setSearchTerm('');
                  onSearch('');
                }}
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>
      {isFilterOpen && (
        <div className="fixed inset-0 top-full bg-gray-800 h-screen bg-opacity-60 flex items-start justify-center z-50">
          <div className="bg-[#f4f1e5] p-6 rounded-lg w-full max-w-md text-gray-900 shadow-lg border border-gray-700">
            <h2 className="text-xl font-serif font-bold mb-4 text-gray-900">Filter Menu</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-serif text-gray-800">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <input
                  type="range"
                  min={0}
                  max={calculateMaxPrice(menuData)}
                  step={1}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring focus:ring-gray-600"
                />
              </div>
              <div>
                <p className="mb-2 font-serif text-gray-800">Categories</p>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="form-checkbox h-5 w-5 text-gray-800 border-gray-700 focus:ring focus:ring-gray-600"
                      />
                      <span className="text-gray-900 font-serif">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-4 py-2 border border-gray-700 rounded-md bg-[#eae6d9] hover:bg-[#ddd7c8] text-gray-900 font-serif transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFilter}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 font-serif transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
