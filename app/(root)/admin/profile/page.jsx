import React from "react";
import { redirect } from "next/navigation";
import Profile from "@/app/(root)/profile/_components/profile";
import { getUserAccount } from "@/actions/account.action";

export const metadata = {
  title: "Admin Profile",
  description: "Free Oral Contraception, Delivered to Your Door",
};

const page = async () => {
  const account = await getUserAccount();

  if (!account?.account) {
    redirect("/account");
  }

  return <Profile account={account.account} />;
};

export default page;
