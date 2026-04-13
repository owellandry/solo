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
import { useTranslation } from 'react-i18next'

export function ComposerCard({ draft, onDraftChange, onSubmit, workspace, themeMode }) {
  const { t } = useTranslation();
  const heroDescription = t(`workspace.${themeMode}.heroDescription`);

  return (
    <>
      <div className="composer-card">
        <textarea
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder={heroDescription || t('composer.placeholder')}
        />

        <div className="composer-card__footer">
          <div className="composer-card__actions">
            <button className="composer-button composer-button--primary">
              <HiOutlineFolderPlus size={16} />
              <span>{t('composer.createProject')}</span>
            </button>
            <button className="composer-button" aria-label={t('composer.editPrompt')}>
              <HiOutlinePencilSquare size={16} />
            </button>
            <button className="composer-button" aria-label={t('composer.addMedia')}>
              <HiOutlinePhoto size={16} />
            </button>
          </div>

          <div className="composer-card__meta">
            <span>{t('composer.model')}</span>
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
              <span>{t('composer.selectRepo')}</span>
              <HiOutlineChevronDown size={12} />
            </button>
            <button className="composer-bottom-bar__item">
              <BiGitBranch size={14} />
              <span>{t('composer.selectBranch')}</span>
            </button>
          </div>
          <button className="composer-bottom-bar__item">
            <HiOutlineInbox size={14} />
            <span>{t('composer.defaultEnv')}</span>
            <HiOutlineChevronDown size={12} />
          </button>
        </div>
      )}
    </>
  )
}
