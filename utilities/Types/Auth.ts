export interface User {
  uid: string;
  email: string | null;
  name: string | null;
  admin: boolean;
}

export interface AuthContextProps {
  user: User | null;
}
