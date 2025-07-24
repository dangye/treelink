import { Link, useNavigate } from "react-router"
import { Input } from "../../components/Input"
import { FormEvent, useState } from "react"

import { auth } from '../../services/firebaseConnections';
import { signInWithEmailAndPassword,  } from 'firebase/auth'

export function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassord] = useState('')
    const navigate = useNavigate()


    function handleSubmit(e: FormEvent){
        e.preventDefault();

        if(email == ''|| password == ''){
            return  alert('Preencha os campos de login e senha');
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Signed in 
                navigate('/admin', {replace: true})
                console.log('Logado com sucesso')

                // ...
            })
            .catch((error) => {
                console.log(error)

            });


        console.log({
            email: email,
            password: password
        })
    }

    return(
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev 
                <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
                
                </h1>
            </Link>
            <form 
                onSubmit={handleSubmit}
                className="w-full max-w-xl flex flex-col px-2"
            >
                <Input
                    placeholder="Digite o seu email"
                    type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <Input
                    placeholder="Digite a sua senha"
                    type="password"
                    value={password}
                    onChange={(e)=> setPassord(e.target.value)}
                />

                <button 
                    className="h-9 bg-blue-600 rounded border-0 text-xl font-bold text-white">
                    Acessar
                </button>
            </form>
        
        </div>
    )
}