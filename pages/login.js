import { useState } from 'react';
import Parse from '../lib/parseConfig';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await Parse.User.logIn(username, password);
      alert('Login bem-sucedido!');
      router.push('/admin');
    } catch (error) {
      alert('Erro no login: ' + error.message);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        className="border w-full p-2 mb-2"
        placeholder="Usuário"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-4"
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Entrar
      </button>
    </div>
  );
}
