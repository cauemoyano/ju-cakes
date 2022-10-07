export interface User {
  uid: string;
  email: string;
  name: string;
  admin: boolean;
  phone: string;
}

export interface AuthContextProps {
  user: User | null;
}
