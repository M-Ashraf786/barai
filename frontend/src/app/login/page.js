"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "@/service/user.service";
const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const registerSchema = yup.object().shape({
    username: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
    caste: yup.string(),
    subgroup: yup.string(),
    country: yup.string(),
    city: yup.string(),
  });

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  });

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLoginForm,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUpForm,
    formState: { errors: errorsSignUp },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmitRegister = async (data) => {
    try {
      const result = await registerUser(data);
      if (result?.status === "success") {
        router.push("/");
      }
      toast.success("User register successfully");
    } catch (error) {
      console.error(error);
      toast.error("email already exist");
    } finally {
      setIsLoading(false);
    }
  };

  //reset the form
  useEffect(() => {
    resetLoginForm();
    resetSignUpForm();
  }, [resetLoginForm, resetSignUpForm]);

  const onSubmitLogin = async (data) => {
    try {
      const result = await loginUser(data);

      if (result?.status === "success") {
        router.push("/");
      }
      toast.success("Login successfull");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md dark:text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              <span>BARAI</span>
            </CardTitle>
            <CardDescription className="text-center">
              {/* Connect with frineds and the world around you on barai */}

              <p className="font-semibold">
                The app is dedicated to all Kutchi communities,
              </p>
              <p className="font-semibold">
                especially{" "}
                <span className="font-extrabold text-[#002765]">Loharwada</span>
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loginEmail">Email</Label>
                      <Input
                        id="loginEmail"
                        name="email"
                        type="email"
                        {...registerLogin("email")}
                        placeholder="Enter your email"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsLogin.email && (
                        <p className="text-red-500">
                          {errorsLogin.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loginPassword">Password</Label>
                      <Input
                        id="loginPassword"
                        name="password"
                        type="password"
                        {...registerLogin("password")}
                        placeholder="Enter your Password"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsLogin.password && (
                        <p className="text-red-500">
                          {errorsLogin.password.message}
                        </p>
                      )}
                    </div>
                    <Button className="w-full" type="submit">
                      <LogIn className="mr-2 w-4 h-4" /> Log in
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSubmitSignUp(onSubmitRegister)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signupName">Username</Label>
                      <Input
                        id="signupName"
                        name="username"
                        type="text"
                        {...registerSignUp("username")}
                        placeholder="Enter your username"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsSignUp.username && (
                        <p className="text-red-500">
                          {errorsSignUp.username.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <Input
                        id="signupEmail"
                        name="email"
                        type="email"
                        {...registerSignUp("email")}
                        placeholder="Enter your email"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsSignUp.email && (
                        <p className="text-red-500">
                          {errorsSignUp.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <Input
                        id="signPassword"
                        name="password"
                        type="password"
                        {...registerSignUp("password")}
                        placeholder="Enter your Password"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsSignUp.password && (
                        <p className="text-red-500">
                          {errorsSignUp.password.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupCaste">Caste</Label>
                      <Input
                        id="signupCaste"
                        name="caste"
                        type="text"
                        {...registerSignUp("caste")}
                        placeholder="e.g Barai"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsSignUp.caste && (
                        <p className="text-red-500">
                          {errorsSignUp.caste.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupSubgroup">Subgroup</Label>
                      <Input
                        id="signupSubgroup"
                        name="subgroup"
                        type="text"
                        {...registerSignUp("subgroup")}
                        placeholder="e.g Dukka"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsSignUp.subgroup && (
                        <p className="text-red-500">
                          {errorsSignUp.subgroup.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupCountry">Country</Label>
                      <Input
                        id="signupCountry"
                        name="country"
                        type="text"
                        {...registerSignUp("country")}
                        placeholder="Enter your country"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsSignUp.country && (
                        <p className="text-red-500">
                          {errorsSignUp.coutry.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupCountry">City</Label>
                      <Input
                        id="signupCity"
                        name="city"
                        type="text"
                        {...registerSignUp("city")}
                        placeholder="Enter your city"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsSignUp.city && (
                        <p className="text-red-500">
                          {errorsSignUp.city.message}
                        </p>
                      )}
                    </div>

                    <Button className="w-full" type="submit">
                      <LogIn className="mr-2 w-4 h-4" /> Sign Up
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4"></CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
