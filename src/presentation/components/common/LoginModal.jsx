import {
  HiOutlineEyeSlash,
  HiOutlineXMark,
} from 'react-icons/hi2'
import { FaGithub, FaGoogle } from 'react-icons/fa'

export function LoginModal({ open, onClose }) {
  if (!open) {
    return null
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
          <button className="social-button social-button--dark">
            <FaGithub size={18} />
            <span>GitHub</span>
          </button>
          <button className="social-button social-button--dark">
            <FaGoogle size={18} />
            <span>Google</span>
          </button>
        </div>

        <div className="form-divider" />

        <div className="form-stack">
          <label className="input-shell">
            <input type="email" placeholder="Email" />
          </label>
          <label className="input-shell input-shell--with-icon">
            <input type="password" placeholder="Password" />
            <HiOutlineEyeSlash size={16} />
          </label>
        </div>

        <button className="text-link text-center">Forget password ?</button>

        <button className="login-submit">Log in</button>

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
