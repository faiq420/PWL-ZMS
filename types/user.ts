export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt?: string;
  lastLogin?: string;
  avatar?: string;
  phone?: string;
  ImagePath?: string; // For profile picture
  address?: string;
  // Role-specific fields
  assignedZoos?: string[]; // For zoo incharge and veterinary doctor
  specialization?: string; // For veterinary doctor
  licenseNumber?: string; // For veterinary doctor
  department?: string; // For admin and zoo incharge
  permissions?: Permission[];
  activityLog?: ActivityLogEntry[]; // User activity log
}

export interface ActivityLogEntry {
  id?: string;
  Title: string;
  Message: string;
  CreatedAt: string;
  IpAddress: string;
  Type: "Login" | "CRUD";
}

export type UserRole =
  | "admin"
  | "zoo_incharge"
  | "veterinary_doctor"
  | "citizen";

export type UserStatus = "active" | "inactive" | "suspended" | "pending";

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export interface Zoo {
  id: string;
  name: string;
  location: string;
  city: string;
  value?: number;
  label?: string | number;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  usersByRole: Record<UserRole, number>;
  recentRegistrations: number;
}
