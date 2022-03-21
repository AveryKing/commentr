import React, {useState, useEffect, useContext, createContext} from 'react';
import firebase from './firebase';

const authContext = createContext();

export const AuthProvider = ({children}) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);
}

const useProvideAuth = () => {
    return {
        user: null,
        signInWithGithub: null,
        signOut: null
    }
}