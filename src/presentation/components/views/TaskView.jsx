import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { TaskMain } from './TaskView/TaskMain';
import { TaskSidepanel } from './TaskView/TaskSidepanel';
import { TaskHeader } from './TaskView/components/TaskHeader';

const MOBILE_MEDIA_QUERY = '(max-width: 1024px)';

function subscribeToMobileQuery(onStoreChange) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
  const handler = () => onStoreChange();

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }

  mediaQuery.addListener(handler);
  return () => mediaQuery.removeListener(handler);
}

function getMobileSnapshot() {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

function getSidepanelPopoverPosition(triggerElement) {
  if (!triggerElement || typeof window === 'undefined') {
    return { top: 52, left: 12 };
  }

  const panelWidth = 320;
  const viewportPadding = 8;
  const triggerRect = triggerElement.getBoundingClientRect();
  const top = Math.round(triggerRect.bottom + 6);
  const maxLeft = window.innerWidth - panelWidth - viewportPadding;
  const rawLeft = Math.round(triggerRect.right - panelWidth);
  const left = Math.max(viewportPadding, Math.min(rawLeft, maxLeft));

  return { top, left };
}

export function TaskView({ project, mode, onToggleMode, isCollapsed, onToggleCollapse }) {
  const [isSidepanelCollapsed, setIsSidepanelCollapsed] = useState(false);
  const [isMobileSidepanelOpen, setIsMobileSidepanelOpen] = useState(false);
  const [mobilePopoverPosition, setMobilePopoverPosition] = useState({ top: 52, left: 12 });
  const sidepanelTriggerRef = useRef(null);
  const mobilePopoverRef = useRef(null);
  const hoverOpenedRef = useRef(false);
  const hoverCloseTimeoutRef = useRef(null);
  const isMobileViewport = useSyncExternalStore(
    subscribeToMobileQuery,
    getMobileSnapshot,
    () => false
  );

  const clearHoverCloseTimeout = useCallback(() => {
    if (hoverCloseTimeoutRef.current) {
      clearTimeout(hoverCloseTimeoutRef.current);
      hoverCloseTimeoutRef.current = null;
    }
  }, []);

  const closeMobileSidepanel = useCallback(() => {
    clearHoverCloseTimeout();
    hoverOpenedRef.current = false;
    setIsMobileSidepanelOpen(false);
  }, [clearHoverCloseTimeout]);

  const openMobileSidepanel = useCallback(
    (source = 'click') => {
      if (!isMobileViewport) {
        return;
      }

      clearHoverCloseTimeout();
      hoverOpenedRef.current = source === 'hover';
      setMobilePopoverPosition(getSidepanelPopoverPosition(sidepanelTriggerRef.current));
      setIsMobileSidepanelOpen(true);
    },
    [clearHoverCloseTimeout, isMobileViewport]
  );

  const scheduleHoverClose = useCallback(() => {
    if (!hoverOpenedRef.current) {
      return;
    }

    clearHoverCloseTimeout();
    hoverCloseTimeoutRef.current = setTimeout(() => {
      closeMobileSidepanel();
    }, 130);
  }, [clearHoverCloseTimeout, closeMobileSidepanel]);

  useEffect(() => () => clearHoverCloseTimeout(), [clearHoverCloseTimeout]);

  useEffect(() => {
    if (!isMobileViewport || !isMobileSidepanelOpen) {
      return undefined;
    }

    const updatePosition = () => {
      setMobilePopoverPosition(getSidepanelPopoverPosition(sidepanelTriggerRef.current));
    };

    const closeOnOutsideClick = (event) => {
      const target = event.target;
      if (mobilePopoverRef.current?.contains(target)) {
        return;
      }
      if (sidepanelTriggerRef.current?.contains(target)) {
        return;
      }
      closeMobileSidepanel();
    };

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        closeMobileSidepanel();
      }
    };

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [closeMobileSidepanel, isMobileViewport, isMobileSidepanelOpen]);

  const toggleSidepanel = () => {
    if (isMobileViewport) {
      if (isMobileSidepanelOpen) {
        closeMobileSidepanel();
      } else {
        openMobileSidepanel('click');
      }
      return;
    }

    setIsSidepanelCollapsed((prev) => !prev);
  };

  const isSidepanelOpen = isMobileViewport ? isMobileSidepanelOpen : !isSidepanelCollapsed;

  return (
    <section className={`task-layout ${isSidepanelCollapsed ? 'task-layout--sidepanel-collapsed' : ''}`}>
      <TaskHeader
        project={project}
        mode={mode}
        onToggleMode={onToggleMode}
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
        onToggleSidepanel={toggleSidepanel}
        isSidepanelOpen={isSidepanelOpen}
        sidepanelTriggerRef={sidepanelTriggerRef}
        onSidepanelTriggerMouseEnter={() => openMobileSidepanel('hover')}
        onSidepanelTriggerMouseLeave={scheduleHoverClose}
        onSidepanelTriggerFocus={() => openMobileSidepanel('hover')}
      />

      <TaskMain
        project={project}
      />

      {!isMobileViewport && !isSidepanelCollapsed && (
        <div className="task-sidepanel-container container-ihs1TM">
          <TaskSidepanel project={project} mode={mode} />
        </div>
      )}

      {isMobileViewport && (
        <div
          ref={mobilePopoverRef}
          className={`task-sidepanel-popover portal-Infc1v ${
            isMobileSidepanelOpen ? 'visible-I7uW2G' : ''
          }`}
          data-side="bottom"
          role="dialog"
          style={{
            top: `${mobilePopoverPosition.top}px`,
            left: `${mobilePopoverPosition.left}px`,
            visibility: isMobileSidepanelOpen ? 'visible' : 'hidden',
          }}
          onMouseEnter={clearHoverCloseTimeout}
          onMouseLeave={scheduleHoverClose}
        >
          <div className="task-sidepanel-popover__content content-hwV3g5">
            <div className="task-sidepanel-container container-ihs1TM floating-lMYO0R">
              <TaskSidepanel project={project} mode={mode} floating />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
