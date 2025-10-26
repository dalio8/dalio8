/**
 * @fileoverview A reusable Card component.
 * @fileoverview Um componente de Card reutilizável.
 */

import { HTMLAttributes, ReactNode } from 'react'

/**
 * @interface CardProps
 * @description The props for the Card component.
 * @description As props para o componente Card.
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @property {ReactNode} children - The content of the card.
   * @property {ReactNode} children - O conteúdo do card.
   */
  children: ReactNode
  /**
   * @property {'none' | 'sm' | 'md' | 'lg'} [padding='md'] - The padding of the card.
   * @property {'none' | 'sm' | 'md' | 'lg'} [padding='md'] - O preenchimento do card.
   */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /**
   * @property {boolean} [hover=false] - Whether the card should have a hover effect.
   * @property {boolean} [hover=false] - Se o card deve ter um efeito de hover.
   */
  hover?: boolean
}

/**
 * @function Card
 * @description A component to display content in a card.
 * @param {CardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered card component.
 */
/**
 * @function Card
 * @description Um componente para exibir conteúdo em um card.
 * @param {CardProps} props - As props para o componente.
 * @returns {JSX.Element} O componente de card renderizado.
 */
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
