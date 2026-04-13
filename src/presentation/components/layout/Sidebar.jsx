import { SidebarTop } from './sidebar/SidebarTop'
import { SidebarNavigation } from './sidebar/SidebarNavigation'
import { SidebarProjectList } from './sidebar/SidebarProjectList'
import { SidebarLoggedInFooter } from './sidebar/SidebarLoggedInFooter'
import { SidebarLoggedOutFooter } from './sidebar/SidebarLoggedOutFooter'

export function Sidebar({
  activeView,
  mode,
  isCollapsed,
  authUser,
  onLogout,
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

        <SidebarNavigation
          activeView={activeView}
          onShowHome={onShowHome}
          onShowSkills={onShowSkills}
        />

        <SidebarProjectList
          activeView={activeView}
          projects={projects}
          selectedProjectId={selectedProjectId}
          onOpenProject={onOpenProject}
        />

        {authUser ? (
          <SidebarLoggedInFooter authUser={authUser} onLogout={onLogout} />
        ) : (
          <SidebarLoggedOutFooter onOpenLogin={onOpenLogin} />
        )}
      </div>
    </aside>
  )
}
