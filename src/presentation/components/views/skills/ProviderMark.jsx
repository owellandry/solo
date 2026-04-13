import { FaGithub } from 'react-icons/fa6'
import { RiRobot2Line } from 'react-icons/ri'
import { SiOpenai, SiRedis, SiVercel } from 'react-icons/si'

export function ProviderMark({ type }) {
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
