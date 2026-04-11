import { HiOutlineArrowUp, HiOutlineHome, HiOutlinePaperClip } from 'react-icons/hi2';

export function TaskComposer() {
  return (
    <div className="task-composer">
      <textarea placeholder="Help you organize literature reviews, create PPTs, analyze Excel data and other daily work, output professional deliverables." />
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
          <span>SOLO Auto Model</span>
          <button className="composer-submit">
            <HiOutlineArrowUp size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
