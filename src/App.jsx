import './App.css';
import { CookieNotice } from './presentation/components/common/CookieNotice';
import { LoginModal } from './presentation/components/common/LoginModal';
import { Sidebar } from './presentation/components/layout/Sidebar';
import { HomeView } from './presentation/components/views/HomeView';
import { SkillsView } from './presentation/components/views/SkillsView';
import { TaskView } from './presentation/components/views/TaskView';
import { useAppLogic } from './presentation/hooks/useAppLogic';

function App() {
  const { state, actions } = useAppLogic();

  if (!state.workspace || !state.projects.length) return null;

  return (
    <>
      <div className={`app-shell ${state.loginOpen ? 'has-modal' : ''} ${state.isSidebarCollapsed ? 'is-sidebar-collapsed' : ''}`}>
        <Sidebar
          activeView={state.activeView}
          mode={state.workspaceMode}
          isCollapsed={state.isSidebarCollapsed}
          authUser={state.authUser}
          onLogout={actions.logout}
          onToggleCollapse={() => actions.setIsSidebarCollapsed(!state.isSidebarCollapsed)}
          onToggleMode={actions.toggleWorkspace}
          onShowHome={() => actions.runWithViewTransition(() => actions.setActiveView('home'))}
          onShowSkills={() => actions.runWithViewTransition(() => actions.setActiveView('skills'))}
          onOpenProject={actions.openProject}
          onOpenLogin={() => actions.setLoginOpen(true)}
          projects={state.projects}
          selectedProjectId={state.selectedProjectId}
        />

        <main className="workspace">
          <div
            key={`${state.activeView}-${state.workspaceMode}-${state.selectedProject?.id}`}
            className={`view-stage${state.workspaceSlideDir ? ` view-stage--${state.workspaceSlideDir}` : ''}`}
            onAnimationEnd={() => actions.setWorkspaceSlideDir(null)}
          >
            {state.activeView === 'home' && (
              <HomeView
                workspace={state.workspace}
                draft={state.draft}
                onDraftChange={actions.setDraft}
                onSubmit={actions.handleSubmitHomePrompt}
                mode={state.workspaceMode}
                onToggleMode={actions.toggleWorkspace}
                isCollapsed={state.isSidebarCollapsed}
                onToggleCollapse={() => actions.setIsSidebarCollapsed(!state.isSidebarCollapsed)}
              />
            )}

            {state.activeView === 'skills' && (
              <SkillsView
                mode={state.workspaceMode}
                onToggleMode={actions.toggleWorkspace}
                isCollapsed={state.isSidebarCollapsed}
                onToggleCollapse={() => actions.setIsSidebarCollapsed(!state.isSidebarCollapsed)}
              />
            )}

            {state.activeView === 'task' && state.selectedProject && (
              <TaskView
                project={state.selectedProject}
                mode={state.workspaceMode}
                onToggleMode={actions.toggleWorkspace}
                isCollapsed={state.isSidebarCollapsed}
                onToggleCollapse={() => actions.setIsSidebarCollapsed(!state.isSidebarCollapsed)}
              />
            )}
          </div>
        </main>
      </div>

      <CookieNotice visible={state.cookieVisible} onClose={() => actions.setCookieVisible(false)} />
      <LoginModal
        open={state.loginOpen}
        onClose={() => actions.setLoginOpen(false)}
        onLoginSuccess={actions.completeLogin}
      />
    </>
  );
}

export default App;
