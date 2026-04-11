import { HiOutlineXMark } from 'react-icons/hi2'
import { useTranslation } from 'react-i18next'

export function CookieNotice({ visible, onClose }) {
  const { t } = useTranslation();

  if (!visible) {
    return null
  }

  return (
    <aside className="cookie-notice">
      <button className="cookie-notice__close" onClick={onClose}>
        <HiOutlineXMark size={15} />
      </button>

      <h3>{t('cookies.title')}</h3>
      <p>
        {t('cookies.notice')}
      </p>
      <button className="cookie-notice__action" onClick={onClose}>{t('cookies.accept')}</button>
    </aside>
  )
}
