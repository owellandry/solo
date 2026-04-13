import { useTranslation } from 'react-i18next'
import { ModeLogo } from '../layout/sidebar/ModeLogo'

export function ModeSwitch({ mode, onToggleMode }) {
  const { t } = useTranslation();
  const nextModeLabel = mode === 'office' ? t('sidebar.mode.code') : t('sidebar.mode.mtc')
  const currentModeLabel = mode === 'office' ? t('sidebar.mode.mtc') : t('sidebar.mode.code')

  return (
    <button
      className={`mode-switch mode-switch--${mode}`}
      onClick={onToggleMode}
      aria-label={t('sidebar.mode.switch', { mode: nextModeLabel })}
    >
      <span className="mode-switch__value">{currentModeLabel}</span>
      <span className="mode-switch__thumb" aria-hidden="true">
        <span className="mode-switch__logo-wrap">
          <ModeLogo />
        </span>
      </span>
    </button>
  )
}
