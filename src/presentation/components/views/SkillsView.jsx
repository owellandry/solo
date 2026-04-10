import { useMemo, useState } from 'react'
import { HiOutlineMagnifyingGlass, HiOutlinePlus } from 'react-icons/hi2'
import { FaGithub } from 'react-icons/fa6'
import { RiRobot2Line } from 'react-icons/ri'
import { SiOpenai, SiRedis, SiVercel } from 'react-icons/si'

import { useSkills } from './useSkills'
import { SidebarTop } from '../layout/Sidebar'

function ProviderMark({ type }) {
  if (type === 'github') {
    return <FaGithub className="provider-mark provider-mark--github" size={24} />
  }

  if (type === 'vercel') {
    return <SiVercel className="provider-mark provider-mark--vercel" size={20} />
  }

  if (type === 'redis') {
    return <SiRedis className="provider-mark provider-mark--redis" size={20} />
  }

  if (type === 'openai') {
    return <SiOpenai className="provider-mark provider-mark--openai" size={20} />
  }

  return <RiRobot2Line className="provider-mark provider-mark--ai" size={22} />
}

export function SkillsView({ mode, onToggleMode, isCollapsed, onToggleCollapse }) {
  const { skills, categories } = useSkills()
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        activeCategory === 'All' || skill.category === activeCategory
      const query = search.trim().toLowerCase()
      const matchesSearch =
        query.length === 0 ||
        skill.title.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query) ||
        skill.provider.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search])

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
          <span>Upload Skill</span>
        </button>
      </header>

      <div className="skills-page">
        <div className="skills-page__heading">
          <div>
            <h2>Skills</h2>
            <p>Install and manage skills to unlock new capabilities for SOLO.</p>
          </div>

          <label className="searchbox">
            <HiOutlineMagnifyingGlass size={16} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search"
            />
          </label>
        </div>

        <div className="market-tabs">
          <button className="market-tabs__trigger is-active">Marketplace</button>
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

        <div className="skills-section-title">Developer Tools</div>

        <div className="skills-grid">
          {filteredSkills.map((skill) => (
            <article className="skill-card" key={skill.id}>
              <div className="skill-card__brand">
                <ProviderMark type={skill.icon} />
              </div>

              <div className="skill-card__body">
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <span>by {skill.provider}</span>
              </div>

              <button className="skill-card__action">
                <HiOutlinePlus size={16} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
