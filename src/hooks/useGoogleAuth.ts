import { authService } from "../services/authService";

export const useGoogleAuth = () => {
  const handleLogin = async (credentialResponse: any) => {
    const accessToken = credentialResponse?.credential;
    if (!accessToken) {
      console.error("Google login failed: No credential returned.");
      return;
    }

    try {
      const success = await authService.loginWithGoogle(accessToken);
      if (success) {
        console.log("Login com Google realizado com sucesso!");
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleError = () => {
    console.error("Google login failed: An error occurred in the Google flow.");
  };

  return {
    handleLogin,
    handleError,
  };
};
