export const RoleRank = {
  PATIENT: 1,
  AUTHOR: 2,
  ADMIN: 3,
  SUPERADMIN: 4,
};

export const formatRole = (role) =>
  role
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
