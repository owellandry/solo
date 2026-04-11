import { HiOutlineArrowTopRightOnSquare, HiOutlineCheckCircle } from 'react-icons/hi2';
import { ResponseSection } from '../ResponseSection';

export function TaskConversation({ project }) {
  return (
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
  );
}
