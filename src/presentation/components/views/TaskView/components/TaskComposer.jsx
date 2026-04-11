import { HiOutlineArrowUp, HiOutlineHome, HiOutlinePaperClip } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';

export function TaskComposer() {
  const { t } = useTranslation();
  return (
    <div className="task-composer">
      <textarea placeholder={t('composer.placeholder')} />
      <div className="task-composer__footer">
        <div className="task-composer__left">
          <button className="composer-button" aria-label="Home">
            <HiOutlineHome size={15} />
          </button>
          <button className="composer-button" aria-label="Attach file">
            <HiOutlinePaperClip size={15} />
          </button>
        </div>
        <div className="task-composer__right">
          <span>{t('composer.model')}</span>
          <button className="composer-submit">
            <HiOutlineArrowUp size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
