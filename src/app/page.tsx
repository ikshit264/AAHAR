'use client'

import { useState, useMemo } from 'react'
import { Header, FilterOptions } from '../components/Header'
import { MenuSection } from '../components/MenuSection'
import { Footer } from '../components/Footer'
import { menuData, calculateMaxPrice, MenuData, parsePrice } from '@/data/Menu'


export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')


  const [filters, setFilters] = useState<FilterOptions>({ priceRange: [0, calculateMaxPrice(menuData)], categories: [] })

  const filteredMenu = useMemo(() => {
    return Object.entries(menuData).reduce((acc, [section, sectionData]) => {
      const filteredItems = sectionData.items.filter(item => {
        const matchesSearch =
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase());
  
        const price = parsePrice(item.price);
        const isPriceValid = price !== null;
  
        const matchesPrice = isPriceValid && price! >= filters.priceRange[0] && price! <= filters.priceRange[1];
  
        const matchesCategories = filters.categories.length === 0 || filters.categories.every(category => {
          if (category === 'Vegetarian') return item.isVegetarian;
          if (category === 'Gluten-Free') return item.isGlutenFree;
          if (category === 'Spicy') return item.isSpicy;
          return false;
        });
  
        return matchesSearch && matchesPrice && matchesCategories;
      });
  
      if (filteredItems.length > 0) {
        acc[section] = { ...sectionData, items: filteredItems }; // Preserve `vectorImageUrl` while updating `items`
      }
      return acc;
    }, {} as MenuData);
  }, [searchTerm, filters]);
  


  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }
  // f4f1e5
  return (
    <div className="min-h-screen flex flex-col bg-[#e1dfd5] text-gray-800 font-serif">
      <Header onSearch={handleSearch} onFilter={handleFilter} />
      <main className="flex-grow container mx-auto px-4 pt-4">
        {Object.entries(filteredMenu).map(([section, items]) => (
          <MenuSection key={section} title={section} items={items.items} />
        ))}
        {Object.keys(filteredMenu).length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No menu items match your search or filters.
          </p>
        )}
      </main>
      <Footer />
    </div>
  )
}

