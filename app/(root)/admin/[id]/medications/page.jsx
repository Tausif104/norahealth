import { MedicationTable } from './_components/medication-table'
import { getMedicationByUserId } from '@/actions/medication.action'

const MedicationPage = async ({ params }) => {
  const { id } = await params
  const medications = await getMedicationByUserId(id)

  return (
    <>
      <MedicationTable medications={medications?.medication} userId={id} />
    </>
  )
}

export default MedicationPage
