import { HiOutlineBars3, HiOutlineViewColumns } from 'react-icons/hi2';
import { FaGithub } from 'react-icons/fa6';
import { ModeSwitch } from '../../../common/ModeSwitch';

export function TaskHeader({
  project,
  mode,
  onToggleMode,
  isCollapsed,
  onToggleCollapse,
  onToggleSidepanel,
  isSidepanelOpen,
  sidepanelTriggerRef,
  onSidepanelTriggerMouseEnter,
  onSidepanelTriggerMouseLeave,
  onSidepanelTriggerFocus,
}) {
  return (
    <header className="task-header">
      <div className="task-header__left">
        {isCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
            <button 
              className="sidebar__ghost" 
              onClick={onToggleCollapse} 
              aria-label="Expand sidebar"
              style={{ display: 'grid', placeItems: 'center', width: '32px', height: '32px' }}
            >
              <HiOutlineViewColumns size={18} />
            </button>
            <ModeSwitch mode={mode} onToggleMode={onToggleMode} />
          </div>
        )}
        <div className="task-header__center">
          <div className="task-header__title-row">
            <h2>{project.title}</h2>
            <div className="task-header__subtitle">
              <div className="task-header__repo">
                <FaGithub size={13} />
                <span>{project.repository}</span>
              </div>
              <span className="task-header__dot">&nbsp;·&nbsp;</span>
              <span className="task-header__item">{project.branch}</span>
              <span className="task-header__dot">&nbsp;·&nbsp;</span>
              <p>{project.updatedAt}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="task-header__right">
        <button
          ref={sidepanelTriggerRef}
          className="task-header__action"
          onClick={onToggleSidepanel}
          onMouseEnter={onSidepanelTriggerMouseEnter}
          onMouseLeave={onSidepanelTriggerMouseLeave}
          onFocus={onSidepanelTriggerFocus}
          aria-label="Toggle sidepanel"
          aria-expanded={isSidepanelOpen}
        >
          <HiOutlineBars3 size={15} />
        </button>
      </div>
    </header>
  );
}
