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
    <header className="top-navbar">
      <div className="top-navbar__content">
        <div className="top-navbar__left">
          <SidebarTop
            mode={mode}
            onToggleMode={onToggleMode}
            onToggleCollapse={onToggleCollapse}
            isCollapsed={false}
          />
        </div>

        <div className="top-navbar__center">
          <SidebarNavigation
            activeView={activeView}
            onShowHome={onShowHome}
            onShowSkills={onShowSkills}
          />
        </div>

        <div className="top-navbar__right">
          {/* <SidebarProjectList
            activeView={activeView}
            projects={projects}
            selectedProjectId={selectedProjectId}
            onOpenProject={onOpenProject}
          /> */}
          {authUser ? (
            <SidebarLoggedInFooter authUser={authUser} onLogout={onLogout} />
          ) : (
            <SidebarLoggedOutFooter onOpenLogin={onOpenLogin} />
          )}
        </div>
      </div>
    </header>
  )
}
