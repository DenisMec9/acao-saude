// pages/admin.js
'use client';

import { useState, useEffect } from 'react';
import Parse from '../lib/parseConfig';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState(null);

  // 🔐 Verifica se o usuário está logado
  useEffect(() => {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      alert('Acesso negado. Faça login primeiro.');
      router.push('/login');
    } else {
      fetchData();
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const query = new Parse.Query('HeroContent');
      const results = await query.find();
      if (results.length > 0) {
        const data = results[0];
        setHeroData(data);
        setTitle(data.get('title') || '');
        setSubtitle(data.get('subtitle') || '');
        setDescription(data.get('description') || '');
        setImage(data.get('image') || '');
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      alert('Erro ao carregar conteúdo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const record = heroData || new Parse.Object('HeroContent');
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

      record.set('title', title);
      record.set('subtitle', subtitle);
      record.set('description', description);

      if (file) {
        if (!allowedTypes.includes(file.type)) {
          alert('Tipo de arquivo não permitido. Use JPG, PNG ou WEBP.');
          return;
        }

        let finalFile = file;
        if (file.name.endsWith('.jpeg')) {
          finalFile = new File([file], file.name.replace(/\.jpeg$/, '.jpg'), {
            type: 'image/jpeg',
          });
        }

        const parseFile = new Parse.File(finalFile.name, finalFile);
        await parseFile.save();
        record.set('image', parseFile.url());
      } else if (image) {
        record.set('image', image);
      }

      await record.save();
      alert('Hero atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao salvar: ' + (error.message || 'Erro desconhecido'));
    }
  };

  const handleLogout = () => {
    Parse.User.logOut();
    alert('Você saiu com sucesso.');
    router.push('/login');
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white min-h-screen">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition"
        >
          Sair
        </button>
      </header>

      <div className="space-y-6">
        <input
          type="text"
          className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Subtítulo"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <textarea
          className="border border-gray-300 rounded w-full p-3 h-32 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="URL da imagem (opcional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png, image/webp"
          className="mb-6"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition w-full"
        >
          Salvar alterações
        </button>
      </div>
    </div>
  );
}