import { TaskHeader } from './components/TaskHeader';
import { TaskConversation } from './components/TaskConversation';
import { TaskComposer } from './components/TaskComposer';

export function TaskMain({ project, mode, onToggleMode, isCollapsed, onToggleCollapse }) {
  return (
    <div className="task-main">
      <TaskHeader
        project={project}
        mode={mode}
        onToggleMode={onToggleMode}
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
      />
      <TaskConversation project={project} />
      <TaskComposer />
    </div>
  );
}
