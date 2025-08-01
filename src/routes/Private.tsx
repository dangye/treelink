import { ReactNode, useState, useEffect } from "react";
import { auth } from "../services/firebaseConnections";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate} from 'react-router'

interface PrivateProps{
    children: ReactNode
}

export function Private({children}: PrivateProps): any{

    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false)

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            if(user){
                console.log('user logado')
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }

                setLoading(false)
                setSigned(true)

            }else{
                console.log('usuario deslogado')

                setLoading(false)
                setSigned(false)
            }
        })

        return ()=>{
            unsub()
        }
    }, [])



//proteção da rota se estiver logado!

    if(loading){
        return <div> </div>
        
    }

    if(!signed){
        
        return <Navigate to="/login"/>

    }

    return(
        children
    )
}