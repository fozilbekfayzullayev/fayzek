import { useState } from "react";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { useLogin } from "../hooks/useLogin";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import GoogleBtn from "./GoogleBtn";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useLogin();
  const { googleLogin } = useGoogleLogin();

  // EMAIL VALIDATION
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email kiritish shart";
    }
    if (!emailRegex.test(email)) {
      return "Email formati noto'g'ri";
    }
    return "";
  };

  // PASSWORD VALIDATION
  const validatePassword = (password) => {
    if (!password) {
      return "Parol kiritish shart";
    }
    if (password.length < 8) {
      return "Parol kamida 8 ta belgidan iborat bo'lishi kerak";
    }
  };

  // REAL-TIME VALIDATION
  const handleEmailBlur = () => {
    setTouched({ ...touched, email: true });
    setErrors({ ...errors, email: validateEmail(email) });
  };

  const handlePasswordBlur = () => {
    setTouched({ ...touched, password: true });
    setErrors({ ...errors, password: validatePassword(password) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
    });

    // If there are any errors, show toast and return
    if (emailError || passwordError) {
      toast.error("Iltimos, barcha maydonlarni to'g'ri to'ldiring");
      return;
    }

    // All validations passed
    login(email, password);
    setEmail("");
    setPassword("");
    setErrors({});
    setTouched({});
  };

  // Password visibility toggle (not fully implemented)
  const showPasswordToggler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container max-w-md mx-auto p-4 relative h-full shadow-lg md:shadow-none rounded-lg">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="px-8 pt-6 pb-8 mb-4 mt-12">
        <h2 className="text-4xl font-bold text-center font-poly mb-2">
          Kirish
        </h2>
        <p className="text-center mb-6 text-xs text-gray-light">
          Email va parol orqali tizimga kirish
        </p>
        {/* EMAIL INPUT */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-3 py-2 text-xs border rounded focus:outline-none ${
              touched.email && errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.email) {
                setErrors({ ...errors, email: validateEmail(e.target.value) });
              }
            }}
            onBlur={handleEmailBlur}
            placeholder="email@example.com"
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD INPUT */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="password"
          >
            Parol
          </label>
          <div
            className={`w-full flex items-center px-3 py-2 text-xs border rounded focus:outline-none ${
              touched.password && errors.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`w-full border-none focus:outline-none text-xs`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) {
                  setErrors({
                    ...errors,
                    password: validatePassword(e.target.value),
                  });
                }
              }}
              onBlur={handlePasswordBlur}
              placeholder="••••••••"
            />

            <button
              className="cursor-pointer opacity-70"
              onClick={showPasswordToggler}
              type="button"
            >
              {showPassword ? (
                <VisibilityOutlined fontSize="small" />
              ) : (
                <VisibilityOffOutlined fontSize="small" />
              )}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-black cursor-pointer text-white px-4 py-1 rounded font-medium text-sm hover:bg-stone-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Kirish
        </button>

        {/* GOOGLE LOGIN */}
        <GoogleBtn googleLogin={googleLogin} />
      </div>

      <p className="text-center text-gray-600 absolute bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-light">
        Hisobingiz yo'qmi?{" "}
        <Link
          to="/register"
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          Ro'yxatdan o'tish
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
