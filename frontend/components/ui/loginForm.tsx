"use client";

import Link from "next/link";
import { useState } from "react";
import { loginSchema, type LoginFormData } from "@/lib/validation";

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("formData", formData);
    const validationResult = loginSchema.safeParse(formData);
    if (!validationResult.success) {
      console.log("validationResult", validationResult.error.flatten().fieldErrors);
      setErrors(validationResult.error.flatten().fieldErrors as unknown as LoginFormData);
      setIsSubmitting(false);
      return;
    }
    else {
      console.log("Form data is valid");
      setIsSubmitting(false);
    }
    setErrors({
      email: "",
      password: "",
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  
  return (
    <div className="w-1/4 min-h-[400px] bg-white border border-indigo-500 rounded-lg shadow-md p-8 flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-center border-b border-indigo-500/50 pb-4 mb-8"> 
        <h1 className="text-2xl font-bold text-indigo-800">
          Login
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-4 py-2 px-4 rounded-md transition-colors duration-200 font-medium cursor-pointer ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          } text-white`}
        >
          {isSubmitting ? "Processing..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-indigo-600 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
