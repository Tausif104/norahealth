import { HistoryTable } from "./_components/history-table";
import { getAllHistoryAction } from "@/actions/history.action";
export const metadata = {
  title: "Medical History",
  description: "Free Oral Contraception, Delivered to Your Door",
};
const MedicalHistory = async () => {
  const history = await getAllHistoryAction();

  return (
    <>
      <HistoryTable history={history?.history} />
    </>
  );
};

export default MedicalHistory;
