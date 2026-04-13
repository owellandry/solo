import { PiChatTeardropDotsBold } from "react-icons/pi"
import { LuBookMarked } from "react-icons/lu"
import { useTranslation } from 'react-i18next'

export function SidebarNavigation({ activeView, onShowHome, onShowSkills }) {
  const { t } = useTranslation();
  return (
    <nav className="sidebar__nav">
      <button
        className={`sidebar__nav-item ${activeView === 'home' ? 'is-active' : ''}`}
        onClick={onShowHome}
      >
        <PiChatTeardropDotsBold size={18} />
        <span>{t('sidebar.nav.newTask')}</span>
      </button>

      <button
        className={`sidebar__nav-item ${activeView === 'skills' ? 'is-active' : ''}`}
        onClick={onShowSkills}
      >
        <LuBookMarked size={17} />
        <span>{t('sidebar.nav.skills')}</span>
      </button>
    </nav>
  )
}
