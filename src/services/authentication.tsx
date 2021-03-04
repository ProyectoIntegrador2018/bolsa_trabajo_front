import { auth, generateUserDocument } from '../firebase';
import { UserType } from '../model/Users';

export const authenticationService = {
  login,
  logout,
  register,
};

export interface LoginData {
  email: string,
  password: string,
};

export interface RegisterData extends LoginData {
  name: string,
  type: UserType,
};

async function register(data: RegisterData) {
  let {name, email, password, type} = data;
  let { user } = await auth.createUserWithEmailAndPassword(email, password);
  return generateUserDocument(user, {name, type});
}

async function login(data: LoginData) {
  let {email, password} = data;
  return auth.signInWithEmailAndPassword(email, password);
}

async function logout() {
  return auth.signOut();
}