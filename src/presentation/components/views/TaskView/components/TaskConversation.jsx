import { HiOutlineArrowTopRightOnSquare, HiOutlineCheckCircle } from 'react-icons/hi2';
import { ResponseSection } from '../ResponseSection';
import { useTranslation } from 'react-i18next';

export function TaskConversation({ project }) {
  const { t } = useTranslation();
  return (
    <div className="conversation">
      <div className="message message--user">
        <div className="message__bubble">{project.prompt}</div>
        <div className="message__meta">{t('task.imagesAttached', { count: 1 })}</div>
      </div>

      <div className="message message--assistant">
        <div className="assistant-line">
          <span className="assistant-line__dot" />
          <span>{t('task.soloCode')}</span>
        </div>
        <div className="assistant-line assistant-line--muted">
          <span className="assistant-line__dot assistant-line__dot--light" />
          <span>{t('task.thought')}</span>
        </div>
        <div className="assistant-chip">
          <span>{t('task.commandExecuted')}</span>
          <code>{project.command}</code>
        </div>
        <div className="assistant-line assistant-line--muted">
          <span className="assistant-line__dot assistant-line__dot--light" />
          <span>{t('task.thought')}</span>
        </div>
        <a className="assistant-chip assistant-chip--link" href={project.previewUrl}>
          <span>{t('task.previewWebPage')}</span>
          <span>{project.previewUrl}</span>
          <HiOutlineArrowTopRightOnSquare size={14} />
        </a>

        <article className="assistant-response">
          <p>{project.responseTitle}</p>
          {project.responseSections.map((section) => (
            <ResponseSection key={section.heading} section={section} />
          ))}

          <div className="artifacts-panel">
            <h4>{t('task.artifacts')}</h4>
            <div className="artifacts-panel__list">
              <button className="artifact-item">{project.taskOutputs[0]} </button>
            </div>
          </div>

          <div className="status-line">
            <HiOutlineCheckCircle size={15} />
            <span>{t('task.completed')}</span>
            <span>{t('task.workedFor', { time: '7m 31s' })}</span>
          </div>
        </article>
      </div>
    </div>
  );
}
