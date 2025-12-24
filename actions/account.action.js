"use server";

import { revalidatePath } from "next/cache";
import { loggedInUserAction } from "./user.action";
import { prisma } from "@/lib/client/prisma";

// create account action
export const createAccountAction = async (prevState, formData) => {
  const firstname = formData.get("firstname")?.toString() || "";
  const lastname = formData.get("lastname")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";
  const secondemail = formData.get("secondemail")?.toString() || "";
  const dob = formData.get("dob") ? new Date(formData.get("dob")) : undefined;
  const nhs = formData.get("nhs")?.toString() || "";
  const address = formData.get("address")?.toString() || "";
  const zip = formData.get("zip")?.toString() || "";
  const deliveryAddress = formData.get("deliveryAddress")?.toString() || "";

  if (
    !firstname ||
    !lastname ||
    !phone ||
    !secondemail ||
    !dob ||
    !address ||
    !zip ||
    !deliveryAddress
  ) {
    return {
      success: false,
      msg: "Please insert all the fields",
    };
  }

  // getting the user from cookie
  const payload = await loggedInUserAction();

  // checking the user is logged in
  if (!payload?.payload?.email) {
    return {
      success: false,
      msg: "User not found",
    };
  }

  const user = payload?.payload;

  const account = await prisma.account.upsert({
    where: {
      userId: user.id,
    },

    update: {
      // personal
      firstName: firstname,
      lastName: lastname,
      phoneNumber: phone,
      secondEmail: secondemail,
      dob: dob,
      nhsNumber: nhs,
      address: address,
      zipCode: zip,
      deliveryAddress: deliveryAddress,
    },

    create: {
      userId: user.id,

      // personal
      firstName: firstname,
      lastName: lastname,
      phoneNumber: phone,
      secondEmail: secondemail,
      dob: dob,
      nhsNumber: nhs,
      address: address,
      zipCode: zip,
      deliveryAddress: deliveryAddress,
    },
  });

  if (account) {
    return {
      msg: "Account details saved successfullly!",
      success: true,
    };
  }
};

// fetch account of logged in user
export const getUserAccount = async () => {
  // getting the user from cookie
  const payload = await loggedInUserAction();

  // checking the user is logged in
  if (!payload?.payload?.email) {
    return {
      success: false,
      msg: "User not found",
    };
  }

  const user = payload?.payload;

  // fetch logged in user account
  const account = await prisma.account.findUnique({
    where: {
      userId: user.id,
    },
  });

  return {
    account,
  };
};

// update account
export const updateAccountAction = async (prevState, formData) => {
  const payload = await loggedInUserAction();

  if (!payload?.payload?.email) {
    return {
      success: false,
      msg: "User not found",
    };
  }

  const loggedInUserId = payload?.payload?.id;

  const userId = formData.get("userId").toString();
  const firstname = formData.get("firstname");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const dob = new Date(formData.get("dob"));
  const nhs = formData.get("nhs");
  const address = formData.get("address");
  const zip = formData.get("zip");
  const deliveryAddress = formData.get("deliveryAddress");
  // const weight = formData.get('weight')
  // const height = formData.get('height')
  // const whdate = new Date(formData.get('whdate'))
  // const bptop = formData.get('bptop')
  // const bpbottom = formData.get('bpbottom')
  // const bpdate = new Date(formData.get('bpdate'))
  // const medicalconditions = formData.get('medicalconditions')
  // const currentmedicines = formData.get('currentmedicines')

  if (loggedInUserId.toString() !== userId) {
    return null;
  }

  const updatedAcount = await prisma.account.upsert({
    where: {
      userId: loggedInUserId,
    },

    update: {
      // personal
      firstName: firstname,
      lastName: lastName,
      phoneNumber: phone,
      secondEmail: email,
      dob: dob,
      nhsNumber: nhs,
      address: address,
      zipCode: zip,
      deliveryAddress: deliveryAddress,

      // health
      // weight: weight,
      // height: height,
      // weightHeightCheckDate: whdate,
      // bpTop: bptop,
      // bpBottom: bpbottom,
      // bpCheckDate: bpdate,
      // medicalConditions: medicalconditions,
      // currentMedicines: currentmedicines,
    },

    create: {
      userId: loggedInUserId,
      // personal
      firstName: firstname,
      lastName: lastName,
      phoneNumber: phone,
      secondEmail: email,
      dob: dob,
      nhsNumber: nhs,
      address: address,
      zipCode: zip,
      deliveryAddress: deliveryAddress,

      // health
      // weight: weight,
      // height: height,
      // weightHeightCheckDate: whdate,
      // bpTop: bptop,
      // bpBottom: bpbottom,
      // bpCheckDate: bpdate,
      // medicalConditions: medicalconditions,
      // currentMedicines: currentmedicines,
    },
  });

  revalidatePath("/profile");

  if (updatedAcount) {
    return {
      msg: "Account Updated!",
      success: true,
    };
  }
};
