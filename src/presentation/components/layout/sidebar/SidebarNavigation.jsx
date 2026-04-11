import { HiOutlineFolderPlus, HiOutlineSparkles } from 'react-icons/hi2'
import { useTranslation } from 'react-i18next'

export function SidebarNavigation({ activeView, onShowHome, onShowSkills }) {
  const { t } = useTranslation();
  return (
    <nav className="sidebar__nav">
      <button
        className={`sidebar__nav-item ${activeView === 'home' ? 'is-active' : ''}`}
        onClick={onShowHome}
      >
        <HiOutlineFolderPlus size={16} />
        <span>{t('sidebar.nav.newTask')}</span>
      </button>

      <button
        className={`sidebar__nav-item ${activeView === 'skills' ? 'is-active' : ''}`}
        onClick={onShowSkills}
      >
        <HiOutlineSparkles size={16} />
        <span>{t('sidebar.nav.skills')}</span>
      </button>
    </nav>
  )
}
