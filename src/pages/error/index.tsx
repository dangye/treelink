import { Link } from 'react-router'

export function ErrorPage(){
    return(
        <div className='flex flex-col w-full min-h-screen justify-center items-center text-white'>
            <h1 className='font-bold text-4xl'>404</h1>
            <h1 className='font-bold text-4xl mb-4'>Pagina não encontrada</h1>
             <Link to='/' className='bg-gray-50/20 py-1 px-4 rounded-md  '>Voltar para pagina Home</Link>
        </div>
    )
}