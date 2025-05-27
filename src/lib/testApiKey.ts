import axios from 'axios';

const testApiKey = async () => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  console.log('Testing API key:', apiKey);
  
  try {
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: apiKey,
        t: 'Inception',  // Using a well-known movie as test
      }
    });
    
    console.log('Test response:', response.data);
    
    if (response.data.Response === 'True') {
      console.log('✅ API key is working correctly!');
      return true;
    } else {
      console.log('❌ API key is not working. Response:', response.data.Error);
      return false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ API Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    } else {
      console.error('❌ Error testing API key:', error);
    }
    return false;
  }
};

export default testApiKey; 