import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Définissez une interface pour le type de diplôme
interface Diploma {
  title: string;
  description: string;
  // Ajoutez d'autres propriétés si nécessaire
}

const DiplomaPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [diploma, setDiploma] = useState<Diploma | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchDiploma = async () => {
        try {
          const response = await axios.get(`/api/diplomas/${id}`);
          setDiploma(response.data);
        } catch (err) {
          setError('Diplôme non trouvé.');
        } finally {
          setLoading(false);
        }
      };

      fetchDiploma();
    }
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  if (!diploma) return <p>Diplôme non disponible.</p>;

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/diplomas/${id}`);
      router.push('/diplomas'); // Redirection vers la liste des diplômes après la suppression
    } catch (err) {
      setError('Erreur lors de la suppression du diplôme.');
    }
  };

  return (
    <>
      <div className='mb-8'></div>
      <div className="relative mt-12 py-12 px-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-lg shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-25 filter blur-lg bg-gradient-to-r from-blue-400 to-purple-500"></div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl drop-shadow-lg">
            {diploma.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-light drop-shadow-md max-w-3xl mx-auto">
            {diploma.description}
          </p>
          <button
            onClick={handleDelete}
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Supprimer le diplôme
          </button>
        </div>
      </div>
    </>
  );
};

export default DiplomaPage;
