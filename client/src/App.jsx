import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function App() {
  const handleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;

      // OPTIONAL: Decode token just to see user info on frontend
      const googleUser = jwtDecode(idToken);
      console.log("Google User:", googleUser);

      // Send token to backend
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`,
        {
          token: idToken,
        }
      );

      // Save your custom JWT in localStorage
      localStorage.setItem("authToken", res.data.token);

      console.log("Logged in successfully!");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      Hellow world
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
}

export default App;
