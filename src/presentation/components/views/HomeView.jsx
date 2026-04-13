import { FeatureCard } from './home/FeatureCard'
import { ComposerCard } from './home/ComposerCard'
import { useTranslation } from 'react-i18next'
import { HiOutlineViewColumns } from 'react-icons/hi2'
import { ModeSwitch } from '../common/ModeSwitch'

export function HomeView({
  workspace,
  draft,
  onDraftChange,
  onSubmit,
  mode,
  onToggleMode,
  isCollapsed,
  onToggleCollapse,
}) {
  const { t } = useTranslation();
  const themeMode = workspace.brand === 'MTC' ? 'office' : 'code';
  const heroTitle = t(`workspace.${themeMode}.heroTitle`);
  const heroSubtitle = t(`workspace.${themeMode}.heroSubtitle`);
  const titleParts = heroTitle.split(' ')

  return (
    <section className="main-panel main-panel--home" style={{ position: 'relative' }}>
      {isCollapsed && (
        <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10 }}>
          <button 
            className="sidebar__ghost" 
            onClick={onToggleCollapse} 
            aria-label="Expand sidebar"
            style={{ display: 'grid', placeItems: 'center', width: '32px', height: '32px' }}
          >
            <HiOutlineViewColumns size={18} />
          </button>
          <ModeSwitch mode={mode} onToggleMode={onToggleMode} />
        </div>
      )}
      <div className="workspace-home">
        <div className="welcome-title-wrapper">
          <div className="welcome-title">
            <div className="animation-container">
              <div className="hero-copy">
                <h1>
                  <span className={`hero-copy__accent hero-copy__accent--${workspace.accent}`}>
                    {titleParts.slice(0, 1).join(' ')}
                  </span>{' '}
                  {titleParts.slice(1).join(' ')}
                  <span className="beta-badge">{t('home.beta')}</span>
                </h1>
                <p>{heroSubtitle}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="showcase-wrapper">
          <div className="feature-grid">
            {workspace.cards.map((item) => (
              <FeatureCard key={item.id} item={item} themeMode={themeMode} />
            ))}
          </div>
        </div>

        <div className="message-input-container">
          <ComposerCard
            draft={draft}
            onDraftChange={onDraftChange}
            onSubmit={onSubmit}
            workspace={workspace}
            themeMode={themeMode}
          />
        </div>
      </div>
    </section>
  )
}
