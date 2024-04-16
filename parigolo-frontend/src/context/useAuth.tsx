import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {API_BASE_URL} from "../apiConfig";

type User = {
    pseudo: string,
    password: string
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

    const signinUser = (pseudo: string, password: string) => {
        const credentials = {
            pseudo: pseudo,
            password: password
        };
        fetch(API_BASE_URL + "/signup", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(credentials)
        }).then((response) => {
            console.log(response)
            if (response.status !== 500 && response.status === 200) {
                localStorage.setItem("user", JSON.stringify(credentials));
                setUser(credentials!);
                navigate("/");
            }
        }).catch((error) => {console.log(error)})
    };

    const loginUser = (pseudo: string, password: string) => {
        const credentials = {
            pseudo: pseudo,
            password: password,
        };
        fetch(API_BASE_URL + "/login", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(credentials)
        }).then((response) => {
            if (response.status !== 500 && response.status === 200) {
                localStorage.setItem("user", JSON.stringify(credentials));
                setUser(credentials!);
                navigate("/");
            }
        }).catch((error) => {console.log(error)})
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

export const useAuth = () => React.useContext(UserContext);