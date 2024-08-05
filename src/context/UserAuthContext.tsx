"use client";
import { swrFetcher } from "@/helpers";
import { IChildren } from "@/types";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";

interface IUserAuthContext {
    isAuthenticated: boolean,
    isLoading: boolean,
    isAdmin: boolean
}

const initialContextValue: IUserAuthContext = {
    isAuthenticated: false,
    isLoading: false,
    isAdmin: false
};

const UserAuthContext = createContext<IUserAuthContext>(initialContextValue);



const UserAuthContextProvider: React.FC<IChildren> = ({ children }) => {

    const { status } = useSession();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(false);

    const { data: userData, isLoading: isFetchingUser, } = useSWR(isAuthenticated ? '/api/manage' : null, swrFetcher);

    useEffect(() => {
        console.log('status has changed to ', status);

        if (status === 'loading') {
            !isAdminLoading && setIsAdminLoading(true);
        } else if (status === 'authenticated') {
            setIsAuthenticated(true);
        } else {
            isAuthenticated && setIsAuthenticated(true);
            isAdmin && setIsAdmin(false);
            isAdminLoading && setIsAdminLoading(false);
        }
    }, [status]);

    useEffect(() => {
        if (userData?.manage) {
            setIsAdmin(userData.manage.accessGranted);
            isAdminLoading && setIsAdminLoading(false);
        }

    }, [isFetchingUser]);

    return <UserAuthContext.Provider value={{ isAuthenticated, isAdmin, isLoading: isAdminLoading }}>
        {children}
    </UserAuthContext.Provider>
};

export { UserAuthContext, UserAuthContextProvider };