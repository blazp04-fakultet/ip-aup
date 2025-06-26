import type { RegisterRequestDto } from "@/models/dto/authDto";
import { login, register } from "@/repositories/authRepository";
import router from "@/router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  const signIn = async (email: string, password: string) => {
    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
      router.push("/home");
    } catch (error) {
      alert(error);
    }
  };

  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const params: RegisterRequestDto = {
        firstName,
        lastName,
        email,
        password,
      };
      const data = await register(params);
      localStorage.setItem("token", data.token);
      router.push("/home");
    } catch (error) {
      alert(error);
    }
  };
  return { signIn, signUp };
});
