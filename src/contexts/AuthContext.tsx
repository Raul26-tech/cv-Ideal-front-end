import { createContext, useCallback, useState, useMemo } from "react";
import { api } from "../services/api";
import Cookies from "js-cookie";

export type User = {
  name: string;
  email: string;
  password: string;
  cpf: string;
  status: string;
  phone: string;
};

export type UserResponse = {
  accessToken: string;
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  status: string;
  phone: string;
};

interface SignInProps {
  email: string;
  password: string;
}

interface AuthContextValues {
  user: UserResponse | null;
  signIn: (data: SignInProps) => void;
  signUp: (data: User) => void;
}

export const AuthContext = createContext<AuthContextValues>({
  user: null,
  signIn: () => {},
  signUp: () => {},
});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<UserResponse>(null);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async ({ email, password }: SignInProps) => {
    try {
      const response = await api.post("auth/sign-in", {
        email,
        password,
      });

      Cookies.set("accessToken", response.data.accessToken);

      setUser(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }, []);

  const signUp = useCallback(
    async (user: User) => {
      try {
        await api.post("auth/sign-up", {
          ...user,
        });

        // Antes de fazer login, o retorno da api de sign-up, o campo password
        // vem com hash, é necessário desfazer o hash para efetuar login

        await signIn({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    [signIn]
  );

  const values = useMemo(
    () => ({
      user,
      signIn,
      signUp,
    }),
    [signIn, signUp, user]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
