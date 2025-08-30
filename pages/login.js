// pages/login.js
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
    <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow mt-20">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
      <input
        type="text"
        className="border border-gray-300 rounded w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="border border-gray-300 rounded w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-3 rounded transition"
      >
        Entrar
      </button>
    </div>
  );
}