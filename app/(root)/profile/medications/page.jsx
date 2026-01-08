import { MedicationTable } from "./_components/medication-table";
import { getAllMedicationsAction } from "@/actions/medication.action";

export const metadata = {
  title: "Medications",
  description: "Free Oral Contraception, Delivered to Your Door",
};
const MedicationPage = async () => {
  const medications = await getAllMedicationsAction();

  return (
    <>
      <MedicationTable medications={medications?.medications} />
    </>
  );
};

export default MedicationPage;
