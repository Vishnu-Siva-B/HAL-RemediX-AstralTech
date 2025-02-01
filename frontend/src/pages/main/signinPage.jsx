import React from 'react';
import Signin from '../../components/signin/signin';
import { BackgroundBeams } from '@/shadcn/components/ui/background-beams';
import signinImg from '../../static/main/images/signin.jpg';

const SignInPage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-x-hidden">
      <div className="hidden md:flex w-8/12 items-center justify-center p-4">
        <img
          src={signinImg}
          alt="Sign In Illustration"
          className="rounded-lg animate-fade-in-left"
        />
      </div>
      <BackgroundBeams />
      <div className="flex md:w-4/12 items-center justify-center relative animate-fade-in-right">
        <Signin />
      </div>
    </div>
  );
};

export default SignInPage;
