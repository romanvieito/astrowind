import { createSignal, createEffect } from 'solid-js';

interface ViewProps {
  pose_landmarker_url?: string;
  token_api_key?: string;
}

const IframePoseLandMarker = ({ pose_landmarker_url, token_api_key }: ViewProps) => {
  const [url, setUrl] = createSignal('');
  const [loading, setLoading] = createSignal(true);

  createEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/getposelandmarkertoken', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token_api_key}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener el token'); // Maneja el error
        }
        const token = await response.text();
        // const iframeSrc = `${pose_landmarker_url}/poses?token=${token}`;
        const iframeSrc = `${pose_landmarker_url}/?token=${token}`;
        console.log('Iframe Source:', iframeSrc);
        setUrl(iframeSrc);
      } catch (error) {
        console.error('Error fetching data:', error);
        setUrl(''); // Resetea la URL en caso de error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  });

  return (
    <div className="relative w-full md:w-auto">
      <div className="items-center justify-center flex w-full md:w-auto">
        {loading() ? ( // Verifica si está cargando
          <p>Loading AI Coach ...</p>
        ) : (
          url() && ( // Verifica si hay una URL válida
            <iframe
              src={url()}
              style={{ width: '100%', height: '100vh', border: 'none' }}
              title="AI Coach"
              allow="camera; microphone"
            ></iframe>
          )
        )}
      </div>
    </div>
  );
};

export default IframePoseLandMarker;
