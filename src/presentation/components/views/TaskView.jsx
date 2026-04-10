import { TaskMain } from './TaskView/TaskMain';
import { TaskSidepanel } from './TaskView/TaskSidepanel';

export function TaskView({ project, mode, onToggleMode, isCollapsed, onToggleCollapse }) {
  return (
    <section className="task-layout">
      <TaskMain
        project={project}
        mode={mode}
        onToggleMode={onToggleMode}
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
      />
      <TaskSidepanel project={project} />
    </section>
  );
}
