import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  HiOutlineEyeSlash,
  HiOutlineXMark,
} from 'react-icons/hi2'
import { FaGithub, FaGoogle } from 'react-icons/fa'

function getDisplayName(email) {
  const localPart = email.split('@')[0] || ''
  const normalized = localPart
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!normalized) {
    return 'owell polanco'
  }

  return normalized.replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function LoginModal({ open, onClose, onLoginSuccess }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!open) {
    return null
  }

  const handleLogin = () => {
    onLoginSuccess({
      name: getDisplayName(email),
      plan: 'Pro',
    })
    setEmail('')
    setPassword('')
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="login-modal__close" onClick={onClose}>
          <HiOutlineXMark size={16} />
        </button>

        <h2 id="login-title">{t('login.title')}</h2>

        <div className="social-stack">
          <button className="social-button social-button--dark" onClick={handleLogin}>
            <FaGithub size={18} />
            <span>{t('login.github')}</span>
          </button>
          <button className="social-button social-button--dark" onClick={handleLogin}>
            <FaGoogle size={18} />
            <span>{t('login.google')}</span>
          </button>
        </div>

        <div className="form-divider" />

        <div className="form-stack">
          <label className="input-shell">
            <input
              type="email"
              placeholder={t('login.emailPlaceholder')}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="input-shell input-shell--with-icon">
            <input
              type="password"
              placeholder={t('login.passwordPlaceholder')}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <HiOutlineEyeSlash size={16} />
          </label>
        </div>

        <button className="text-link text-center">{t('login.forgetPassword')}</button>

        <button className="login-submit" onClick={handleLogin}>
          {t('login.submit')}
        </button>

        <p className="login-note text-center">
          {t('login.noAccount')} <button className="text-link inline-link">{t('login.signUp')}</button>
        </p>

        <div className="form-divider" />

        <p className="login-legal text-center">
          {t('login.agreePrefix')}
        </p>
      </div>
    </div>
  )
}
