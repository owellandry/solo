import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  HiOutlineArrowDownTray,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineCheck,
  HiOutlineChevronRight,
  HiOutlineFolderOpen,
  HiOutlineFolderPlus,
  HiOutlineGift,
  HiOutlineSparkles,
  HiOutlineViewColumns,
  HiOutlineXMark,
} from 'react-icons/hi2'

const accountSubmenu = ['Account', 'Plan & Billings', 'Usage']
const languageOptions = ['Espa\u00f1ol', 'English', 'Portugu\u00eas']
const themeOptions = ['Dark', 'Light']

export function ModeLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="24"
      fill="none"
      viewBox="0 0 34 24"
      className="mode-switch__logo"
      aria-hidden="true"
    >
      <g fill="currentColor" clipPath="url(#mode-switch-logo)">
        <path d="M.002 0H0v19.549h4.454V4.454h24.864v15.092H4.454V24h29.318V0z" />
        <path d="m13.43 8.776-3.149 3.15 3.15 3.149 3.149-3.15zM23.204 8.775l-3.15 3.149 3.15 3.149 3.15-3.15z" />
      </g>
      <defs>
        <clipPath id="mode-switch-logo">
          <path fill="#fff" d="M0 0h33.772v24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function SidebarTop({ mode, onToggleMode, onToggleCollapse, isCollapsed }) {
  const nextModeLabel = mode === 'office' ? 'Code' : 'MTC'

  return (
    <div className={`sidebar__top ${isCollapsed ? 'sidebar__top--collapsed' : ''}`}>
      <button
        className={`mode-switch mode-switch--${mode}`}
        onClick={onToggleMode}
        aria-label={`Switch to ${nextModeLabel} mode`}
      >
        <span className="mode-switch__value">{mode === 'office' ? 'MTC' : 'Code'}</span>
        <span className="mode-switch__thumb" aria-hidden="true">
          <span className="mode-switch__logo-wrap">
            <ModeLogo />
          </span>
        </span>
      </button>

      <button className="sidebar__ghost" onClick={onToggleCollapse}>
        <HiOutlineViewColumns size={14} />
      </button>
    </div>
  )
}

function UserSubmenu({
  panel,
  top,
  language,
  theme,
  onLanguageChange,
  onThemeChange,
}) {
  if (!panel) {
    return null
  }

  if (panel === 'account') {
    return (
      <div className="user-submenu" style={{ top }} role="menu">
        {accountSubmenu.map((option) => (
          <button key={option} className="user-submenu__item">
            <span>{option}</span>
            <HiOutlineArrowTopRightOnSquare className="user-submenu__icon" size={13} />
          </button>
        ))}
      </div>
    )
  }

  if (panel === 'language') {
    return (
      <div className="user-submenu" style={{ top }} role="menu">
        {languageOptions.map((option) => (
          <button
            key={option}
            className={`user-submenu__item ${language === option ? 'is-selected' : ''}`}
            onClick={() => onLanguageChange(option)}
          >
            <span>{option}</span>
            {language === option && <HiOutlineCheck className="user-submenu__icon" size={15} />}
          </button>
        ))}
      </div>
    )
  }

  if (panel === 'theme') {
    return (
      <div className="user-submenu" style={{ top }} role="menu">
        {themeOptions.map((option) => (
          <button
            key={option}
            className={`user-submenu__item ${theme === option ? 'is-selected' : ''}`}
            onClick={() => onThemeChange(option)}
          >
            <span>{option}</span>
            {theme === option && <HiOutlineCheck className="user-submenu__icon" size={15} />}
          </button>
        ))}
      </div>
    )
  }

  return null
}

function UserMenu({
  authUser,
  activePanel,
  panelTop,
  language,
  theme,
  onSelectPanel,
  onLanguageChange,
  onThemeChange,
  onLogout,
  itemRefs,
}) {
  const menuItems = [
    { id: 'account', label: 'Manage Account', panel: 'account' },
    { id: 'language', label: 'Language', value: language, panel: 'language' },
    { id: 'theme', label: 'Theme', value: theme, panel: 'theme' },
    { id: 'settings', label: 'Settings' },
    { id: 'download', label: 'Download SOLO Desktop' },
  ]

  return (
    <div className="user-menu-popover" role="menu">
      <div className="user-menu">
        <div className="user-menu__header">
          <span className="session-row__avatar">{authUser.initials}</span>
          <span className="user-menu__name">{authUser.name}</span>
          <span className="session-row__plan">{authUser.plan}</span>
        </div>

        <div className="user-menu__divider" />

        {menuItems.map((item) => (
          <button
            key={item.id}
            ref={(node) => {
              if (item.panel) {
                itemRefs.current[item.panel] = node
              }
            }}
            className={`user-menu__item ${activePanel === item.panel ? 'is-active' : ''}`}
            onClick={() => onSelectPanel(item.panel ?? null)}
            onMouseEnter={() => {
              if (activePanel && item.panel && item.panel !== activePanel) {
                onSelectPanel(item.panel)
              }
            }}
            onFocus={() => {
              if (activePanel && item.panel && item.panel !== activePanel) {
                onSelectPanel(item.panel)
              }
            }}
          >
            <span>{item.label}</span>
            {item.panel ? (
              <span className="user-menu__meta">
                {item.value && <span>{item.value}</span>}
                <HiOutlineChevronRight size={15} />
              </span>
            ) : null}
          </button>
        ))}

        <div className="user-menu__divider" />

        <button className="user-menu__logout" onClick={onLogout}>
          Log Out
        </button>
      </div>

      <UserSubmenu
        panel={activePanel}
        top={panelTop}
        language={language}
        theme={theme}
        onLanguageChange={onLanguageChange}
        onThemeChange={onThemeChange}
      />
    </div>
  )
}

function SidebarLoggedInFooter({ authUser, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activePanel, setActivePanel] = useState(null)
  const [panelTop, setPanelTop] = useState(52)
  const [language, setLanguage] = useState('English')
  const [theme, setTheme] = useState('Light')
  const menuRef = useRef(null)
  const itemRefs = useRef({})

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false)
        setActivePanel(null)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setActivePanel(null)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  useLayoutEffect(() => {
    if (!isMenuOpen || !activePanel) {
      return
    }

    const target = itemRefs.current[activePanel]
    if (target) {
      setPanelTop(target.offsetTop)
    }
  }, [activePanel, isMenuOpen])

  const handleToggleMenu = () => {
    setIsMenuOpen((current) => {
      const next = !current
      if (!next) {
        setActivePanel(null)
      }
      return next
    })
  }

  const handleLogout = () => {
    setIsMenuOpen(false)
    setActivePanel(null)
    onLogout()
  }

  const handleSelectPanel = (panel) => {
    setActivePanel(panel)
  }

  return (
    <div className="sidebar__footer sidebar__footer--logged">
      <div className="access-card">
        <button className="access-card__close" aria-label="Dismiss access card">
          <HiOutlineXMark size={14} />
        </button>
        <div className="access-card__title-row">
          <span className="access-card__icon">
            <HiOutlineGift size={15} />
          </span>
          <strong>Limited Free Access Is Active</strong>
        </div>
        <p>AI requests are free for a limited time. Tell SOLO what you need.</p>
      </div>

      <div className="session-row-wrap" ref={menuRef}>
        {isMenuOpen && (
          <UserMenu
            authUser={authUser}
            activePanel={activePanel}
            panelTop={panelTop}
            language={language}
            theme={theme}
            onSelectPanel={handleSelectPanel}
            onLanguageChange={setLanguage}
            onThemeChange={setTheme}
            onLogout={handleLogout}
            itemRefs={itemRefs}
          />
        )}

        <div className="session-row">
          <button
            className={`session-row__user ${isMenuOpen ? 'is-open' : ''}`}
            onClick={handleToggleMenu}
          >
            <span className="session-row__avatar">{authUser.initials}</span>
            <span className="session-row__name">{authUser.name}</span>
            <span className="session-row__plan">{authUser.plan}</span>
          </button>

          <button className="session-row__desktop">
            <HiOutlineArrowDownTray size={14} />
            <span>Get Desktop</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export function Sidebar({
  activeView,
  mode,
  isCollapsed,
  authUser,
  onLogout,
  onToggleCollapse,
  onToggleMode,
  onShowHome,
  onShowSkills,
  onOpenProject,
  onOpenLogin,
  projects,
  selectedProjectId,
}) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'is-collapsed' : ''}`}>
      <div className="sidebar__content">
        <SidebarTop
          mode={mode}
          onToggleMode={onToggleMode}
          onToggleCollapse={onToggleCollapse}
          isCollapsed={isCollapsed}
        />

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

        {authUser ? (
          <SidebarLoggedInFooter authUser={authUser} onLogout={onLogout} />
        ) : (
          <div className="sidebar__footer">
            <button className="sidebar__login" onClick={onOpenLogin}>
              <span>Log in</span>
              <span aria-hidden="true">→</span>
            </button>
            <button className="sidebar__desktop">Get Desktop</button>
          </div>
        )}
      </div>
    </aside>
  )
}
