import { useForm } from "react-hook-form";
import { loginFormSchema } from "./schemas/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center p-2">
      <div className="w-[20rem] h-[20rem] flex flex-col p-2 rounded-4xl justify-center items-center bg-red-200 space-y-3">
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Password" />
      </div>
    </div>
  );
}
