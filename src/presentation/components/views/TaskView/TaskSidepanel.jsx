import {
  HiOutlineCheckCircle,
  HiOutlineChevronDown,
  HiOutlineLink,
  HiOutlineListBullet,
} from 'react-icons/hi2';

export function TaskSidepanel({ project }) {
  const completedTodos = project.todos.length;

  return (
    <aside className="task-sidepanel">
      <div className="task-sidepanel__section">
        <div className="task-sidepanel__title">Todo</div>
        <div className="todo-list">
          {project.todos.map((todo) => (
            <div className="todo-list__item" key={todo}>
              <HiOutlineCheckCircle size={16} />
              <span>{todo}</span>
            </div>
          ))}
        </div>
        <div className="task-sidepanel__count">{completedTodos} completed</div>
      </div>

      <div className="task-sidepanel__section">
        <div className="task-sidepanel__title">Task Outputs</div>
        <div className="output-list">
          {project.taskOutputs.map((item) => (
            <button key={item} className="output-list__item">
              <HiOutlineLink size={14} />
              <span>{item}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="task-sidepanel__section">
        <div className="task-sidepanel__title">Context</div>
        <div className="context-meter">
          <div className="context-meter__bar">
            <span style={{ width: '51%' }} />
          </div>
          <strong>51%</strong>
        </div>

        <div className="context-breakdown">
          {project.contextBreakdown.map(([label, value]) => (
            <div key={label} className="context-breakdown__item">
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="task-sidepanel__section">
        <div className="task-sidepanel__title">References</div>
        <div className="reference-list">
          {project.references.map((item) => (
            <button key={item} className="reference-list__item">
              <HiOutlineListBullet size={14} />
              <span>{item}</span>
            </button>
          ))}
        </div>
      </div>

      <button className="task-sidepanel__compact">
        <span>compact</span>
        <HiOutlineChevronDown size={14} />
      </button>
    </aside>
  );
}
