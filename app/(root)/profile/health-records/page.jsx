import { RecordTable } from "./_components/record-table";
import { getAllRecordsAction } from "@/actions/record.action";
export const metadata = {
  title: "Health Records",
  description: "Free Oral Contraception, Delivered to Your Door",
};
const page = async () => {
  const records = await getAllRecordsAction();

  return (
    <>
      <RecordTable record={records?.records} />
    </>
  );
};

export default page;
