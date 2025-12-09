import HealthProfileForm from './_components/healthProfileForm'
import { getUserHealth } from '@/actions/health.action'
import { redirect } from 'next/navigation'

const HealthProfile = async () => {
  const health = await getUserHealth()

  if (!health?.health) {
    redirect('/health')
  }

  return (
    <>
      <HealthProfileForm health={health?.health} />
    </>
  )
}

export default HealthProfile
