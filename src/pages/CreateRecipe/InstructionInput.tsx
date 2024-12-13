import { PlusCircle, Trash2 } from 'lucide-react';
import type { Instruction } from './types';

interface InstructionInputProps {
  instructions: Instruction[];
  onChange: (instructions: Instruction[]) => void;
}

const InstructionInput: React.FC<InstructionInputProps> = ({ instructions, onChange }) => {
  const addInstruction = () => {
    onChange([...instructions, { step: instructions.length + 1, text: '', time: '' }]);
  };

  const removeInstruction = (index: number) => {
    const updated = instructions
      .filter((_, i) => i !== index)
      .map((instruction, i) => ({ ...instruction, step: i + 1 }));
    onChange(updated);
  };

  const updateInstruction = (index: number, field: keyof Omit<Instruction, 'step'>, value: string) => {
    const updated = instructions.map((instruction, i) => 
      i === index ? { ...instruction, [field]: value } : instruction
    );
    onChange(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">Instructions</label>
        <button
          type="button"
          onClick={addInstruction}
          className="inline-flex items-center text-sm text-[#e63b19] hover:text-[#d63516]"
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Add Step
        </button>
      </div>
      
      {instructions.map((instruction, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <div className="flex-none w-12 pt-2 text-gray-500">Step {instruction.step}</div>
          <div className="flex-1">
            <input
              type="text"
              value={instruction.text}
              onChange={(e) => updateInstruction(index, 'text', e.target.value)}
              placeholder="Instruction text"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#e63b19] focus:ring-[#e63b19]"
            />
            <input
              type="text"
              value={instruction.time}
              onChange={(e) => updateInstruction(index, 'time', e.target.value)}
              placeholder="Time (e.g., '10 minutes')"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-[#e63b19] focus:ring-[#e63b19]"
            />
          </div>
          <button
            type="button"
            onClick={() => removeInstruction(index)}
            className="flex-none text-gray-400 hover:text-gray-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default InstructionInput;