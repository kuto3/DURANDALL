import React from 'react';
import Bodythree from '../../components/Body3';

const index = () => {
  return (
    <div>
        <div className="video-container flex items-center justify-center">
      <video
        controls
        width="40%" 
        height="auto"
        src="/1015.mp4" // chemin relatif vers la vidéo
        alt="description de la vidéo"
      >
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
    </div>

      <div id="steps" className="h-12"></div>
      <Bodythree className="p-9 mx-9" />
      <div className="h-36"></div>
    </div>
  );
}

export default index;
