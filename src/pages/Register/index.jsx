import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebaseConnection';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        if (email !== '' && password !== '') {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/admin', { replace: true });
                    toast.success('Login realizado com sucesso!')
                })
                .catch(() => {
                    console.log('Erro ao realizar cadastro!');
                })
        } else {
            toast.error('Preencha todos os campos!')
        }
    }

    return (
        <div className='home-container'>
            <h1>Cadastre-se</h1>
            <span>Vamos criar sua conta</span>

            <form className='form' onSubmit={handleRegister}>
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
                <button type='submit'>Cadastrar</button>
            </form>

            <Link className='button-link' to='/'>Já possui uma conta? <span> Faça login</span></Link>
        </div>
    )
}

export default Register