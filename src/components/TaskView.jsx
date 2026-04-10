import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineArrowUp,
  HiOutlineBars3,
  HiOutlineCheckCircle,
  HiOutlineChevronDown,
  HiOutlineHome,
  HiOutlineLink,
  HiOutlineListBullet,
  HiOutlinePaperClip,
} from 'react-icons/hi2'

import { SidebarTop } from './Sidebar'

function ResponseSection({ section }) {
  if (section.code) {
    return (
      <section className="response-block">
        <h4>{section.heading}</h4>
        <pre>
          <code>{section.code.join('\n')}</code>
        </pre>
      </section>
    )
  }

  return (
    <section className="response-block">
      <h4>{section.heading}</h4>
      <ul>
        {section.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </section>
  )
}

export function TaskView({ project, mode, onToggleMode, isCollapsed, onToggleCollapse }) {
  const completedTodos = project.todos.length

  return (
    <section className="task-layout">
      <div className="task-main">
        <header className="task-header">
          <div className="task-header__left">
            {isCollapsed && (
              <SidebarTop
                mode={mode}
                onToggleMode={onToggleMode}
                onToggleCollapse={onToggleCollapse}
                isCollapsed={isCollapsed}
              />
            )}
            <div>
              <h2>{project.title}</h2>
              <p>
                {project.repository} · {project.branch} · {project.updatedAt}
              </p>
            </div>
          </div>
          <button className="sidebar__ghost">
            <HiOutlineBars3 size={15} />
          </button>
        </header>

        <div className="conversation">
          <div className="message message--user">
            <div className="message__bubble">{project.prompt}</div>
            <div className="message__meta">Images attached 1</div>
          </div>

          <div className="message message--assistant">
            <div className="assistant-line">
              <span className="assistant-line__dot" />
              <span>SOLO Code</span>
            </div>
            <div className="assistant-line assistant-line--muted">
              <span className="assistant-line__dot assistant-line__dot--light" />
              <span>Thought</span>
            </div>
            <div className="assistant-chip">
              <span>Command executed</span>
              <code>{project.command}</code>
            </div>
            <div className="assistant-line assistant-line--muted">
              <span className="assistant-line__dot assistant-line__dot--light" />
              <span>Thought</span>
            </div>
            <a className="assistant-chip assistant-chip--link" href={project.previewUrl}>
              <span>Preview web page</span>
              <span>{project.previewUrl}</span>
              <HiOutlineArrowTopRightOnSquare size={14} />
            </a>

            <article className="assistant-response">
              <p>{project.responseTitle}</p>
              {project.responseSections.map((section) => (
                <ResponseSection key={section.heading} section={section} />
              ))}

              <div className="artifacts-panel">
                <h4>Artifacts</h4>
                <div className="artifacts-panel__list">
                  <button className="artifact-item">{project.taskOutputs[0]} </button>
                </div>
              </div>

              <div className="status-line">
                <HiOutlineCheckCircle size={15} />
                <span>Completed</span>
                <span>Worked for 7m 31s</span>
              </div>
            </article>
          </div>
        </div>

        <div className="task-composer">
          <textarea placeholder="Help you organize literature reviews, create PPTs, analyze Excel data and other daily work, output professional deliverables." />
          <div className="task-composer__footer">
            <div className="task-composer__left">
              <button className="composer-button" aria-label="Home">
                <HiOutlineHome size={15} />
              </button>
              <button className="composer-button" aria-label="Attach file">
                <HiOutlinePaperClip size={15} />
              </button>
            </div>
            <div className="task-composer__right">
              <span>SOLO Auto Model</span>
              <button className="composer-submit">
                <HiOutlineArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

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
    </section>
  )
}
