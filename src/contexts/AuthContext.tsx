import {
  createContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
  ReactNode,
} from "react";
import { api } from "../services/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

interface AuthProviderProps {
  children: ReactNode;
}

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
  user: User;
};

interface SignIn {
  email: string;
  password: string;
}

interface AuthContextValues {
  user: User | null;
  loading?: boolean;
  signIn: (data: SignIn) => Promise<void>;
  signUp: (data: User) => Promise<void>;
  signOut: () => void;
  navigateToHomePage: (userData: User) => void;
}

export const AuthContext = createContext<AuthContextValues>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  navigateToHomePage: async () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const navigateToHomePage = useCallback(async () => {
    navigate("/");
  }, [navigate]);

  const signIn = useCallback(async ({ email, password }: SignIn) => {
    const response = await api.post<UserResponse>("/auth/sign-in", {
      email,
      password,
    });

    Cookies.set("accessToken", response.data.accessToken, {
      expires: 7,
    });

    setUser(response.data.user);
  }, []);

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
        const response = await api.get<User>("/auth/me");
        setUser(response.data);
      }
    } catch (error) {
      setLoading(false);
      signOut();
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  }, [signOut, user]);

  useEffect(() => {
    restoreToken();
  }, [restoreToken]);

  const values = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      signOut,
      navigateToHomePage,
      loading,
    }),
    [loading, navigateToHomePage, signIn, signOut, signUp, user]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
