
import React from 'react';
import { ICONS } from '../constants';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === Theme.LIGHT ? (
        <ICONS.Moon className="w-5 h-5 text-slate-600" />
      ) : (
        <ICONS.Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
};
