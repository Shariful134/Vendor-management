export const USER_ROLE = {
  Admin: "Admin",
  Vendor: "Vendor",
  Customer: "Customer",
} as const;

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

