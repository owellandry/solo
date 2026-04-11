import { useState } from 'react';
import { TaskMain } from './TaskView/TaskMain';
import { TaskSidepanel } from './TaskView/TaskSidepanel';

export function TaskView({ project, mode, onToggleMode, isCollapsed, onToggleCollapse }) {
  const [isSidepanelCollapsed, setIsSidepanelCollapsed] = useState(false);

  const toggleSidepanel = () => {
    setIsSidepanelCollapsed((prev) => !prev);
  };

  return (
    <section className={`task-layout ${isSidepanelCollapsed ? 'task-layout--sidepanel-collapsed' : ''}`}>
      <TaskMain
        project={project}
        mode={mode}
        onToggleMode={onToggleMode}
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
        onToggleSidepanel={toggleSidepanel}
      />
      {!isSidepanelCollapsed && <TaskSidepanel project={project} />}
    </section>
  );
}
