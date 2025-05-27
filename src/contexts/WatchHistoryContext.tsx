import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LetterboxdEntry } from '@/lib/csvConverter';
import { MovieDetails } from '@/lib/movieApi';

export interface EnhancedEntry extends LetterboxdEntry {
  isSelected: boolean;
  movieDetails?: MovieDetails;
}

interface WatchHistoryContextType {
  entries: EnhancedEntry[];
  setEntries: (entries: EnhancedEntry[]) => void;
  originalFile: File | null;
  setOriginalFile: (file: File | null) => void;
  toggleSelection: (index: number) => void;
  toggleAllSelection: (selected: boolean) => void;
  selectedCount: number;
}

const WatchHistoryContext = createContext<WatchHistoryContextType | undefined>(undefined);

export function WatchHistoryProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<EnhancedEntry[]>([]);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const toggleSelection = (index: number) => {
    setEntries(prevEntries => {
      const newEntries = [...prevEntries];
      newEntries[index] = {
        ...newEntries[index],
        isSelected: !newEntries[index].isSelected
      };
      return newEntries;
    });
  };

  const toggleAllSelection = (selected: boolean) => {
    setEntries(prevEntries =>
      prevEntries.map(entry => ({
        ...entry,
        isSelected: selected
      }))
    );
  };

  const selectedCount = entries.filter(entry => entry.isSelected).length;

  return (
    <WatchHistoryContext.Provider 
      value={{ 
        entries, 
        setEntries, 
        originalFile, 
        setOriginalFile,
        toggleSelection,
        toggleAllSelection,
        selectedCount
      }}
    >
      {children}
    </WatchHistoryContext.Provider>
  );
}

export function useWatchHistory() {
  const context = useContext(WatchHistoryContext);
  if (context === undefined) {
    throw new Error('useWatchHistory must be used within a WatchHistoryProvider');
  }
  return context;
} 