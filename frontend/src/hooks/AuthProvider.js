import React from 'react';

import useAuthProvider from "./useAuthProvider";

const AuthContext = React.createContext(null);

function AuthProvider({children, ...rest}) {
    const auth = useAuthProvider();

    return (
        <AuthContext.Provider value={auth} {...rest}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext};
export default AuthProvider;