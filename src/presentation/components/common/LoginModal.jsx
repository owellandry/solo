import { useState } from 'react'
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

        <h2 id="login-title">Log in</h2>

        <div className="social-stack">
          <button className="social-button social-button--dark" onClick={handleLogin}>
            <FaGithub size={18} />
            <span>GitHub</span>
          </button>
          <button className="social-button social-button--dark" onClick={handleLogin}>
            <FaGoogle size={18} />
            <span>Google</span>
          </button>
        </div>

        <div className="form-divider" />

        <div className="form-stack">
          <label className="input-shell">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="input-shell input-shell--with-icon">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <HiOutlineEyeSlash size={16} />
          </label>
        </div>

        <button className="text-link text-center">Forget password ?</button>

        <button className="login-submit" onClick={handleLogin}>
          Log in
        </button>

        <p className="login-note text-center">
          Don&apos;t have an account? <button className="text-link inline-link">Sign up</button>
        </p>

        <div className="form-divider" />

        <p className="login-legal text-center">
          by continuing, you are agreeing to TRAE&apos;s Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
