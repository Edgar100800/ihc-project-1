import React, { useRef } from 'react';
import QRCode from 'react-qr-code';

interface QRCodeGeneratorProps {
  value: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value }) => {
  const qrRef = useRef<SVGSVGElement>(null);

  const downloadQRCode = () => {
    if (qrRef.current) {
      const svg = qrRef.current;
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `qr-code-${value}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">QR Code:</h2>
      <QRCode value={value} size={256} ref={qrRef} />
      <button
        onClick={downloadQRCode}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerator;
