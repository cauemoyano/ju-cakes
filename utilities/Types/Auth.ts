export interface User {
  uid: string;
  email: string | null;
  name: string | null;
  admin: boolean;
  phone: string;
}

export interface AuthContextProps {
  user: User | null;
}
