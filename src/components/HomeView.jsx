import {
  HiOutlineArrowUp,
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineCodeBracket,
  HiOutlineCog6Tooth,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineDocumentText,
  HiOutlineFolderPlus,
  HiOutlinePencilSquare,
  HiOutlinePhoto,
  HiOutlinePresentationChartBar,
  HiOutlineSparkles,
  HiOutlineChevronDown,
  HiOutlineInbox,
} from 'react-icons/hi2'
import { FaGamepad, FaGithub } from 'react-icons/fa6'
import { BiGitBranch } from 'react-icons/bi'

import { SidebarTop } from './Sidebar'

const iconMap = {
  reading: HiOutlineBookOpen,
  research: HiOutlinePresentationChartBar,
  mining: HiOutlineChartBar,
  content: HiOutlineDocumentText,
  app: HiOutlineCodeBracket,
  project: HiOutlineDocumentMagnifyingGlass,
  game: FaGamepad,
  automation: HiOutlineCog6Tooth,
}

function FeatureCard({ item }) {
  const Icon = iconMap[item.icon] ?? HiOutlineSparkles

  return (
    <article className="feature-card">
      <div className="feature-card__icon">
        <Icon size={22} />
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  )
}

export function HomeView({ workspace, draft, onDraftChange, onSubmit, mode, onToggleMode, isCollapsed, onToggleCollapse }) {
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

        <div className="composer-card">
          <textarea
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder={workspace.heroDescription}
          />

          <div className="composer-card__footer">
            <div className="composer-card__actions">
              <button className="composer-button composer-button--primary">
                <HiOutlineFolderPlus size={16} />
                <span>Create project</span>
              </button>
              <button className="composer-button" aria-label="Edit prompt">
                <HiOutlinePencilSquare size={16} />
              </button>
              <button className="composer-button" aria-label="Add media">
                <HiOutlinePhoto size={16} />
              </button>
            </div>

            <div className="composer-card__meta">
              <span>SOLO Auto Model</span>
              <button className="composer-submit" onClick={onSubmit}>
                <HiOutlineArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>

        {workspace.accent === 'green' && (
          <div className="composer-bottom-bar">
            <div className="composer-bottom-bar__group">
              <button className="composer-bottom-bar__item">
                <FaGithub size={14} />
                <span>Select repo</span>
                <HiOutlineChevronDown size={12} />
              </button>
              <button className="composer-bottom-bar__item">
                <BiGitBranch size={14} />
                <span>Select branch</span>
              </button>
            </div>
            <button className="composer-bottom-bar__item">
              <HiOutlineInbox size={14} />
              <span>Default Env</span>
              <HiOutlineChevronDown size={12} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
