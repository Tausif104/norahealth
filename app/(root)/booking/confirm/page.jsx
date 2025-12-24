import React from "react";
import ConfirmBooking from "./_components/confirm-booking";
import { loggedInUserDetailsAction } from "@/actions/user.action";

const page = async () => {
  const result = await loggedInUserDetailsAction();
  const userDetails = result?.userDetails ?? null;
  // console.log(userDetails, "confirm booking page");

  return (
    <>
      <ConfirmBooking userDetails={userDetails} />
    </>
  );
};

export default page;
