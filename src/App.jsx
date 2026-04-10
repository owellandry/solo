import { useMemo, useState } from 'react'
import { flushSync } from 'react-dom'

import './App.css'
import { CookieNotice } from './components/CookieNotice'
import { HomeView } from './components/HomeView'
import { LoginModal } from './components/LoginModal'
import { Sidebar } from './components/Sidebar'
import { SkillsView } from './components/SkillsView'
import { TaskView } from './components/TaskView'
import { projects, workspaceContent } from './data'

function App() {
  const [activeView, setActiveView] = useState('home')
  const [workspaceMode, setWorkspaceMode] = useState('office')
  const [selectedProjectId, setSelectedProjectId] = useState('dcc')
  const [loginOpen, setLoginOpen] = useState(false)
  const [cookieVisible, setCookieVisible] = useState(true)
  const [draft, setDraft] = useState('')
  const [projectPrompts, setProjectPrompts] = useState(() =>
    Object.fromEntries(projects.map((project) => [project.id, project.prompt])),
  )

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const workspace = workspaceContent[workspaceMode]

  const enhancedProjects = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      prompt: projectPrompts[project.id] ?? project.prompt,
    }))
  }, [projectPrompts])

  const selectedProject =
    enhancedProjects.find((project) => project.id === selectedProjectId) ?? enhancedProjects[0]

  const runWithViewTransition = (update) => {
    if (!document.startViewTransition) {
      update()
      return
    }

    document.startViewTransition(() => {
      flushSync(() => {
        update()
      })
    })
  }

  const openProject = (projectId) => {
    const target = enhancedProjects.find((project) => project.id === projectId)

    if (!target) {
      return
    }

    runWithViewTransition(() => {
      setSelectedProjectId(target.id)
      setWorkspaceMode(target.workspace)
      setActiveView('task')
    })
  }

  const toggleWorkspace = () => {
    const nextMode = workspaceMode === 'office' ? 'code' : 'office'
    const defaultProjectId = nextMode === 'office' ? 'dcc' : 'mclaunch'

    runWithViewTransition(() => {
      setWorkspaceMode(nextMode)
      setSelectedProjectId(defaultProjectId)

      if (activeView === 'task') {
        setActiveView('home')
      }
    })
  }

  const handleSubmitHomePrompt = () => {
    const defaultProjectId = workspaceMode === 'office' ? 'dcc' : 'mclaunch'
    const trimmedDraft = draft.trim()

    if (trimmedDraft) {
      setProjectPrompts((current) => ({
        ...current,
        [defaultProjectId]: trimmedDraft,
      }))
    }

    runWithViewTransition(() => {
      setSelectedProjectId(defaultProjectId)
      setActiveView('task')
      setDraft('')
    })
  }

  return (
    <>
      <div className={`app-shell ${loginOpen ? 'has-modal' : ''} ${isSidebarCollapsed ? 'is-sidebar-collapsed' : ''}`}>
        <Sidebar
          activeView={activeView}
          mode={workspaceMode}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onToggleMode={toggleWorkspace}
          onShowHome={() => runWithViewTransition(() => setActiveView('home'))}
          onShowSkills={() => runWithViewTransition(() => setActiveView('skills'))}
          onOpenProject={openProject}
          onOpenLogin={() => setLoginOpen(true)}
          projects={enhancedProjects}
          selectedProjectId={selectedProjectId}
        />

        <main className="workspace">
          <div
            key={`${activeView}-${workspaceMode}-${selectedProject.id}`}
            className="view-stage"
          >
            {activeView === 'home' && (
              <HomeView
                workspace={workspace}
                draft={draft}
                onDraftChange={setDraft}
                onSubmit={handleSubmitHomePrompt}
                mode={workspaceMode}
                onToggleMode={toggleWorkspace}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              />
            )}

            {activeView === 'skills' && (
              <SkillsView
                mode={workspaceMode}
                onToggleMode={toggleWorkspace}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              />
            )}

            {activeView === 'task' && (
              <TaskView
                project={selectedProject}
                mode={workspaceMode}
                onToggleMode={toggleWorkspace}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              />
            )}
          </div>
        </main>
      </div>

      <CookieNotice visible={cookieVisible} onClose={() => setCookieVisible(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}

export default App
