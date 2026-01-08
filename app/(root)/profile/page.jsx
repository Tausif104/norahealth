import React from "react";
import Profile from "./_components/profile";
import { getUserAccount } from "@/actions/account.action";
import { redirect } from "next/navigation";
import { getUserHealth } from "@/actions/health.action";
export const metadata = {
  title: "Profile",
  description: "Free Oral Contraception, Delivered to Your Door",
};
const page = async () => {
  const account = await getUserAccount();
  // console.log(account, "profile page");

  if (!account?.account) {
    redirect("/account");
  }

  return (
    <>
      {" "}
      <Profile account={account?.account} />
    </>
  );
};

export default page;
