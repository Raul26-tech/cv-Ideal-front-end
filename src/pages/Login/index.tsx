import { useForm } from "react-hook-form";
import { loginFormSchema } from "./schemas/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "../../components/Layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import PasswordInput from "../../components/PasswordInput";
import { Button } from "../../components/ui/button";
import Logo from "../../assets/cv-Ideal.png";
import { useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { z } from "zod";

export default function Login() {
  const { signIn, user } = useAuth();

  console.log("User no login: ", user);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = useCallback(
    async (values: z.infer<typeof loginFormSchema>) => {
      try {
        await Promise.all([
          await signIn({
            email: values.email,
            password: values.password,
          }),
        ]);
      } catch (error) {
        console.log(error);
      }
    },
    [signIn]
  );
  return (
    <Layout className="bg-linear-to-b from-[#A8D5BA]/80 to-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col p-6 rounded-4xl justify-start items-center border-[1px] border-gray-200 shadow-lg bg-white backdrop-grayscale-0"
        >
          <div className="w-full flex flex-col justify-center items-center p-1">
            <span className="text-lg font-semibold">
              Sejá bem-vindo(a) ao Cv-Ideal
            </span>
            <img src={Logo} alt="Logo" width={100} />
          </div>
          <div className="md:w-[25rem] w-[90%] flex flex-col space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Digite o E-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex pt-3">
            <Button className="w-full cursor-pointer" type="submit">
              Enviar
            </Button>
          </div>
        </form>
      </Form>
    </Layout>
  );
}
