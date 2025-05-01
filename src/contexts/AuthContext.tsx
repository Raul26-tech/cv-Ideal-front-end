import {
  createContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";
import { api } from "../services/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
// import { useNavigate } from "react-router";

export type User = {
  id: string;
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

interface SignIn {
  email: string;
  password: string;
}

interface AuthContextValues {
  user: UserResponse | null;
  signIn: (data: SignIn) => Promise<void>;
  signUp: (data: User) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValues>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(
    async ({ email, password }: SignIn) => {
      console.log("Inicio da função");
      const response = await api.post<UserResponse>("/auth/sign-in", {
        email,
        password,
      });

      Cookies.set("accessToken", response.data.accessToken, {
        expires: 7,
      });

      setUser(response.data);
      navigate("/");
    },
    [navigate]
  );

  const signUp = useCallback(
    async (user: User) => {
      try {
        await api.post("auth/sign-up", {
          ...user,
        });

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

  const signOut = useCallback(async () => {
    Cookies.remove("accessToken");
    setUser(null);
    navigate("/login");
  }, [navigate]);

  // Função que persiste os dados do usuário quando o componente é montado
  const restoreToken = useCallback(async () => {
    try {
      const token = Cookies.get("accessToken");

      if (token && !user) {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    restoreToken();
  }, [restoreToken]);

  const values = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      signOut,
      loading,
    }),
    [loading, signIn, signOut, signUp, user]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
