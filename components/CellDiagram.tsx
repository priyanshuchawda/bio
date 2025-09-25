import React, { useState } from 'react';
import type { CellData, CellPart } from '../types';

interface CellDiagramProps {
  data: CellData;
  onPartClick: (part: CellPart) => void;
}

const CellDiagram: React.FC<CellDiagramProps> = ({ data, onPartClick }) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const isPlantCell = data.name === 'Plant Cell';

  const PlantCellSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Cell Wall */}
      <path d="M10,5 H90 A10,10 0 0 1 100,15 V85 A10,10 0 0 1 90,95 H10 A10,10 0 0 1 0,85 V15 A10,10 0 0 1 10,5 Z" className="fill-current text-green-700 dark:text-green-800" />
      {/* Cell Membrane */}
      <path d="M12,7 H88 A8,8 0 0 1 96,15 V85 A8,8 0 0 1 88,93 H12 A8,8 0 0 1 4,85 V15 A8,8 0 0 1 12,7 Z" className="fill-current text-green-400 dark:text-green-500" />
      {/* Large Vacuole */}
      <path d="M15,20 C20,15 60,15 65,25 S60,75 50,80 S10,80 15,60 S10,25 15,20 Z" className="fill-current text-cyan-200 dark:text-cyan-600 opacity-80" />
      {/* Nucleus */}
      <circle cx="75" cy="30" r="10" className="fill-current text-purple-500 dark:text-purple-400" />
      {/* Chloroplasts */}
      <circle cx="70" cy="70" r="5" className="fill-current text-lime-500 dark:text-lime-400" />
      <circle cx="80" cy="60" r="4" className="fill-current text-lime-500 dark:text-lime-400" />
      <circle cx="65" cy="55" r="4.5" className="fill-current text-lime-500 dark:text-lime-400" />
      {/* Mitochondria */}
      <ellipse cx="30" cy="80" rx="6" ry="3" transform="rotate(-30 30 80)" className="fill-current text-red-500 dark:text-red-400" />
    </svg>
  );

  const AnimalCellSVG = () => (
     <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Cell Membrane */}
      <path d="M50,5 C80,5 95,20 95,50 S80,95 50,95 S5,80 5,50 S20,5 50,5 Z" transform="rotate(15 50 50)" className="fill-current text-pink-400 dark:text-pink-500" />
      {/* Nucleus */}
      <circle cx="50" cy="50" r="15" className="fill-current text-purple-500 dark:text-purple-400" />
      {/* Small Vacuole */}
      <circle cx="75" cy="70" r="5" className="fill-current text-cyan-200 dark:text-cyan-600 opacity-80" />
       {/* Mitochondria */}
      <ellipse cx="70" cy="30" rx="7" ry="4" transform="rotate(20 70 30)" className="fill-current text-red-500 dark:text-red-400" />
    </svg>
  );

  return (
    <div className={`flex flex-col items-center p-6 rounded-2xl shadow-xl ${data.bgColor} bg-opacity-50 dark:bg-opacity-30 backdrop-blur-sm`}>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">{data.name}</h2>
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        {/* Cell Body SVG */}
        {isPlantCell ? <PlantCellSVG /> : <AnimalCellSVG />}

        {/* Cell Parts Interactive Points */}
        {data.parts.map((part: CellPart) => (
          <div
            key={part.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ top: part.position.top, left: part.position.left }}
            onMouseEnter={() => setHoveredPart(part.id)}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => onPartClick(part)}
          >
            <div className="w-4 h-4 bg-yellow-300 border-2 border-gray-800 dark:border-white rounded-full transition-transform duration-300 group-hover:scale-150 shadow-lg animate-pulse-slow"></div>
            {hoveredPart === part.id && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-10">
                <p className="font-bold">{part.name}</p>
                <p className="text-xs">{part.shortDescription}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CellDiagram;