import { useState } from "react";
import Image from "next/image";

const ZoomImage = ({ src }) => {
  const [zoomPosition, setZoomPosition] = useState({ x: "50%", y: "50%" });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="w-full h-full overflow-hidden">
        <Image
          className="w-full h-full object-contain"
          src={src || "/black.png"}
          width={400}
          height={224}
          alt="Product image"
        />
      </div>

      {/* Loupe */}
      {isZoomed && (
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url(${src || "/black.png"})`,
            backgroundSize: "200%",
            backgroundPosition: `${zoomPosition.x} ${zoomPosition.y}`,
            opacity: 1,
          }}
        />
      )}
    </div>
  );
};

export default ZoomImage;
