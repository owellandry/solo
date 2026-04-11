import { HiOutlineFolderOpen, HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2'

export function SidebarProjectList({ activeView, projects, selectedProjectId, onOpenProject }) {
  return (
    <div className="sidebar__section">
      <div className="sidebar__section-header">
        <span>Project list</span>
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
          <strong>No projects yet</strong>
          <p>Select a project to get started</p>
        </div>
      )}
    </div>
  )
}
