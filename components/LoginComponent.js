// components/LoginComponent.js
import { useState, useEffect } from 'react';
import Parse from '../lib/parseConfig';
import { useRouter } from 'next/router';

export default function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Se já estiver logado, redireciona para o admin
    const currentUser = Parse.User.current();
    if (currentUser) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await Parse.User.logIn(username, password);
      router.push('/admin');
    } catch (err) {
      setError('Erro no login: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full surface-card rounded-3xl border border-slate-200/80 p-8 shadow-xl">
        <h2 className="section-title text-center mb-2">Login Admin</h2>
        <p className="section-subtitle text-center mb-6">Entre para gerenciar o conteúdo do site.</p>
        
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl mb-4" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} aria-busy={loading}>
          <div className="mb-4">
            <label htmlFor="admin-user" className="admin-label">
              Usuário
            </label>
            <input
              id="admin-user"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="admin-input"
              autoComplete="username"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="admin-password" className="admin-label">
              Senha
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              autoComplete="current-password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="admin-btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}