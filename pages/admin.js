'use client';
import { useState, useEffect } from 'react';
import Parse from '../lib/parseConfig';

export default function AdminPage() {
  const [heroData, setHeroData] = useState(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState(null);

  // Carrega conteúdo existente
  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  // Atualiza conteúdo
  const handleSave = async () => {
    try {
      const record = heroData || new Parse.Object('HeroContent');
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

      record.set('title', title || record.get('title'));
      record.set('subtitle', subtitle || record.get('subtitle'));
      record.set('description', description || record.get('description'));

      if (file) {
        if (!allowedTypes.includes(file.type)) {
          alert('Tipo de arquivo não permitido. Use JPG, PNG ou WEBP.');
          return;
        }

        // Renomeia .jpeg para .jpg se necessário
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
      } else {
        record.set('image', record.get('image'));
      }

      await record.save();
      alert('Hero atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao salvar: ' + error.message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo - Hero</h1>

      <input
        className="border w-full p-2 mb-4"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-4"
        placeholder="Subtítulo"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />
      <textarea
        className="border w-full p-2 mb-4"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-2"
        placeholder="URL da imagem (ou envie arquivo)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/webp"
        className="mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSave}
      >
        Salvar alterações
      </button>
    </div>
  );
}
