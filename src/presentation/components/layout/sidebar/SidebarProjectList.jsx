import { HiOutlineFolderOpen, HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2'
import { useTranslation } from 'react-i18next'

export function SidebarProjectList({ activeView, projects, selectedProjectId, onOpenProject }) {
  const { t } = useTranslation();
  return (
    <div className="sidebar__section">
      <div className="sidebar__section-header">
        <span>{t('sidebar.projects.title')}</span>
        <button className="sidebar__ghost">
          <HiOutlineFolderOpen size={14} />
        </button>
      </div>

      {activeView === 'task' ? (
        <div className="project-list">
          {projects.map((project) => (
            <button
              key={project.id}
              className={`project-list__item ${
                project.id === selectedProjectId ? 'is-selected' : ''
              }`}
              onClick={() => onOpenProject(project.id)}
            >
              <span>{project.name}</span>
              <HiOutlineChatBubbleOvalLeftEllipsis size={15} />
            </button>
          ))}
        </div>
      ) : (
        <div className="sidebar__empty">
          <div className="sidebar__empty-icon">
            <HiOutlineChatBubbleOvalLeftEllipsis size={18} />
          </div>
          <strong>{t('sidebar.projects.emptyTitle')}</strong>
          <p>{t('sidebar.projects.emptyDesc')}</p>
        </div>
      )}
    </div>
  )
}
