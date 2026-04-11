import { HiOutlineViewColumns } from 'react-icons/hi2'
import { ModeLogo } from './ModeLogo'

export function SidebarTop({ mode, onToggleMode, onToggleCollapse, isCollapsed }) {
  const nextModeLabel = mode === 'office' ? 'Code' : 'MTC'

  return (
    <div className={`sidebar__top ${isCollapsed ? 'sidebar__top--collapsed' : ''}`}>
      <button
        className={`mode-switch mode-switch--${mode}`}
        onClick={onToggleMode}
        aria-label={`Switch to ${nextModeLabel} mode`}
      >
        <span className="mode-switch__value">{mode === 'office' ? 'MTC' : 'Code'}</span>
        <span className="mode-switch__thumb" aria-hidden="true">
          <span className="mode-switch__logo-wrap">
            <ModeLogo />
          </span>
        </span>
      </button>

      <button className="sidebar__ghost" onClick={onToggleCollapse}>
        <HiOutlineViewColumns size={14} />
      </button>
    </div>
  )
}
