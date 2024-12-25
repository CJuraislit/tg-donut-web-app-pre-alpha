import React, {createContext, FC, useContext, useEffect, useState} from "react";
import {useTelegram} from "../hooks/useTelegram";
// import {useNavigate} from "react-router-dom";
import getTokenFromInitData from "../api/userService";

interface AuthContextProps {
    token: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider:FC<{ children : React.ReactNode}> = ({children}) => {
    const [token, setToken] = useState<string | null>(null);
    const {tg} = useTelegram();
    // const navigate = useNavigate();

    const getToken = async () => {
        try {
            const refIdRaw = tg.initDataUnsafe?.start_param;
            const refId = Number(refIdRaw?.replace(/\D/g, ''));

            const newToken = await getTokenFromInitData(tg.initData, refId);
            setToken(newToken);
        } catch (error){
            console.error(error)
        }
    }

    useEffect(() => {
        getToken();
    }, [tg.initData]);

    return (
        <AuthContext.Provider value={{token}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Use app context within provider!')
    }
    return context
}
