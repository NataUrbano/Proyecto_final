export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    lastLogin?: Date;
    createdAt: Date;
  }
  
  export type UserRole = 'ADMIN' | 'USER' | 'LIBRARIAN';
  export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  
  export interface UserFilters {
    search?: string;
    role?: UserRole;
    status?: UserStatus;
  }
  