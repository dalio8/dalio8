/**
 * @fileoverview A reusable Button component.
 * @fileoverview Um componente de Button reutilizável.
 */

import { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * @interface ButtonProps
 * @description The props for the Button component.
 * @description As props para o componente Button.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * @property {ReactNode} children - The content of the button.
   * @property {ReactNode} children - O conteúdo do botão.
   */
  children: ReactNode
  /**
   * @property {'primary' | 'secondary' | 'success' | 'error'} [variant='primary'] - The color variant of the button.
   * @property {'primary' | 'secondary' | 'success' | 'error'} [variant='primary'] - A variante de cor do botão.
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error'
  /**
   * @property {'sm' | 'md' | 'lg'} [size='md'] - The size of the button.
   * @property {'sm' | 'md' | 'lg'} [size='md'] - O tamanho do botão.
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * @property {boolean} [fullWidth=false] - Whether the button should take up the full width of its container.
   * @property {boolean} [fullWidth=false] - Se o botão deve ocupar a largura total de seu contêiner.
   */
  fullWidth?: boolean
}

/**
 * @function Button
 * @description A component to display a button with different styles.
 * @param {ButtonProps} props - The props for the component.
 * @returns {JSX.Element} The rendered button component.
 */
/**
 * @function Button
 * @description Um componente para exibir um botão com diferentes estilos.
 * @param {ButtonProps} props - As props para o componente.
 * @returns {JSX.Element} O componente de botão renderizado.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    'btn-base transition-all duration-200 font-semibold rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

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
