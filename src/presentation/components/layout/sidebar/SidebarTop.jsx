import { HiOutlineViewColumns } from 'react-icons/hi2'
import { ModeSwitch } from '../../common/ModeSwitch'

export function SidebarTop({ mode, onToggleMode, onToggleCollapse, isCollapsed }) {
  return (
    <div className={`sidebar__top ${isCollapsed ? 'sidebar__top--collapsed' : ''}`}>
      <ModeSwitch mode={mode} onToggleMode={onToggleMode} />

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
