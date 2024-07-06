import AuthenticationCard from "../components/AuthenticationCard";
import Head from "next/head";
import React from "react";
import { FormEvent, useState } from "react";
import { useCreateUser } from "@/lib/hooks/user";
import { signIn } from "next-auth/react";
import SocialLogin from "../components/SocialLogin";
import { Input, Label, Checkbox, InputError } from "@/components/Form";
import Link from "next/link";

//Styles
import loginSignUpStyle from "../styles/pages/LoginSignUp.module.scss";
import DOMPurify from "dompurify";


function SignUp() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { trigger: createUser } = useCreateUser();
  const [error, setError] = useState("");

  async function signUpUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (password !== passwordConfirmation.trim()) {
      // toast.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    try {
      await createUser({
        data: {
          name: trimmedName,
          lastName: trimmedLastName,
          email: trimmedEmail,
          password: trimmedPassword,
        },
      });
    } catch (error: unknown) {
      console.error(error);
      if (typeof error === "object" && error !== null && "info" in error) {
        const info = (error as { info?: { prisma?: boolean; code?: string } })
          .info;
        if (info?.prisma === true) {
          if (info.code === "P2002") {
            setError("This user already exists");
          } else {
            setError("Unexpected error");
          }
        } else {
          setError("Unexpected error");
        }
      }
      return;
    }
    const cleanConfig = { ALLOWED_TAGS: [] };
    const sanitizedName = DOMPurify.sanitize(trimmedName, cleanConfig);
    const sanitizedLastName = DOMPurify.sanitize(trimmedLastName, cleanConfig);
    const sanitizedEmail = DOMPurify.sanitize(trimmedEmail, cleanConfig);
    const sanitizedPassword = DOMPurify.sanitize(trimmedPassword, cleanConfig);

    const signInResult = await signIn("credentials", {
      redirect: false,
      name: sanitizedName,
      lastName: sanitizedLastName,
      email: sanitizedEmail,
      password: sanitizedPassword,
    });
    if (signInResult?.ok) {
      window.location.href = "/workspaces";
    } else {
      console.error("Sign in failed:", signInResult?.error);
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className={loginSignUpStyle.parent}>
        <AuthenticationCard>
          <SocialLogin socialType={"Sign up"}></SocialLogin>
          <form action="" onSubmit={(e) => void signUpUser(e)}>
            <div className={loginSignUpStyle.row}>
              <Label htmlFor="name">First Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
              {/* <InputError message="Empty field" /> */}
            </div>

            <div className={loginSignUpStyle.row}>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                autoFocus
              />
              {/* <InputError message="Empty field" /> */}
            </div>

            <div className={loginSignUpStyle.row}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
              {/* <InputError message="Invalid password" /> */}
            </div>

            <div className={loginSignUpStyle.row}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
              {/* <InputError message="Empty field" /> */}
            </div>

            <div className={loginSignUpStyle.row}>
              <Label htmlFor="passwordConfirmation">Confirm Password</Label>
              <Input
                id="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                autoFocus
              />
              <InputError message={error} />
            </div>

            <div className={loginSignUpStyle.terms}>
              <Checkbox name="terms" id="terms" required />
              <Label htmlFor="terms">
                I agree to the {""}
                <Link className="link" href={""} target="blank">
                  Terms of service{" "}
                </Link>
                and{" "}
                <Link className="link" href={""} target="blank">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <div className={loginSignUpStyle.row2}>
              <Link className="link" href="/login">
                Login to my account
              </Link>
              <button className={loginSignUpStyle.CFAButton} type="submit">
                <span>Sign Up</span>
              </button>
            </div>
          </form>
        </AuthenticationCard>
      </div>
    </>
  );
}

export default SignUp;