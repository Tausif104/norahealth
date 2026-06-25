"use server";

import { revalidatePath } from "next/cache";
import { loggedInUserAction } from "./user.action";
import { prisma } from "@/lib/client/prisma";
import { getAdminUser } from "./admin.action";

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const parseDateInput = (value) => {
  if (!value) return null;

  const input = value instanceof Date ? value.toISOString() : value.toString().trim();
  if (!input) return null;

  if (DATE_ONLY_PATTERN.test(input)) {
    const [year, month, day] = input.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day, 12));
  }

  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Date(
    Date.UTC(parsed.getUTCFullYear(), parsed.getUTCMonth(), parsed.getUTCDate(), 12)
  );
};

// create account action
export const createAccountAction = async (prevState, formData) => {
  const firstname = formData.get("firstname")?.toString() || "";
  const lastname = formData.get("lastname")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";
  const secondemail = formData.get("secondemail")?.toString() || "";
  const dob = parseDateInput(formData.get("dob")) ?? undefined;
  const nhs = formData.get("nhs")?.toString() || "";
  const address = formData.get("address")?.toString() || "";
  const zip = formData.get("zip")?.toString() || "";
  const deliveryAddress = formData.get("deliveryAddress")?.toString() || "";
  const deliveryZip = formData.get("deliveryZip")?.toString() || "";

  if (
    !firstname ||
    !lastname ||
    !phone ||
    !secondemail ||
    !dob ||
    !address ||
    !zip ||
    !deliveryAddress ||
    !deliveryZip
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
      deliveryZipCode: deliveryZip,
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
      deliveryZipCode: deliveryZip,
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
export const updateAccountByAdmin = async (prevState, formData) => {
  const userId = Number(formData.get("userId"));
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const dobValue = formData.get("dob");
  const dob = parseDateInput(dobValue);
  const phoneNumber = formData.get("phoneNumber");
  const nhsNumber = formData.get("nhsNumber");
  const address = formData.get("address");
  const zipCode = formData.get("zipCode");
  const deliveryAddress = formData.get("deliveryAddress");
  const user = await getAdminUser();

  const isAdmin = user?.admin?.isAdmin || false;

  if (!isAdmin) {
    return { success: false, message: "Unauthorized. User is not admin" };
  }

  if (!firstName || !lastName || !dob || Number.isNaN(dob.getTime()) || !phoneNumber) {
    return {
      msg: "Please insert all the fields",
      success: false,
    };
  }

  const updatedAccount = await prisma.account.update({
    where: { userId: userId },
    data: {
      firstName,
      lastName,
      dob,
      phoneNumber,
      nhsNumber,
      address,
      zipCode,
      deliveryAddress,
    },
  });

  revalidatePath(`/admin/${userId}/account`);

  if (updatedAccount) {
    return {
      msg: "Account Updated",
      success: true,
    };

  }
};

export const getUserAccountInfobyid = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: {
      id: true,
      email: true,
      account: {
        select: {
          firstName: true,
          lastName: true,
          phoneNumber: true,
          secondEmail: true,
          dob: true,
          nhsNumber: true,
          address: true,
          zipCode: true,
          profileImage: true,
          deliveryAddress: true,
        }
      }
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  return {
    success: true,
    user: user,
  };
};

// update account
export const updateAccountAction = async (prevState, formData) => {
  const payload = await loggedInUserAction()

  if (!payload?.payload?.email) {
    return {
      success: false,
      msg: 'User not found',
    }
  }

  const loggedInUserId = payload?.payload?.id

  const userId = formData.get('userId').toString()
  const firstname = formData.get('firstname')
  const lastName = formData.get('lastName')
  const email = formData.get('email')
  const phone = formData.get('phone')
  const dob = parseDateInput(formData.get('dob'))
  const nhs = formData.get('nhs')
  const address = formData.get('address')
  const zip = formData.get('zip')
  // const weight = formData.get('weight')
  // const height = formData.get('height')
  // const whdate = new Date(formData.get('whdate'))
  // const bptop = formData.get('bptop')
  // const bpbottom = formData.get('bpbottom')
  // const bpdate = new Date(formData.get('bpdate'))
  // const medicalconditions = formData.get('medicalconditions')
  // const currentmedicines = formData.get('currentmedicines')

  if (loggedInUserId.toString() !== userId) {
    return null
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
  })

  revalidatePath('/profile')

  if (updatedAcount) {
    return {
      msg: 'Account Updated!',
      success: true,
    }
  }
}

