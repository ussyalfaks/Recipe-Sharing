import React from 'react';
import { Clock } from 'lucide-react';
import { Recipe } from '../../types';

interface InstructionsProps {
  instructions: Recipe['instructions'];
}

const Instructions: React.FC<InstructionsProps> = ({ instructions }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Instructions</h2>
      <div className="space-y-6">
        {instructions.map((instruction) => (
          <div key={instruction.step} className="flex gap-4">
            <div className="flex-none w-8 h-8 bg-[#e63b19] text-white rounded-full flex items-center justify-center">
              {instruction.step}
            </div>
            <div className="flex-1">
              <p className="text-gray-800 mb-2">{instruction.text}</p>
              {instruction.time && (
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {instruction.time}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructions;