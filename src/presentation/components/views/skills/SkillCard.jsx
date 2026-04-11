import { HiOutlinePlus } from 'react-icons/hi2'
import { ProviderMark } from './ProviderMark'

export function SkillCard({ skill }) {
  return (
    <article className="skill-card">
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
  )
}
