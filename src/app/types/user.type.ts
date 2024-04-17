import { AuthResponse, AuthResponsePassword, AuthTokenResponsePassword, Session, User, WeakPassword } from "@supabase/supabase-js"

export type  SupabaseAuthResponse = AuthResponse | AuthResponsePassword | AuthTokenResponsePassword;
export type  SupabaseLoginResponse  = AuthResponse;

export interface UserLogin {
  email: string
  password: string
};

export interface UserRegister {
  email: string
  password: string
};

export interface AuthDetails {
  user: User
  session: Session
  weakPassword?: WeakPassword | undefined
}