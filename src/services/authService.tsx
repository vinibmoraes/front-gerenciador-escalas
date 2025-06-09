import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const loginWithGoogle = async (
  useGoogleLogin: string,
  email: string
) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      Email: email,
      Senha: null,
      TokenExterno: useGoogleLogin,
      AuthType: 2,
    });

    if (response.data?.Sucesso) {
      const { AuthToken, RefreshToken } = response.data.Dados;
      localStorage.setItem("authToken", AuthToken);
      localStorage.setItem("refreshToken", RefreshToken);
      return true;
    } else {
      throw new Error(response.data?.Mensagem || "Erro no login");
    }
  } catch (error) {
    console.error("Erro ao fazer login com Google:", error);
    return false;
  }
};
