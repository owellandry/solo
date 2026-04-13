import { useState, useEffect, useMemo, useCallback } from 'react';
import { flushSync } from 'react-dom';
import {
  getProjectsUseCase,
  getWorkspaceUseCase,
  updateProjectPromptUseCase
} from '../../application/di';

export function useAppLogic() {
  const [activeView, setActiveView] = useState('home');
  const [workspaceMode, setWorkspaceMode] = useState('office');
  const [selectedProjectId, setSelectedProjectId] = useState('dcc');
  const [loginOpen, setLoginOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [cookieVisible, setCookieVisible] = useState(() => {
    const saved = localStorage.getItem('system_cookie_open_modal');
    return saved !== 'false';
  });
  const [draft, setDraft] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [workspaceSlideDir, setWorkspaceSlideDir] = useState(null);

  const [projects, setProjects] = useState([]);
  const [workspace, setWorkspace] = useState(null);

  // Load initial data
  useEffect(() => {
    getProjectsUseCase.execute().then(setProjects);
    getWorkspaceUseCase.execute(workspaceMode).then(setWorkspace);
  }, [workspaceMode]);

  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId) ?? projects[0];
  }, [projects, selectedProjectId]);

  const runWithViewTransition = useCallback((update) => {
    if (!document.startViewTransition) {
      update();
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => {
        update();
      });
    });
  }, []);

  const openProject = useCallback((projectId) => {
    const target = projects.find((p) => p.id === projectId);
    if (!target) return;

    runWithViewTransition(() => {
      setSelectedProjectId(target.id);
      setWorkspaceMode(target.workspace);
      setActiveView('task');
    });
  }, [projects, runWithViewTransition]);

  const toggleWorkspace = useCallback(() => {
    const nextMode = workspaceMode === 'office' ? 'code' : 'office';
    const defaultProjectId = nextMode === 'office' ? 'dcc' : 'mclaunch';

    // office → code: thumb va a la derecha → nuevo contenido entra desde la derecha
    // code → office: thumb va a la izquierda → nuevo contenido entra desde la izquierda
    setWorkspaceSlideDir(nextMode === 'code' ? 'from-right' : 'from-left');
    setWorkspaceMode(nextMode);
    setSelectedProjectId(defaultProjectId);
    if (activeView === 'task') setActiveView('home');
  }, [workspaceMode, activeView]);

  const handleSubmitHomePrompt = useCallback(async () => {
    const defaultProjectId = workspaceMode === 'office' ? 'dcc' : 'mclaunch';
    const trimmedDraft = draft.trim();

    if (trimmedDraft) {
      await updateProjectPromptUseCase.execute(defaultProjectId, trimmedDraft);
      // reload projects
      const updatedProjects = await getProjectsUseCase.execute();
      setProjects(updatedProjects);
    }

    runWithViewTransition(() => {
      setSelectedProjectId(defaultProjectId);
      setActiveView('task');
      setDraft('');
    });
  }, [draft, workspaceMode, runWithViewTransition]);

  const completeLogin = useCallback((user = {}) => {
    const fallbackName = 'owell polanco';
    const normalizedName = (user.name || fallbackName).trim();
    const initials = normalizedName.charAt(0).toUpperCase() || 'O';

    setAuthUser({
      name: normalizedName,
      plan: user.plan || 'Pro',
      initials,
    });
    setLoginOpen(false);
  }, []);

  const logout = useCallback(() => {
    setAuthUser(null);
  }, []);

  const handleCloseCookie = useCallback(() => {
    localStorage.setItem('system_cookie_open_modal', 'false');
    setCookieVisible(false);
  }, []);

  return {
    state: {
      activeView, workspaceMode, selectedProjectId, loginOpen, cookieVisible,
      draft, isSidebarCollapsed, projects, workspace, selectedProject,
      workspaceSlideDir, authUser,
    },
    actions: {
      setActiveView, setLoginOpen, setCookieVisible: handleCloseCookie, setDraft,
      setIsSidebarCollapsed, openProject, toggleWorkspace,
      handleSubmitHomePrompt, runWithViewTransition, setWorkspaceSlideDir,
      completeLogin, logout,
    }
  };
}
