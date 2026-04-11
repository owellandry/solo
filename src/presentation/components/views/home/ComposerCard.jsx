import {
  HiOutlineArrowUp,
  HiOutlineFolderPlus,
  HiOutlinePencilSquare,
  HiOutlinePhoto,
  HiOutlineChevronDown,
  HiOutlineInbox,
} from 'react-icons/hi2'
import { FaGithub } from 'react-icons/fa6'
import { BiGitBranch } from 'react-icons/bi'

export function ComposerCard({ draft, onDraftChange, onSubmit, workspace }) {
  return (
    <>
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
    </>
  )
}
