import { motion } from 'framer-motion'
import { GiLeafSwirl, GiWheat, GiFlame } from 'react-icons/gi'

interface MenuItemProps {
  name: string
  description?: string
  price: string
  isVegetarian?: boolean
  isGlutenFree?: boolean
  isSpicy?: boolean
}

export function MenuItem({ name, description, price, isVegetarian, isGlutenFree, isSpicy }: MenuItemProps) {
  return (
    <motion.div
      className="px-4 py-2 last:border-b-0 bg-[#f4f1e5] hover:bg-[#eae6d9] rounded shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-serif font-bold text-gray-900 flex items-center">
            {name}
            <div className="flex ml-2 space-x-1">
              {isVegetarian && <GiLeafSwirl className="h-4 w-4 text-green-800" />}
              {isGlutenFree && <GiWheat className="h-4 w-4 text-yellow-800" />}
              {isSpicy && <GiFlame className="h-4 w-4 text-red-800" />}
            </div>
          </h3>
          <p className="text-sm font-serif text-gray-800 mt-1">{description}</p>
        </div>
        <span className="text-lg font-serif font-semibold text-gray-800">₹{price}</span>
      </div>
    </motion.div>
  )
}
