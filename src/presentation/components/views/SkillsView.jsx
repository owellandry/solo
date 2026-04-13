import { useState } from 'react'
import { HiOutlineMagnifyingGlass, HiOutlinePlus } from 'react-icons/hi2'
import { useTranslation } from 'react-i18next'

import { useSkills } from './useSkills'
import { SidebarTop } from '../layout/sidebar/SidebarTop'
import { SkillCard } from './skills/SkillCard'

export function SkillsView({ mode, onToggleMode, isCollapsed, onToggleCollapse }) {
  const { t } = useTranslation();
  const { skills, categories } = useSkills()
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const query = search.trim().toLowerCase()
  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      activeCategory === 'All' || skill.category === activeCategory
    const matchesSearch =
      query.length === 0 ||
      skill.title.toLowerCase().includes(query) ||
      skill.description.toLowerCase().includes(query) ||
      skill.provider.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

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
        <button className="topbar__action topbar__action--dark">
          <HiOutlinePlus size={14} />
          <span>{t('skills.upload')}</span>
        </button>
      </header>

      <div className="skills-page">
        <div className="skills-page__heading">
          <div>
            <h2>{t('skills.title')}</h2>
            <p>{t('skills.desc')}</p>
          </div>

          <label className="searchbox">
            <HiOutlineMagnifyingGlass size={16} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t('skills.search')}
            />
          </label>
        </div>

        <div className="market-tabs">
          <button className="market-tabs__trigger is-active">{t('skills.marketplace')}</button>
        </div>

        <div className="pill-row">
          {categories.map((category) => (
            <button
              key={category}
              className={`pill ${category === activeCategory ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="skills-section-title">{t('skills.developerTools')}</div>

        <div className="skills-grid">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
