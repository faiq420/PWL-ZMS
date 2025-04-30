// import React, { useState, useRef, useEffect } from "react";

// interface Position {
//   x: number;
//   y: number;
// }

// interface PixelData {
//   r: number;
//   g: number;
//   b: number;
// }

// const ScreenLoader = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isHovering, setIsHovering] = useState<boolean>(false);
//   const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
//   const imgRef = useRef<HTMLImageElement>(new Image());

//   useEffect(() => {
//     // Load the image
//     imgRef.current.src = "/KaprayWageraLogo.png";
//     imgRef.current.onload = () => {
//       drawCanvas();
//     };
//   }, []);

//   useEffect(() => {
//     if (isHovering) {
//       drawCanvas();
//     } else {
//       // Reset to normal when not hovering
//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
//     }
//   }, [isHovering, mousePos]);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setMousePos({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     });
//   };

//   const drawCanvas = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const width = canvas.width;
//     const height = canvas.height;

//     ctx.clearRect(0, 0, width, height);

//     // Fisheye parameters
//     const radius = Math.min(width, height) * 0.4;
//     const distortion = 2.5;

//     // Center of fisheye
//     const centerX = mousePos.x;
//     const centerY = mousePos.y;

//     // Draw image with fisheye effect
//     for (let y = 0; y < height; y++) {
//       for (let x = 0; x < width; x++) {
//         const dx = x - centerX;
//         const dy = y - centerY;
//         const distance = Math.sqrt(dx * dx + dy * dy);

//         if (distance < radius) {
//           const r = distance / radius;
//           const amount = (1 - Math.pow(r, 2)) * distortion;
//           const nx = centerX + dx * amount;
//           const ny = centerY + dy * amount;

//           if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
//             const pixel = getPixel(imgRef.current, nx, ny, width, height);
//             if (pixel) {
//               ctx.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
//               ctx.fillRect(x, y, 1, 1);
//             }
//           }
//         } else {
//           const pixel = getPixel(imgRef.current, x, y, width, height);
//           if (pixel) {
//             ctx.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
//             ctx.fillRect(x, y, 1, 1);
//           }
//         }
//       }
//     }
//   };

//   const getPixel = (
//     img: HTMLImageElement,
//     x: number,
//     y: number,
//     width: number,
//     height: number
//   ): PixelData | null => {
//     const canvas = document.createElement("canvas");
//     canvas.width = width;
//     canvas.height = height;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return null;

//     ctx.drawImage(img, 0, 0, width, height);
//     const pixelData = ctx.getImageData(x, y, 1, 1).data;

//     return {
//       r: pixelData[0],
//       g: pixelData[1],
//       b: pixelData[2],
//     };
//   };

//   return (
//     <div className="w-screen h-screen bg-[#00000080] flex justify-center items-center fixed mb-0 top-0 left-0 z-[999] cursor-pointer">
//       <div
//         className="relative rounded-full flex items-center justify-center h-32 w-32 bg-white overflow-hidden"
//         onMouseMove={handleMouseMove}
//         onMouseEnter={() => setIsHovering(true)}
//         onMouseLeave={() => setIsHovering(false)}
//       >
//         <canvas
//           ref={canvasRef}
//           width={128}
//           height={128}
//           className="rounded-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default ScreenLoader;

import React from "react";
import Image from "next/image";
import logo from "@/src/app/favicon.ico";

const ScreenLoader = () => {
  return (
    <div className="w-screen h-screen bg-[#00000080] flex justify-center items-center fixed mb-0 top-0 left-0 z-[999]">
      <div className="relative rounded-full flex items-center justify-center h-32 w-32 bg-white">
        {/* SVG Spinner at the edge */}
        <Image
          src={"/KaprayWageraLogo.png"}
          alt="logo"
          // height={60}
          // width={60}
          fill
          className="rounded-full object-contain"
        />
      </div>
    </div>
  );
};

export default ScreenLoader;
