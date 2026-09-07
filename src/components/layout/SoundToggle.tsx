import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled, subscribeSound } from '../../utils/sound';

interface Props {
  isScrolled?: boolean;
  className?: string;
}

export const SoundToggle: React.FC<Props> = ({ isScrolled = false, className = '' }) => {
  const [enabled, setEnabled] = useState(isSoundEnabled);

  useEffect(() => {
    return subscribeSound((val) => setEnabled(val));
  }, []);

  const handleToggle = () => {
    setSoundEnabled(!enabled);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={enabled ? 'Matikan efek suara interaksi' : 'Nyalakan efek suara interaksi'}
      title={enabled ? 'Efek suara aktif (klik untuk membisukan)' : 'Efek suara senyap (klik untuk mengaktifkan)'}
      data-sound="none"
      className={`p-2 rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer ${
        isScrolled
          ? 'bg-stone-900/90 hover:bg-stone-850 border border-stone-700/70 dark:border-stone-800/90 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.15),0_2px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_6px_20px_-3px_rgba(0,0,0,0.5)] backdrop-blur-md'
          : 'bg-stone-900 hover:bg-stone-800 border border-stone-800'
      } ${
        enabled
          ? 'text-amber-400 hover:text-amber-300'
          : 'text-stone-500 hover:text-stone-400'
      } ${className}`}
    >
      {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
    </button>
  );
};
