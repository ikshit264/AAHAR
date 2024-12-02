import { MenuItem } from './MenuItem'

interface MenuSectionProps {
  title: string
  items: {
    name: string
    description?: string
    price: string
    isVegetarian?: boolean
  }[]
}

export function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <section id={title} className="py-4">
      <h2 className="text-2xl font-bold mb-4 text-primary">{title}</h2>
      <div className="space-y-0">
        {items.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </section>
  )
}

