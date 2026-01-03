import React from "react";
import LoginForm from "../components/LoginForm";
import Container from "../components/Container";

export default function Login() {
  return (
    <Container className="py-8 h-screen">
      <div className="flex h-full">
        {/* Left Side - Image */}
        <div className="w-1/2 relative hidden md:block">
          {/* Background Image */}
          <img
            src="/images/logo_banner.jpg"
            alt="Basketball player"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center px-4 sm:px-6 md:px-16">
          <LoginForm />
        </div>
      </div>
    </Container>
  );
}
