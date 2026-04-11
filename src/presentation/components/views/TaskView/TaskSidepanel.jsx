import {
  HiOutlineDocumentText,
  HiOutlineInformationCircle,
  HiOutlineListBullet,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';

const tabColorMap = {
  Skills: 'var(--accent, #6c63ff)',
  'Web Search': '#00b8f8',
  Files: 'color-mix(in srgb, #00b8f8 32%, transparent)',
  Other: 'color-mix(in srgb, #747e94 32%, transparent)',
};

function buildContextItems(project, activeTab) {
  if (activeTab === 'Skills') {
    return project.references.map((item) => ({ key: item, label: item, type: 'skill' }));
  }

  if (activeTab === 'Files') {
    const fromOutputs = project.taskOutputs.map((item) => ({ key: item, label: item, type: 'file' }));
    const fromSections =
      project.responseSections
        ?.flatMap((section) => section.bullets ?? [])
        .filter((item) => item.includes('/') || item.includes('.'))
        .slice(0, 6)
        .map((item) => ({ key: item, label: item, type: 'file' })) ?? [];

    return [...fromSections, ...fromOutputs].slice(0, 12);
  }

  if (activeTab === 'Web Search') {
    return [];
  }

  return project.taskOutputs.map((item) => ({ key: item, label: item, type: 'other' }));
}

export function TaskSidepanel({ project, mode, floating = false }) {
  const { t } = useTranslation();
  const tabs = useMemo(
    () => project.contextBreakdown.filter(([, value]) => value > 0),
    [project.contextBreakdown]
  );
  const [activeTab, setActiveTab] = useState(tabs[0]?.[0] ?? 'Skills');

  const totalValue = useMemo(
    () => project.contextBreakdown.reduce((acc, [, value]) => acc + value, 0),
    [project.contextBreakdown]
  );
  const usagePercent = Math.max(1, Math.min(99, Math.round(24 + totalValue * 3)));
  const contextItems = useMemo(() => buildContextItems(project, activeTab), [project, activeTab]);

  return (
    <div
      className={`context-status_sidebar context-status_sidebar--${mode} ${
        floating ? 'context-status_sidebar--floating' : ''
      }`}
      style={{ width: 320 }}
    >
      <div className="context-status_section context-status_section--progress">
        <div className="context-status_section-header">
          <span className="context-status_section-title">{t('task.sidepanel.todo')}</span>
        </div>

        <div className="context-status_section-content">
          <div className="context-status_empty-state">
            <div className="context-status_empty-state-icon">
              <HiOutlineListBullet size={16} />
            </div>
            <div className="context-status_empty-state-content">
              <div className="context-status_empty-state-title">No todos yet</div>
              <div className="context-status_empty-state-description">
                Progress for complex tasks will appear here
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="context-status_divider-wrapper">
        <hr className="context-status_divider" />
      </div>

      <div className="context-status_section context-status_section--context">
        <div className="context-status_section-header">
          <div className="context-status_section-header-left">
            <span className="context-status_section-title">{t('task.sidepanel.context')}</span>
            <span className="context-status_section-info-icon">
              <HiOutlineInformationCircle size={14} />
            </span>
          </div>
          <button className="context-status_section-compact-btn">
            {t('task.sidepanel.compact')}
          </button>
        </div>

        <div className="context-status_section-content">
          <div className="context-status_context-panel">
            <div className="context-status_usage-bar">
              <div className="context-status_usage-bar-track">
                {tabs.map(([label, value]) => (
                  <div
                    key={label}
                    className="context-status_usage-bar-segment"
                    style={{
                      width: `${(value / totalValue) * usagePercent}%`,
                      backgroundColor: tabColorMap[label] ?? 'color-mix(in srgb, #747e94 32%, transparent)',
                    }}
                  />
                ))}
              </div>
              <span className="context-status_usage-bar-percent">{usagePercent}%</span>
            </div>

            <div className="context-status_tabs-wrapper">
              <div className="context-status_tabs">
                {tabs.map(([label]) => (
                  <button
                    key={label}
                    className={`context-status_tab ${activeTab === label ? 'context-status_tab--active' : ''}`}
                    onClick={() => setActiveTab(label)}
                  >
                    <span
                      className="context-status_tab-indicator"
                      style={{
                        backgroundColor: tabColorMap[label] ?? 'color-mix(in srgb, #747e94 32%, transparent)',
                      }}
                    />
                    <span className="context-status_tab-label">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="context-status_context-content-wrapper">
              <div className="context-status_context-panel-content">
                <div className="context-status_context-list">
                  {contextItems.map((item) => (
                    <button
                      key={item.key}
                      className="context-status_context-item context-status_context-item--hoverable context-status_context-item--clickable"
                    >
                      <span
                        className={`context-status_context-item-icon ${
                          item.type === 'skill'
                            ? 'context-status_context-item-icon--skill'
                            : 'context-status_context-item-icon--file'
                        }`}
                      >
                        {item.type === 'skill' ? (
                          <HiOutlineSparkles size={14} />
                        ) : (
                          <HiOutlineDocumentText size={14} />
                        )}
                      </span>
                      <span className="context-status_context-item-name">{item.label}</span>
                    </button>
                  ))}

                  {contextItems.length === 0 && (
                    <div className="context-status_context-empty">No items for this tab</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
