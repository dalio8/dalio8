import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'error'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'btn-base transition-all duration-200 font-semibold rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    error: 'btn-error',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
