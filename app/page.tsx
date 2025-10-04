'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Category {
  id: string
  name: string
  icon: string
}

const categories: Category[] = [
  { id: 'fuel', name: 'Fuel', icon: '/fuel.png' },
  { id: 'food', name: 'Food', icon: '/food.png' },
  { id: 'travel', name: 'Travel', icon: '/airplane.png' },
  { id: 'shopping', name: 'Shopping', icon: '/bag.png' },
]

function CategoryCard({ category, isSelected, onToggle }: {
  category: Category
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <div
      onClick={onToggle}
      className="relative cursor-pointer p-6 rounded-2xl"
      style={{
        background: isSelected
          ? '#0263BE33'
          : 'linear-gradient(180deg, #242C3B 0%, #3A3F49 100%)',
        backgroundClip: 'padding-box',
        border: '2px solid transparent',
        position: 'relative',
      }}
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          padding: '2px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(0, 0, 0, 0) 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: -1,
        }}
      />
      {/* Checkbox - half in, half out at top right */}
      <div className="absolute -top-3 -right-3 z-10">
        <Image
          src="/checkbox.svg"
          alt="Checkbox"
          width={24}
          height={24}
          style={{
            opacity: isSelected ? 1 : 0.3,
          }}
        />
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-4">
        <Image
          src={category.icon}
          alt={category.name}
          width={64}
          height={64}
        />
      </div>

      {/* Category Name */}
      <p className="text-white text-center text-label-md">
        {category.name}
      </p>
    </div>
  )
}

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div
      className="min-h-screen pt-16 px-4"
      style={{
        background: 'linear-gradient(180deg, #242C3B 0%, #3A3F49 100%)',
      }}
    >
      <h1 className="text-white text-center mb-8 text-heading-lg">
        Find your best Credit card
      </h1>

      <div className="flex justify-center">
        <Image
          src="/card.png"
          alt="Credit card"
          width={400}
          height={250}
          priority
        />
      </div>

      <p className="text-white text-center mt-6 mb-8 text-body-sm">
        Choose one or more categories where you spend the most
      </p>

      {/* Category Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isSelected={selectedCategories.includes(category.id)}
            onToggle={() => toggleCategory(category.id)}
          />
        ))}
      </div>

      {/* Add Spends Button */}
      <div className="max-w-4xl mx-auto px-4">
        <button
          className="w-full rounded-full text-white text-center text-button-lg"
          style={{
            background: 'rgba(30, 87, 82, 1)',
            border: '0.25px solid transparent',
            borderImage: 'linear-gradient(309.27deg, #FFFFFF 4.34%, rgba(255, 255, 255, 0.1) 51.19%), linear-gradient(110.91deg, #FFFFFF 3.75%, rgba(255, 255, 255, 0.1) 34.54%)',
            borderImageSlice: 1,
            boxShadow: '-4px -4px 5.8px 0px rgba(8, 33, 25, 0.15) inset, 3px 4px 5.8px 0px rgba(255, 255, 255, 0.15) inset',
            padding: '16px 20px',
          }}
        >
          Add Spends
        </button>

        <p
          className="text-center mt-4 text-caption-xs"
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Select at least one category to continue
        </p>
      </div>
    </div>
  )
}
