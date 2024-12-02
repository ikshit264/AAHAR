'use client'

import { useState, useMemo } from 'react'
import { Header, FilterOptions } from '../components/Header'
import { MenuSection } from '../components/MenuSection'
import { Footer } from '../components/Footer'

interface MenuItem {
  name: string
  description?: string
  price: string
  isVegetarian?: boolean
  isGlutenFree?: boolean
  isSpicy?: boolean
}

interface MenuSection {
  items: MenuItem[]
  vectorImageUrl?: string // Optional property for section image
}

interface MenuData {
  [key: string]: MenuSection
}

export const menuData: MenuData = {
  "Momo's": {
    items: [
      { name: "Steam Momo's", description: "Delicately steamed dumplings filled with fresh vegetables or chicken.", price: "60", isVegetarian: true, isGlutenFree: false },
      { name: "Fry Momo's", description: "Crispy fried dumplings with flavorful fillings.", price: "70", isVegetarian: true, isGlutenFree: false },
      { name: "Kurkura Momo's", description: "Crunchy momo's coated with breadcrumbs, served with spicy chutney.", price: "100", isVegetarian: true, isGlutenFree: false },
      { name: "Chilli Momo's", description: "Spicy stir-fried momo's in a tangy chilli sauce.", price: "100", isVegetarian: true, isGlutenFree: false, isSpicy: true },
      { name: "Paneer Fry Momo's", description: "Fried dumplings filled with soft paneer and spices.", price: "90", isVegetarian: true, isGlutenFree: false },
      { name: "Tandoori Momo's", description: "Chargrilled momo's infused with smoky tandoori flavors.", price: "110", isVegetarian: true, isGlutenFree: false },
      { name: "Malai Momo's", description: "Creamy and rich dumplings with a melt-in-your-mouth texture.", price: "130", isVegetarian: true, isGlutenFree: false }
    ],
    vectorImageUrl: "Momos.svg"
  },
  "Tea & Coffee": {
    items: [
      { name: "Tea", description: "Classic Indian chai made with fresh tea leaves and spices.", price: "15" },
      { name: "Masala Tea", description: "Aromatic spiced tea with cardamom, ginger, and cinnamon.", price: "20" },
      { name: "Coffee", description: "Rich and flavorful brewed coffee.", price: "30" },
      { name: "Cold Drink", description: "Refreshing carbonated beverage (price based on MRP).", price: "MRP" },
      { name: "Water", description: "Pure and clean bottled drinking water.", price: "MRP" }
    ],
    vectorImageUrl: "Chai.svg"
  },
  "Naan": {
    items: [
      { name: "Plain Naan", description: "Soft and fluffy traditional Indian bread.", price: "60", isVegetarian: true },
      { name: "Butter Naan", description: "Naan topped with melted butter for extra flavor.", price: "60", isVegetarian: true },
      { name: "Amritsari Naan", description: "Flavorful naan stuffed with spiced fillings, Amritsar style.", price: "60", isVegetarian: true },
      { name: "Tandoori Roti", description: "Whole wheat bread cooked in a clay tandoor.", price: "15", isVegetarian: true },
      { name: "Butter Tandoori Roti", description: "Tandoori roti brushed with fresh butter.", price: "20", isVegetarian: true }
    ],
    vectorImageUrl: "Naan.svg"
  },
  "Paneer": {
    items: [
      { name: "Chilli Paneer", description: "Spicy and tangy paneer stir-fried with bell peppers and onions.", price: "150", isVegetarian: true, isSpicy: true },
      { name: "Paneer Tikka", description: "Marinated paneer chunks grilled to perfection.", price: "150", isVegetarian: true },
      { name: "Chilli Mushroom", description: "Fiery mushrooms tossed in a savory chili sauce.", price: "130", isVegetarian: true },
      { name: "Mushroom Tikka", description: "Tandoori mushrooms marinated in aromatic spices.", price: "150", isVegetarian: true }
    ]
  },
  "Dosa": {
    items: [
      { name: "Plain Dosa", description: "Classic South Indian crispy rice crepe.", price: "60", isVegetarian: true },
      { name: "Butter Dosa", description: "Plain dosa generously spread with butter.", price: "60", isVegetarian: true },
      { name: "Masala Dosa", description: "Crispy dosa filled with spiced potato masala.", price: "80", isVegetarian: true },
      { name: "Onion Dosa", description: "Dosa topped with caramelized onions for extra flavor.", price: "90", isVegetarian: true },
      { name: "Paneer Dosa", description: "Dosa filled with flavorful paneer stuffing.", price: "130", isVegetarian: true },
      { name: "Masoor Dosa", description: "Healthy dosa made with protein-rich lentils.", price: "130", isVegetarian: true },
      { name: "Salad Roast Dosa", description: "Unique dosa stuffed with fresh salad and roasted veggies.", price: "150", isVegetarian: true },
      { name: "Aahaar Special Dosa", description: "Signature dosa with a blend of premium fillings.", price: "150", isVegetarian: true }
    ],
    vectorImageUrl: "Dosa.svg"
  },
  "Rice": {
    items: [
      { name: "Fried Rice Veg", description: "Fried rice tossed with fresh vegetables and soy sauce.", price: "70-40", isVegetarian: true },
      { name: "Fried Rice Paneer", description: "Flavorful fried rice mixed with paneer and spices.", price: "90-50", isVegetarian: true },
      { name: "Schezwan Fried Rice", description: "Spicy and tangy Schezwan-style fried rice.", price: "80-40", isVegetarian: true }
    ],
    vectorImageUrl: "Rice.svg"
  },
  "Snacks": {
    items: [
      { name: "Samosa Plate", description: "Golden-fried pastry pockets filled with spiced potatoes.", price: "40", isVegetarian: true },
      { name: "Aloo Tikki", description: "Crispy spiced potato patties, a popular street food.", price: "50", isVegetarian: true },
      { name: "French Fry", description: "Crispy golden fries, a perfect snack.", price: "70", isVegetarian: true }
    ],
    vectorImageUrl: "Snack.svg"
  },
  "Burger": {
    items: [
      { name: "Aloo Tikki Burger", description: "Classic burger with a crispy aloo tikki patty.", price: "40", isVegetarian: true },
      { name: "Cheese Burger", description: "Juicy burger with melted cheese.", price: "50", isVegetarian: true },
      { name: "Paneer Burger", description: "Burger with a soft paneer patty and fresh veggies.", price: "60", isVegetarian: true }
    ],
    vectorImageUrl: "Burger.svg"
  }
};


export const calculateMaxPrice = (menuData: MenuData): number => {
  let maxPrice = 0;

  for (const category in menuData) {
    menuData[category].items.forEach((item) => {
      const itemPrice = parsePrice(item.price);
      if (itemPrice && itemPrice > maxPrice) {
        maxPrice = itemPrice;
      }
    });
  }

  return maxPrice;
};

const parsePrice = (price: string): number | null => {
  const numericPrice = price.match(/(\d+(\.\d+)?)/);
  return numericPrice ? parseFloat(numericPrice[0]) : null;
};

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

