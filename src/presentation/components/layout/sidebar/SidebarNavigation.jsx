import { HiOutlineFolderPlus, HiOutlineSparkles } from 'react-icons/hi2'

export function SidebarNavigation({ activeView, onShowHome, onShowSkills }) {
  return (
    <nav className="sidebar__nav">
      <button
        className={`sidebar__nav-item ${activeView === 'home' ? 'is-active' : ''}`}
        onClick={onShowHome}
      >
        <HiOutlineFolderPlus size={16} />
        <span>New task</span>
      </button>

      <button
        className={`sidebar__nav-item ${activeView === 'skills' ? 'is-active' : ''}`}
        onClick={onShowSkills}
      >
        <HiOutlineSparkles size={16} />
        <span>Skills</span>
      </button>
    </nav>
  )
}
