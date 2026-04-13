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
import { useTranslation } from 'react-i18next'

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

export function FeatureCard({ item, themeMode }) {
  const { t } = useTranslation();
  const Icon = iconMap[item.icon] ?? HiOutlineSparkles
  const cardTitle = t(`workspace.${themeMode}.cards.${item.id}.title`);
  const cardDesc = t(`workspace.${themeMode}.cards.${item.id}.desc`);

  return (
    <article className="feature-card">
      <div className="feature-card__icon">
        <Icon size={22} />
      </div>
      <h3>{cardTitle}</h3>
      <p>{cardDesc}</p>
    </article>
  )
}
