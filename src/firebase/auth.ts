import { auth } from "./config";
import { signInWithEmailAndPassword } from "firebase/auth";
type UserLogin = {
  email: string;
  password: string;
};
const authUser = async ({ email, password }: UserLogin) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export { authUser };
