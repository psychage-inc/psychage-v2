import React from 'react';
import Modal from '@/components/ui/Modal';
import { COGNITIVE_DISTORTIONS } from '../types';

interface DistortionLibraryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DistortionLibrary: React.FC<DistortionLibraryProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="12 Common Thinking Traps" maxWidth="2xl">
      <p className="text-gray-500 mb-6">
        Everyone falls into these patterns sometimes. Learning to recognize them is the first
        step to thinking more clearly.
      </p>
      <div className="space-y-4">
        {COGNITIVE_DISTORTIONS.map((d) => (
          <div
            key={d.id}
            className="p-4 rounded-xl border border-gray-100 bg-gray-50/50"
          >
            <h4 className="font-display font-bold text-gray-900 mb-1">{d.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{d.description}</p>
            <p className="text-sm italic text-gray-500 mb-2">{d.example}</p>
            <p className="text-xs text-teal-700 font-medium">
              Ask yourself: {d.doesThisFit}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
};
