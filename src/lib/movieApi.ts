import axios from 'axios';

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

// Validate API key on module load
if (!OMDB_API_KEY) {
  console.error('OMDB API key is missing! Please check your .env file');
} else {
  console.log('OMDB API key found:', OMDB_API_KEY.slice(0, 3) + '...');
}

export interface MovieDetails {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

export const searchMovie = async (title: string, year?: string): Promise<MovieDetails | null> => {
  try {
    if (!OMDB_API_KEY) {
      throw new Error('OMDB API key is missing. Please check your .env file');
    }

    console.log(`Searching for movie: "${title}"${year ? ` (${year})` : ''}`);
    
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        apikey: OMDB_API_KEY,
        t: title,
        y: year,
        type: 'movie',
      },
    });

    if (response.status !== 200) {
      throw new Error(`API returned status ${response.status}`);
    }

    console.log('API Response for', title, ':', response.data);

    if (response.data.Response === 'True') {
      const movieDetails = {
        Poster: response.data.Poster !== 'N/A' ? response.data.Poster : null,
        Title: response.data.Title,
        Year: response.data.Year,
        imdbID: response.data.imdbID,
      };
      console.log('Found movie details:', movieDetails);
      return movieDetails;
    }

    console.log('No movie found for:', title);
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error('Error fetching movie details:', error);
    }
    return null;
  }
}; 