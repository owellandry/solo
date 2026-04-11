import { TaskConversation } from './components/TaskConversation';
import { TaskComposer } from './components/TaskComposer';

export function TaskMain({ project }) {
  return (
    <div className="task-main">
      <TaskConversation project={project} />
      <TaskComposer />
    </div>
  );
}
