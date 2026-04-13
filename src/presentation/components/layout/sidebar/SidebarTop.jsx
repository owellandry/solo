import { HiOutlineViewColumns } from 'react-icons/hi2'
import { useTranslation } from 'react-i18next'
import { ModeLogo } from './ModeLogo'

export function SidebarTop({ mode, onToggleMode, onToggleCollapse, isCollapsed }) {
  const { t } = useTranslation();
  const nextModeLabel = mode === 'office' ? t('sidebar.mode.code') : t('sidebar.mode.mtc')
  const currentModeLabel = mode === 'office' ? t('sidebar.mode.mtc') : t('sidebar.mode.code')

  return (
    <div className={`sidebar__top ${isCollapsed ? 'sidebar__top--collapsed' : ''}`}>
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

      <button 
        className="sidebar__ghost" 
        onClick={onToggleCollapse} 
        aria-label="Toggle sidebar"
        style={{ display: 'grid', placeItems: 'center', width: '32px', height: '32px' }}
      >
        <HiOutlineViewColumns size={18} />
      </button>
    </div>
  )
}
