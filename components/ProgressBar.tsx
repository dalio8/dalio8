interface ProgressBarProps {
  progress: number // 0 a 100
  label?: string
  showPercentage?: boolean
  color?: 'primary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

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
    <div className="w-full" role="progressbar" aria-valuenow={normalizedProgress} aria-valuemin={0} aria-valuemax={100}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-secondary-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-semibold text-secondary-900">
              {normalizedProgress.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-secondary-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${normalizedProgress}%` }}
          aria-label={`${normalizedProgress}% completo`}
        />
      </div>
    </div>
  )
}
