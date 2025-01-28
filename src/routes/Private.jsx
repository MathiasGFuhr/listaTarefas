import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConnection";
import Loading from "../components/Loading/Loading";

const Private = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);


    useEffect(() => {
        async function checkLogin() {
            const unsub = onAuthStateChanged(auth, (user) => {
                //se possui usuario logado
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    }

                    localStorage.setItem('@detailUser', JSON.stringify(userData));
                    setLoading(false);
                    setSigned(true);
                } else {
                    // não possui usuario logado
                    setLoading(false);
                    setSigned(false);
                }
            })
        }

        checkLogin();
    }, [])

    if (loading) {
        return <Loading />
    }

    // se nao estiver logado
    if (!signed) {
        return <Navigate to="/" />
    }

    // se estiver logado retorna o children
    return children;
}

export default Private