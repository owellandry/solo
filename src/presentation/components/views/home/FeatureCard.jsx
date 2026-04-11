import {
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineCodeBracket,
  HiOutlineCog6Tooth,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineDocumentText,
  HiOutlinePresentationChartBar,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import { FaGamepad } from 'react-icons/fa6'

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

export function FeatureCard({ item }) {
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
