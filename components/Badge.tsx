import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'success' | 'error' | 'warning' | 'secondary'
  size?: 'sm' | 'md'
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
}: BadgeProps) {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800 border-primary-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    secondary: 'bg-secondary-100 text-secondary-800 border-secondary-200',
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  }

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        ${variantClasses[variant]}
        ${sizeClasses[size]}
      `}
    >
      {children}
    </span>
  )
}
