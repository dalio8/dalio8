/**
 * @fileoverview A reusable Badge component.
 * @fileoverview Um componente de Badge reutilizável.
 */

import { ReactNode } from 'react'

/**
 * @interface BadgeProps
 * @description The props for the Badge component.
 * @description As props para o componente Badge.
 */
interface BadgeProps {
  /**
   * @property {ReactNode} children - The content of the badge.
   * @property {ReactNode} children - O conteúdo do badge.
   */
  children: ReactNode
  /**
   * @property {'primary' | 'success' | 'error' | 'warning' | 'secondary'} [variant='primary'] - The color variant of the badge.
   * @property {'primary' | 'success' | 'error' | 'warning' | 'secondary'} [variant='primary'] - A variante de cor do badge.
   */
  variant?: 'primary' | 'success' | 'error' | 'warning' | 'secondary'
  /**
   * @property {'sm' | 'md'} [size='md'] - The size of the badge.
   * @property {'sm' | 'md'} [size='md'] - O tamanho do badge.
   */
  size?: 'sm' | 'md'
}

/**
 * @function Badge
 * @description A component to display a badge with different styles.
 * @param {BadgeProps} props - The props for the component.
 * @returns {JSX.Element} The rendered badge component.
 */
/**
 * @function Badge
 * @description Um componente para exibir um badge com diferentes estilos.
 * @param {BadgeProps} props - As props para o componente.
 * @returns {JSX.Element} O componente de badge renderizado.
 */
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
