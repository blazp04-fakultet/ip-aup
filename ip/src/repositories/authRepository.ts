import apiConfig from "./client";
import type {
  AuthResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
} from "@/models/dto/authDto";

export async function login(params: LoginRequestDto): Promise<AuthResponseDto> {
  const response = await apiConfig.post("/auth/login", params);
  const data = await response.data.data;

  const loginData: AuthResponseDto = data;
  return loginData;
}

export async function register(
  params: RegisterRequestDto
): Promise<AuthResponseDto> {
  const response = await apiConfig.post("/auth/register", params);
  const data = await response.data.data;

  const registerData: AuthResponseDto = data;
  return registerData;
}
