export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  isActive?: boolean;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}
