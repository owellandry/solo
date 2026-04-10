import { HiOutlineXMark } from 'react-icons/hi2'

export function CookieNotice({ visible, onClose }) {
  if (!visible) {
    return null
  }

  return (
    <aside className="cookie-notice">
      <button className="cookie-notice__close" onClick={onClose}>
        <HiOutlineXMark size={15} />
      </button>

      <h3>Cookie Notice</h3>
      <p>
        TRAE uses cookies and similar technologies to provide, secure, analyse, improve and
        market our services. Learn more in our Cookies Policy.
      </p>
      <button className="cookie-notice__action">Got it</button>
    </aside>
  )
}
