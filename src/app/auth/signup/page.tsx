import Container from "@/components/ui/container";
import { Icons } from "@/components/icons";
import Link from "next/link";
import SignUpForm from "./signup-form";
import OAuthSignIn from "@/components/oauth";

const SignUpPage = () => {
  return (
    <Container className="flex py-5 flex-col gap-3 items-start max-w-[425px]">
      <Icons.logo className="h-16 w-16 mx-auto" />
      <Container className="text-center">
        <span>Already have an account?&nbsp;</span>
        <Link
          className="text-sm font-semibold transition-colors underline-offset-4 hover:underline text-blue-400 hover:text-blue-400/80"
          href="/auth/login"
        >
          Log in
        </Link>
      </Container>
      <SignUpForm />
      <div className="mt-3"></div>
      <OAuthSignIn />
    </Container>
  );
};

export default SignUpPage;
