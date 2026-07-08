import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, ShoppingCart, Award } from "lucide-react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message || "Registration successful!",
        });
        navigate("/login");
      } else {
        toast({
          title: data?.payload?.message || "Registration failed. Please check your network or try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row bg-slate-50">
      {/* Left Banner Section (Vibrant Rose-Amber Gradient) */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-rose-500 to-amber-500 flex flex-col justify-between p-8 lg:p-16 text-white relative overflow-hidden">
        {/* Decorative backdrop shapes */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        
        {/* Brand/Logo Area */}
        <div className="z-10 flex items-center gap-2">
          <ShoppingCart className="w-8 h-8" />
          <span className="text-xl font-bold tracking-wider">ECOMMERCE</span>
        </div>

        {/* Hero Copy */}
        <div className="z-10 my-auto py-12 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Start Your Shopping Journey Today.
          </h2>
          <p className="text-lg text-white/90 max-w-md">
            Create an account to unlock member-only benefits, track your shipments, and save items to your wishlist.
          </p>

          {/* Key Selling Points */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/15 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Safe & Secure Transactions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/15 rounded-lg">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">100% Quality Guaranteed Products</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="z-10 text-xs text-white/70">
          © 2026 ECommerce Shopping. All rights reserved.
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Create New Account
            </h1>
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                className="font-semibold text-rose-500 hover:text-rose-600 hover:underline transition-colors"
                to="/login"
              >
                Sign In
              </Link>
            </p>
          </div>
          
          <div className="pt-4">
            <CommonForm
              formControls={registerFormControls}
              buttonText={"Sign Up"}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
