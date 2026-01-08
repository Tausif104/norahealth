import HealthProfileForm from "./_components/healthProfileForm";
import { getUserHealth } from "@/actions/health.action";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Health Profile",
  description: "Free Oral Contraception, Delivered to Your Door",
};
const HealthProfile = async () => {
  const health = await getUserHealth();

  if (!health?.health) {
    redirect("/health");
  }

  return (
    <>
      <HealthProfileForm health={health?.health} />
    </>
  );
};

export default HealthProfile;
