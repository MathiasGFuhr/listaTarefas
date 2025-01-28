import { useState } from 'react';
import './home.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConnection';


const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        if (email !== '' && password !== '') {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/admin', { replace: true });
                    toast.success('Login realizado com sucesso!')
                })
                .catch(() => {
                    console.log('Erro ao realizar login!');
                })
        } else {
            toast.error('Preencha todos os campos!')
        }
    }

    return (
        <div className='home-container'>
            <h1>Lista de Tarefas</h1>
            <span>Gerencie sua agenda de forma fácil</span>

            <form className='form' onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder='Dgite seu email...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    autoComplete={false}
                    type="password"
                    placeholder='Dgite sua senha...'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Acessar</button>
            </form>

            <Link className='button-link' to='/register'>Não possui uma conta? <span> Cadastre-se</span></Link>
        </div>
    )
}

export default Home