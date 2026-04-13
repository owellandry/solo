import { useTranslation } from 'react-i18next'

export function SidebarLoggedOutFooter({ onOpenLogin }) {
  const { t } = useTranslation();
  return (
    <div className="sidebar__footer" style={{ display: 'flex', flexDirection: 'row' }}>
      <button className="sidebar__desktop">{t('sidebar.footer.getDesktop')}</button>
      <button className="sidebar__login" onClick={onOpenLogin}>
        <span>{t('sidebar.footer.login')}</span>
        <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}
