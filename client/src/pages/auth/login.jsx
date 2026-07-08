import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message || "Logged in successfully!",
        });
      } else {
        toast({
          title: data?.payload?.message || "Login failed. Please check your credentials or connection.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 relative overflow-hidden px-4">
      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600 rounded-full filter blur-[120px] opacity-25 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/50 p-8 space-y-6 z-10 transition-all duration-300 hover:shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-2">
            <img src="/logo.png" alt="VastraKart Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors"
              to="/register"
            >
              Sign Up
            </Link>
          </p>
        </div>
        <div className="mt-8">
          <CommonForm
            formControls={loginFormControls}
            buttonText={"Sign In"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;
