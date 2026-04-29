export enum UserType {
  User = 1,
  Admin = 2,
}

export interface UserCreateDTO {
  username: string;
  email: string;
  password: string;
  campusId: number;
  registration: string;
}
export interface UserDTO {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  userType: UserType;
  campusId: number;
  registration: string;
}

export interface UserLoginDTO {
  userId: number | null;
  email: string | null;
  password: string | null;
}
export interface ConsultUserDTO {
  email: string | null;
  registration: string | null;
}
