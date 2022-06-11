export interface User {
  uid: string;
  email: string | null;
  name: string | null;
}

export interface AuthContextProps {
  user: User | null;
}
