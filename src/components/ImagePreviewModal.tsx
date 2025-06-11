import React from 'react';
import { X, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface ImagePreviewModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

const ImagePreviewModal = ({ isOpen, imageUrl, onClose }: ImagePreviewModalProps) => {
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const resetView = () => {
    setZoom(1);
    setRotation(0);
  };

  React.useEffect(() => {
    if (isOpen) {
      resetView();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Early return AFTER hooks to avoid conditional hooks
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      {/* Controls */}
      <div className="absolute top-4 right-4 flex space-x-2 z-10">
        <button onClick={handleZoomOut} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200" title="Zoom Out">
          <ZoomOut className="w-5 h-5" />
        </button>
        <button onClick={handleZoomIn} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200" title="Zoom In">
          <ZoomIn className="w-5 h-5" />
        </button>
        <button onClick={handleRotate} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200" title="Rotate">
          <RotateCw className="w-5 h-5" />
        </button>
        <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-200" title="Close">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Zoom level indicator */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">{Math.round(zoom * 100)}%</div>

      {/* Image container */}
      <div className="max-w-[90vw] max-h-[90vh] overflow-hidden cursor-move" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageUrl}
          alt="Preview"
          className="max-w-full max-h-full object-contain transition-transform duration-300"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transformOrigin: 'center',
          }}
          draggable={false}
        />
      </div>

      {/* Background overlay */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">Klik di luar gambar untuk menutup</div>
    </div>
  );
};

export default ImagePreviewModal;
