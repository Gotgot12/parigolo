import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import { API_BASE_URL } from "../apiConfig";
import axios from "axios";

type User = {
    id: number,
    pseudo: string,
}

type UserContextType = {
    user: User | null;
    signinUser: (pseudo: string, password: string) => void;
    loginUser: (pseudo: string, password: string) => void;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
        setIsReady(true);
    }, []);

    const handleUserResponse = (response: any, pseudo: string) => {
        if (response.status !== 500 && response.status === 200) {
            console.log(response.data)

            const user = {
                id: response.data.id,
                pseudo: pseudo
            }

            localStorage.setItem("user", JSON.stringify(user));
            setUser(user!);
            navigate("/");
        }
    };

    const signinUser = (pseudo: string, password: string) => {
        const data = {
            pseudo: pseudo,
            password: password
        }
        axios.post(API_BASE_URL + "/signup", data)
            .then((response) => {
                handleUserResponse(response, pseudo);
            })
            .catch((error) => { console.log(error) })
    };

    const loginUser = (pseudo: string, password: string) => {
        const data = {
            pseudo: pseudo,
            password: password,
        };
        axios.post(API_BASE_URL + "/login", data)
            .then((response) => {
                handleUserResponse(response, pseudo);
            })
            .catch((error) => { console.log(error) })
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logoutUser = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <UserContext.Provider
            value={{ loginUser, user, logoutUser, isLoggedIn, signinUser }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );

};

export const UseAuth = () => React.useContext(UserContext);