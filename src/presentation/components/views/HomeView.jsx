import { SidebarTop } from '../layout/sidebar/SidebarTop'
import { FeatureCard } from './home/FeatureCard'
import { ComposerCard } from './home/ComposerCard'

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
  const titleParts = workspace.heroTitle.split(' ')

  return (
    <section className="main-panel">
      <header className="topbar">
        <div>
          {isCollapsed && (
            <SidebarTop
              mode={mode}
              onToggleMode={onToggleMode}
              onToggleCollapse={onToggleCollapse}
              isCollapsed={isCollapsed}
            />
          )}
        </div>
        <button className="topbar__action">Get Desktop</button>
      </header>

      <div className="hero-layout">
        <div className="hero-copy">
          <h1>
            <span className={`hero-copy__accent hero-copy__accent--${workspace.accent}`}>
              {titleParts.slice(0, 1).join(' ')}
            </span>{' '}
            {titleParts.slice(1).join(' ')}
            <span className="beta-badge">BETA</span>
          </h1>
          <p>{workspace.heroSubtitle}</p>
        </div>

        <div className="feature-grid">
          {workspace.cards.map((item) => (
            <FeatureCard key={item.id} item={item} />
          ))}
        </div>

        <ComposerCard
          draft={draft}
          onDraftChange={onDraftChange}
          onSubmit={onSubmit}
          workspace={workspace}
        />
      </div>
    </section>
  )
}
