import Papa from 'papaparse';
import { EnhancedEntry } from '@/contexts/WatchHistoryContext';

export interface NetflixEntry {
  Title: string;
  Date: string;
}

export interface LetterboxdEntry {
  Title: string;
  WatchedDate: string;
  Year?: string;
}

export const convertNetflixToLetterboxd = async (file: File): Promise<EnhancedEntry[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const netflixData = results.data as NetflixEntry[];
        
        // Convert Netflix format to Letterboxd format
        const letterboxdData: EnhancedEntry[] = netflixData
          .filter(entry => entry.Title && entry.Date) // Filter out any incomplete entries
          .map(entry => {
            // Convert date from MM/DD/YY to YYYY-MM-DD
            const dateParts = entry.Date.split('/');
            const year = parseInt(dateParts[2]);
            const fullYear = year < 50 ? 2000 + year : 1900 + year; // Assume 20xx for years < 50
            const month = dateParts[0].padStart(2, '0');
            const day = dateParts[1].padStart(2, '0');
            
            // Extract year from title if it exists (e.g., "Movie Name (2023)")
            const titleMatch = entry.Title.match(/^(.*?)(?:\s*\((\d{4})\))?$/);
            const cleanTitle = titleMatch ? titleMatch[1].trim() : entry.Title;
            const yearFromTitle = titleMatch?.[2];

            return {
              Title: cleanTitle,
              WatchedDate: `${fullYear}-${month}-${day}`,
              ...(yearFromTitle && { Year: yearFromTitle }),
              isSelected: true, // Default to selected
              movieDetails: undefined
            };
          });

        resolve(letterboxdData);
      },
      error: (error) => {
        reject(new Error(`Failed to parse CSV: ${error}`));
      }
    });
  });
};

export const generateLetterboxdCsv = (entries: EnhancedEntry[]): string => {
  // Generate CSV header
  const csvContent = Papa.unparse({
    fields: ['Title', 'Year', 'WatchedDate'],
    data: entries.map(({ Title, Year, WatchedDate }) => ({
      Title,
      Year: Year || '',
      WatchedDate
    }))
  });

  return csvContent;
}; 