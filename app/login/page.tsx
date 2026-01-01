import React from 'react'
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    
    <div className="flex flex-1 min-h-full">
        {/* Left Side - Image */}
        <div className="w-1/2 relative hidden md:block">

          {/* Background Image */}
          <img
            src="/logo_banner.jpg"
            alt="Basketball player"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
        </div>
        
        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center px-8 md:px-16">
          <LoginForm />
        </div>
      </div>
  );
}
