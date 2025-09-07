"use client";

import Link from "next/link";
import { useState } from "react";
import { registerSchema, type RegisterFormData } from "@/lib/validation";
import axios from "axios";

export default function SignupForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<RegisterFormData>({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("formData", formData);
    const validationResult = registerSchema.safeParse(formData);
    if (!validationResult.success) {
      console.log("validationResult", validationResult.error.flatten().fieldErrors);
      setErrors(validationResult.error.flatten().fieldErrors as unknown as RegisterFormData);
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
      fullName: "",
      phone: "",
      address: "",
    });
    axios.post("http://localhost:3000/auth/signup", formData)
      .then((res: any) => {
        console.log("res", res);
        console.log("Registration successful");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("name of the input", name);
    setFormData({ ...formData, [name]: value });
  }
  
  return (
    <div className="w-1/4 min-h-[400px] bg-white border border-indigo-500 rounded-lg shadow-md p-8 flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-center border-b border-indigo-500/50 pb-4 mb-8"> 
        <h1 className="text-2xl font-bold text-indigo-800">
          Register
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500">{errors.fullName[0]}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email[0]}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone[0]}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.address && (
            <p className="text-xs text-red-500">{errors.address[0]}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
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
            <p className="text-xs text-red-500">{errors.password[0]}</p>
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
          {isSubmitting ? "Processing..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}