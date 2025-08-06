import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { FormEvent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { FiTrash } from 'react-icons/fi'

import { db, auth } from '../../services/firebaseConnections'
import { 
    addDoc, 
    collection, 
    onSnapshot, 
    query, 
    doc, 
    orderBy, 
    deleteDoc } from 'firebase/firestore'

import { signOut, onAuthStateChanged } from 'firebase/auth'

interface LinkProps{
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}

export function Admin(){

    const [nameInput, setNameInput] = useState('')
    const [urlInput, setUrlInput] = useState('')
    const [textColorInput, setTextColorInput] = useState('#F1F1F1')
    const [bgColorInput, setBgColorInput] = useState('#FFF')

    const [links, setLinks] = useState<LinkProps[]>([])

    const navigate = useNavigate();

    useEffect(() => {
        const SESSION_DURATION = 60 * 60 * 1000; // 1 hora
        const loginTime = localStorage.getItem("loginTime");

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login", { replace: true });
                return;
            }

            if (loginTime && Date.now() - Number(loginTime) > SESSION_DURATION) {
                signOut(auth).then(() => {
                localStorage.removeItem("loginTime");
                navigate("/login", { replace: true });
                alert("Sessão expirada. Faça login novamente.");
                });
            }
            });

        return () => unsubscribe();
    }, [navigate]);

    useEffect(()=>{
        const linksRef = collection(db, 'links')
        const queryRef = query(linksRef, orderBy('created', 'asc'))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            
            let lista = [] as LinkProps[]

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().colorText,
                })

            })
            console.log(lista)
            setLinks(lista)
            
        })
        return()=>{unsub()}
        
    }, [])


    function handleRegister(e: FormEvent){
        e.preventDefault();

        if(nameInput === '' || urlInput === ''){
            alert('Preencha todos os campos')
            return
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: bgColorInput,
            colorText: textColorInput,
            created: new Date()
        })
        .then(()=>{
            alert('link criado com  sucesso')
            setNameInput('')
            setUrlInput('')
        })
        .catch((error)=>{
            console.log(error)
        })

    }

    async function handleDeleteLink(id:string){
        const docRef = doc(db, "links", id)
        await deleteDoc(docRef)
    }


    return(
        <div className="flex items-center flex-col min-h-screen pb-5 px-2">
            <Header/>

            <form 
                className='flex flex-col mt-8 mb-3 w-full max-w-xl'
                onSubmit={handleRegister}
            >
                <label className='text-white font-medium mt-2 mb-2'>Nome do Link</label>
                    <Input

                        placeholder='Digite o nome do link'
                        value={nameInput}
                        onChange={(e)=> setNameInput(e.target.value)}
                    />

                <label className='text-white font-medium mt-2 mb-2'>URL do Link</label>
                    <Input
                        type='url'
                        placeholder='Digite a URL'
                        value={urlInput}
                        onChange={(e)=> setUrlInput(e.target.value)}
                    />
                
                <section className='flex gap-5 my-4'> 
                    <label className='text-white font-medium mt-2 mb-2'>Fundo do Link</label>
                    <input type="color" value={bgColorInput} onChange={(e)=>setBgColorInput(e.target.value)} />
                    <label className='text-white font-medium mt-2 mb-2'>Cor da letra</label>
                    <input type="color" value={textColorInput} onChange={(e)=>setTextColorInput(e.target.value)} />
                </section>

                {nameInput !== '' && ( 
                    <div className='flex justify-start items-center flex-col mb-7 p- border-gray-100/25 border rounded rounded-md'>
                        <label className='text-white font-medium mt-2 mb-2'>Previa do Link:</label>
                        <article
                            className='w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-700 rounded px-1 py-3 mb-2 mt-2'
                            style={{backgroundColor: bgColorInput}}
                        >
                            <p style={{color: textColorInput}}>{nameInput}</p>
                        </article>
                    </div>
                )}


                <button type='submit' className='bg-blue-600 h-9 rounded-md text-white font-medium gap-4 hover:bg-blue-800'>
                    Cadastrar
                </button>
            </form>
            
            <h2 className='font-bold text-white mb-4 text-2xl'>Meus Links</h2>

           

           {links.map((item)=> (
            <article 
                key={item.id}
                className='flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none'
                style={{backgroundColor: item.bg, color: item.color}}
            >
                    <p>{item.name}</p>
                    <div>
                        <button
                            className='border border-dashed p-1 rounded bg-black hover:bg-gray-700'
                            onClick={()=> handleDeleteLink(item.id)}
                            ><FiTrash size={18} color='white'/>
                        </button>
                    </div>
            </article>
           ))}


        </div>
    )
}