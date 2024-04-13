import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [pseudoLogin, setPseudoLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");

  const [pseudoSignin, setPseudoSignin] = useState<string>("");
  const [passwordSignin, setPasswordSignin] = useState<string>("");
  const [confirmPasswordSignin, setConfirmPasswordSignin] = useState<string>("");

  const loginEvent = () => {
    const credentials = {
      email: pseudoLogin,
      password: passwordLogin,
    };

    axios.post('/login', {credentials}, {})
    .then((response) => {
      console.log(response)
    })
    .catch((error) => console.log(error))
  };

  const signinEvent = () => {
    const credentials = {
      email: pseudoSignin,
      password: passwordSignin,
    };

    axios.post('/signup', {credentials}, {})
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error))
  };

  const handleKeyDownPasssword = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      loginEvent();
    }
  }

  return (
    <Box className="flex flex-row w-full justify-center items-center h-screen gap-x-8">
        <Box className="flex flex-col justify-center items-center bg-white rounded-3xl w-1/3 py-10 border border-[#bcbcbc] shadow-xl">
          <h4 className="text-black text-2xl font-bold text-lg mb-5">
            Connexion
          </h4>
          <TextField
            className="!mb-4 w-2/3"
            type="text"
            id="pseudoLogin"
            label="Pseudo"
            variant="outlined"
            value={pseudoLogin}
            onChange={(e) => setPseudoLogin(e.target.value)}
          />
          <TextField
            className="!mb-6 w-2/3"
            type="password"
            id="passwordLogin"
            label="Mot de passe"
            variant="outlined"
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
            onKeyDown={handleKeyDownPasssword}
          />
          <Button
            className="!bg-black"
            variant="contained"
            size="large"
            onClick={loginEvent}
          >
            Confirmer
          </Button>
        </Box>
        <Box className="flex flex-col justify-center items-center bg-white rounded-3xl w-1/3 py-10 border border-[#bcbcbc] shadow-xl">
          <h4 className="text-black text-2xl font-bold text-lg mb-5">
            Inscription
          </h4>
          <TextField
            className="!mb-4 w-2/3"
            type="text"
            id="pseudoSignin"
            label="Pseudo"
            variant="outlined"
            value={pseudoSignin}
            onChange={(e) => setPseudoSignin(e.target.value)}
          />
          <TextField
            className="!mb-6 w-2/3"
            type="password"
            id="passwordSignin"
            label="Mot de passe"
            variant="outlined"
            value={passwordSignin}
            onChange={(e) => setPasswordSignin(e.target.value)}
          />
          <TextField
            className="!mb-6 w-2/3"
            type="password"
            id="confirmPasswordSignin"
            label="Confirmation du mot de passe"
            variant="outlined"
            value={confirmPasswordSignin}
            onChange={(e) => setConfirmPasswordSignin(e.target.value)}
          />
          <Button
            className={passwordSignin !== confirmPasswordSignin || passwordSignin.length < 6 ? '!bg-grey' : '!bg-black'}
            variant="contained"
            size="large"
            onClick={signinEvent}
            disabled={passwordSignin !== confirmPasswordSignin || passwordSignin.length < 6 ? true : false}
          >
            Confirmer
          </Button>
        </Box>
      </Box>
  );
};

export default Auth;
