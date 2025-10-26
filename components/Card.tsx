import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

export default function Card({
  children,
  padding = 'md',
  hover = false,
  className = '',
  ...props
}: CardProps) {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const hoverClass = hover ? 'hover:shadow-xl cursor-pointer' : ''

  return (
    <div
      className={`
        card-base
        ${paddingClasses[padding]}
        ${hoverClass}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
