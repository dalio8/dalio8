/**
 * @fileoverview A reusable ProgressBar component.
 * @fileoverview Um componente de ProgressBar reutilizável.
 */

/**
 * @interface ProgressBarProps
 * @description The props for the ProgressBar component.
 * @description As props para o componente ProgressBar.
 */
interface ProgressBarProps {
  /**
   * @property {number} progress - The progress value (0 to 100).
   * @property {number} progress - O valor do progresso (0 a 100).
   */
  progress: number
  /**
   * @property {string} [label] - An optional label for the progress bar.
   * @property {string} [label] - Um rótulo opcional para a barra de progresso.
   */
  label?: string
  /**
   * @property {boolean} [showPercentage=true] - Whether to show the percentage.
   * @property {boolean} [showPercentage=true] - Se deve mostrar a porcentagem.
   */
  showPercentage?: boolean
  /**
   * @property {'primary' | 'success' | 'warning' | 'error'} [color='primary'] - The color of the progress bar.
   * @property {'primary' | 'success' | 'warning' | 'error'} [color='primary'] - A cor da barra de progresso.
   */
  color?: 'primary' | 'success' | 'warning' | 'error'
  /**
   * @property {'sm' | 'md' | 'lg'} [size='md'] - The size of the progress bar.
   * @property {'sm' | 'md' | 'lg'} [size='md'] - O tamanho da barra de progresso.
   */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * @function ProgressBar
 * @description A component to display a progress bar.
 * @param {ProgressBarProps} props - The props for the component.
 * @returns {JSX.Element} The rendered progress bar component.
 */
/**
 * @function ProgressBar
 * @description Um componente para exibir uma barra de progresso.
 * @param {ProgressBarProps} props - As props para o componente.
 * @returns {JSX.Element} O componente de barra de progresso renderizado.
 */
export default function ProgressBar({
  progress,
  label,
  showPercentage = true,
  color = 'primary',
  size = 'md',
}: ProgressBarProps) {
  // Garantir que o progresso está entre 0 e 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100)

  const colorClasses = {
    primary: 'bg-primary-600',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  }

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuenow={normalizedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-secondary-700">
            {label}
          </span>
          {showPercentage && (
            <span className="text-sm font-semibold text-secondary-900">
              {normalizedProgress.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-secondary-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
      >
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${normalizedProgress}%` }}
          aria-label={`${normalizedProgress}% completo`}
        />
      </div>
    </div>
  )
}
