// pages/login.js
import { useState } from 'react';
import Parse from '../lib/parseConfig';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Parse.User.logIn(username, password);
      alert('Login bem-sucedido!');
      router.push('/admin');
    } catch (error) {
      alert('Erro no login: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-md mx-auto surface-card rounded-3xl border border-slate-200/80 shadow-xl p-8 animate-fade-in">
        <h2 className="section-title text-center mb-2">Área Administrativa</h2>
        <p className="section-subtitle text-center mb-6">Acesse o painel com seu usuário autorizado.</p>

        <form onSubmit={handleLogin} className="space-y-4" aria-busy={loading}>
          <div>
            <label htmlFor="login-username" className="admin-label">Usuário</label>
            <input
              id="login-username"
              type="text"
              className="admin-input"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label htmlFor="login-password" className="admin-label">Senha</label>
            <input
              id="login-password"
              type="password"
              className="admin-input"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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