import { HiOutlineBars3 } from 'react-icons/hi2';
import { SidebarTop } from '../../../layout/sidebar/SidebarTop';

export function TaskHeader({ project, mode, onToggleMode, isCollapsed, onToggleCollapse, onToggleSidepanel }) {
  return (
    <header className="task-header">
      <div className="task-header__left">
        {isCollapsed && (
          <SidebarTop
            mode={mode}
            onToggleMode={onToggleMode}
            onToggleCollapse={onToggleCollapse}
            isCollapsed={isCollapsed}
          />
        )}
        <div className="task-header__info">
          <h2>{project.title}</h2>
          <span className="task-header__separator">·</span>
          <p>
            {project.repository} · {project.branch} · {project.updatedAt}
          </p>
        </div>
      </div>
      <button className="sidebar__ghost" onClick={onToggleSidepanel} aria-label="Toggle sidepanel">
        <HiOutlineBars3 size={15} />
      </button>
    </header>
  );
}
