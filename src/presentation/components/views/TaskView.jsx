import { useState } from 'react';
import { TaskMain } from './TaskView/TaskMain';
import { TaskSidepanel } from './TaskView/TaskSidepanel';
import { TaskHeader } from './TaskView/components/TaskHeader';

export function TaskView({ project, mode, onToggleMode, isCollapsed, onToggleCollapse }) {
  const [isSidepanelCollapsed, setIsSidepanelCollapsed] = useState(false);

  const toggleSidepanel = () => {
    setIsSidepanelCollapsed((prev) => !prev);
  };

  return (
    <section className={`task-layout ${isSidepanelCollapsed ? 'task-layout--sidepanel-collapsed' : ''}`}>
      <TaskHeader
        project={project}
        mode={mode}
        onToggleMode={onToggleMode}
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
        onToggleSidepanel={toggleSidepanel}
      />

      <TaskMain
        project={project}
      />

      {!isSidepanelCollapsed && (
        <div className="task-sidepanel-container container-ihs1TM">
          <TaskSidepanel project={project} mode={mode} />
        </div>
      )}
    </section>
  );
}
