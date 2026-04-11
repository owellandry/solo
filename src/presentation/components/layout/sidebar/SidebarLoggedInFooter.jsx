import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  HiOutlineArrowDownTray,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineCheck,
  HiOutlineChevronRight,
  HiOutlineGift,
  HiOutlineXMark,
} from 'react-icons/hi2'

const languageOptions = [
  'English',
  'Español',
  'Português',
  'Français',
  'Deutsch',
  'Русский',
  'Bahasa Indonesia',
  '中文',
  '日本語',
  'العربية'
]
const themeOptions = ['Dark', 'Light']

function UserSubmenu({
  panel,
  top,
  language,
  theme,
  onLanguageChange,
  onThemeChange,
}) {
  const { t } = useTranslation();
  
  if (!panel) {
    return null
  }

  if (panel === 'account') {
    const accountSubmenu = [
      t('sidebar.submenu.account'),
      t('sidebar.submenu.planBilling'),
      t('sidebar.submenu.usage')
    ]
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
      <div className="user-submenu user-submenu--grid" style={{ top }} role="menu">
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
  const { t } = useTranslation();

  const menuItems = [
    { id: 'account', label: t('sidebar.menu.manageAccount'), panel: 'account' },
    { id: 'language', label: t('sidebar.menu.language'), value: language, panel: 'language' },
    { id: 'theme', label: t('sidebar.menu.theme'), value: theme, panel: 'theme' },
    { id: 'settings', label: t('sidebar.menu.settings') },
    { id: 'download', label: t('sidebar.menu.downloadDesktop') },
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
          {t('sidebar.menu.logout')}
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

export function SidebarLoggedInFooter({ authUser, onLogout }) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activePanel, setActivePanel] = useState(null)
  const [panelTop, setPanelTop] = useState(52)
  
  // Maps lang code to Label
  const langMap = {
    'en': 'English',
    'es': 'Español',
    'pt': 'Português',
    'fr': 'Français',
    'de': 'Deutsch',
    'ru': 'Русский',
    'id': 'Bahasa Indonesia',
    'zh': '中文',
    'ja': '日本語',
    'ar': 'العربية'
  };
  
  const [language, setLanguage] = useState(() => {
    return langMap[i18n.language] || 'English'
  })
  
  const handleLanguageChange = (newLangLabel) => {
    if (newLangLabel === language) return;
    
    document.body.classList.add('ui-transitioning');
    
    setTimeout(() => {
      setLanguage(newLangLabel)
      
      const newCode = Object.keys(langMap).find(key => langMap[key] === newLangLabel) || 'en';
      
      i18n.changeLanguage(newCode);
      localStorage.setItem('solo-lang', newCode);
      
      setTimeout(() => {
        document.body.classList.remove('ui-transitioning');
      }, 50);
    }, 150);
  }
  
  // Theme logic
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('solo-theme') || 'Light'
  })

  const handleThemeChange = (newTheme) => {
    if (newTheme === theme) return;
    
    document.body.classList.add('ui-transitioning');
    
    setTimeout(() => {
      setTheme(newTheme);
      setTimeout(() => {
        document.body.classList.remove('ui-transitioning');
      }, 50);
    }, 150);
  }

  useEffect(() => {
    localStorage.setItem('solo-theme', theme)
    if (theme === 'Dark') {
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
    }
  }, [theme])
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
    if (onLogout) onLogout()
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
          <strong>{t('sidebar.footer.freeAccessTitle')}</strong>
        </div>
        <p>{t('sidebar.footer.freeAccessDesc')}</p>
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
            onLanguageChange={handleLanguageChange}
            onThemeChange={handleThemeChange}
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
            <span>{t('sidebar.footer.getDesktop')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
