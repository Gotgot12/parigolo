import React from "react";
import { useState } from "react";

import { UseAuth } from "../context/UseAuth";

const Auth = () => {

  const [pseudoLogin, setPseudoLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");

  const [pseudoSignin, setPseudoSignin] = useState<string>("");
  const [passwordSignin, setPasswordSignin] = useState<string>("");

  const { loginUser, signinUser } = UseAuth();

  const loginEvent = () => {
    loginUser(pseudoLogin, passwordLogin)
  };

  const signinEvent = () => {
    signinUser(pseudoSignin, passwordSignin)
  };

  const handleKeyDownPasssword = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      loginEvent();
    }
  }

  return (
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold mb-10 mt-10 text-center">Welcome</h1>
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-gray-100 p-4 rounded-md cursor-pointer">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
                type="text"
                value={pseudoLogin}
                onChange={(e) => setPseudoLogin(e.target.value)}
                placeholder="Enter the pseudo"
                className="w-full p-2 border border-gray-200 rounded-md mr-4 mb-4"
            />
            <input
                type="password"
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
                placeholder="Enter the password"
                className="w-full p-2 border border-gray-200 rounded-md mr-4"
            />
            <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
                    onClick={ loginEvent }>
              Confirm
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-md cursor-pointer">
            <h2 className="text-2xl font-bold mb-4">Signin</h2>
            <input
                type="text"
                value={pseudoSignin}
                onChange={(e) => setPseudoSignin(e.target.value)}
                placeholder="Enter the pseudo"
                className="w-full p-2 border border-gray-200 rounded-md mr-4 mb-4"
            />
            <input
                type="password"
                value={passwordSignin}
                onChange={(e) => setPasswordSignin(e.target.value)}
                placeholder="Enter the password"
                className="w-full p-2 border border-gray-200 rounded-md mr-4"
                onKeyDown={handleKeyDownPasssword}
            />
            <button className={"w-full mt-4 p-2 rounded-md " + (passwordSignin.length > 6 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600")}
                    onClick={signinEvent}
                    disabled={passwordSignin.length < 6}>
              Confirm
            </button>
          </div>
        </div>
      </div>
  );

}

export default Auth;
