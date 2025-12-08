import { MedicationTable } from './_components/medication-table'
import { getAllMedicationsAction } from '@/actions/medication.action'

const MedicationPage = async () => {
  const medications = await getAllMedicationsAction()

  return (
    <>
      <MedicationTable medications={medications?.medications} />
    </>
  )
}

export default MedicationPage
