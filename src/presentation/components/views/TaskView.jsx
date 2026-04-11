import { useState, useSyncExternalStore } from 'react';
import { TaskMain } from './TaskView/TaskMain';
import { TaskSidepanel } from './TaskView/TaskSidepanel';
import { TaskHeader } from './TaskView/components/TaskHeader';

const MOBILE_MEDIA_QUERY = '(max-width: 1024px)';

function subscribeToMobileQuery(onStoreChange) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
  const handler = () => onStoreChange();

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }

  mediaQuery.addListener(handler);
  return () => mediaQuery.removeListener(handler);
}

function getMobileSnapshot() {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

export function TaskView({ project, mode, onToggleMode, isCollapsed, onToggleCollapse }) {
  const [isSidepanelCollapsed, setIsSidepanelCollapsed] = useState(false);
  const [isMobileSidepanelOpen, setIsMobileSidepanelOpen] = useState(false);
  const isMobileViewport = useSyncExternalStore(
    subscribeToMobileQuery,
    getMobileSnapshot,
    () => false
  );

  const toggleSidepanel = () => {
    if (isMobileViewport) {
      setIsMobileSidepanelOpen((prev) => !prev);
      return;
    }

    setIsSidepanelCollapsed((prev) => !prev);
  };

  const isSidepanelOpen = isMobileViewport ? isMobileSidepanelOpen : !isSidepanelCollapsed;

  return (
    <section className={`task-layout ${isSidepanelCollapsed ? 'task-layout--sidepanel-collapsed' : ''}`}>
      <TaskHeader
        project={project}
        mode={mode}
        onToggleMode={onToggleMode}
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
        onToggleSidepanel={toggleSidepanel}
        isSidepanelOpen={isSidepanelOpen}
      />

      <TaskMain
        project={project}
      />

      {!isMobileViewport && !isSidepanelCollapsed && (
        <div className="task-sidepanel-container container-ihs1TM">
          <TaskSidepanel project={project} mode={mode} />
        </div>
      )}

      {isMobileViewport && (
        <>
          {isMobileSidepanelOpen && (
            <button
              className="task-sidepanel-backdrop"
              onClick={() => setIsMobileSidepanelOpen(false)}
              aria-label="Close sidepanel"
            />
          )}

          <div
            className={`task-sidepanel-container container-ihs1TM task-sidepanel-container--mobile ${
              isMobileSidepanelOpen ? 'is-open' : ''
            }`}
          >
            <TaskSidepanel project={project} mode={mode} />
          </div>
        </>
      )}
    </section>
  );
}
