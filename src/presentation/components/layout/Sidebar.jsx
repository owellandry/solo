import {
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineFolderOpen,
  HiOutlineFolderPlus,
  HiOutlineSparkles,
  HiOutlineViewColumns,
} from 'react-icons/hi2'

export function ModeLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="24"
      fill="none"
      viewBox="0 0 34 24"
      className="mode-switch__logo"
      aria-hidden="true"
    >
      <g fill="currentColor" clipPath="url(#mode-switch-logo)">
        <path d="M.002 0H0v19.549h4.454V4.454h24.864v15.092H4.454V24h29.318V0z" />
        <path d="m13.43 8.776-3.149 3.15 3.15 3.149 3.149-3.15zM23.204 8.775l-3.15 3.149 3.15 3.149 3.15-3.15z" />
      </g>
      <defs>
        <clipPath id="mode-switch-logo">
          <path fill="#fff" d="M0 0h33.772v24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

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

export function Sidebar({
  activeView,
  mode,
  isCollapsed,
  onToggleCollapse,
  onToggleMode,
  onShowHome,
  onShowSkills,
  onOpenProject,
  onOpenLogin,
  projects,
  selectedProjectId,
}) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'is-collapsed' : ''}`}>
      <div className="sidebar__content">
        <SidebarTop
          mode={mode}
          onToggleMode={onToggleMode}
          onToggleCollapse={onToggleCollapse}
          isCollapsed={isCollapsed}
        />

        <nav className="sidebar__nav">
          <button
            className={`sidebar__nav-item ${activeView === 'home' ? 'is-active' : ''}`}
            onClick={onShowHome}
          >
            <HiOutlineFolderPlus size={16} />
            <span>New task</span>
          </button>

          <button
            className={`sidebar__nav-item ${activeView === 'skills' ? 'is-active' : ''}`}
            onClick={onShowSkills}
          >
            <HiOutlineSparkles size={16} />
            <span>Skills</span>
          </button>
        </nav>

        <div className="sidebar__section">
          <div className="sidebar__section-header">
            <span>Project list</span>
            <button className="sidebar__ghost">
              <HiOutlineFolderOpen size={14} />
            </button>
          </div>

          {activeView === 'task' ? (
            <div className="project-list">
              {projects.map((project) => (
                <button
                  key={project.id}
                  className={`project-list__item ${
                    project.id === selectedProjectId ? 'is-selected' : ''
                  }`}
                  onClick={() => onOpenProject(project.id)}
                >
                  <span>{project.name}</span>
                  <HiOutlineChatBubbleOvalLeftEllipsis size={15} />
                </button>
              ))}
            </div>
          ) : (
            <div className="sidebar__empty">
              <div className="sidebar__empty-icon">
                <HiOutlineChatBubbleOvalLeftEllipsis size={18} />
              </div>
              <strong>No projects yet</strong>
              <p>Select a project to get started</p>
            </div>
          )}
        </div>

        <div className="sidebar__footer">
          <button className="sidebar__login" onClick={onOpenLogin}>
            <span>Log in</span>
            <span aria-hidden="true">→</span>
          </button>
          <button className="sidebar__desktop">Get Desktop</button>
        </div>
      </div>
    </aside>
  )
}
