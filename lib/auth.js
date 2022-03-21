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
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleUser = (rawUser) => {
        if(rawUser) {
            const user = formatUser(rawUser);

            setLoading(false);
            setUser(user);
            return user
        } else {
            setLoading(false);
            setUser(false);
            return false;
        }
    }
    const signInWithGithub = () => {
        setLoading(true)
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((res) => handleUser(res.user));
    }
    
    return {
        user: null,
        signInWithGithub: null,
        signOut: null
    }
}