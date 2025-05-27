interface ValidationResult {
  isValid: boolean;
  error?: string;
  details?: string;
}

const NETFLIX_REQUIRED_HEADERS = ['Title', 'Date'];
const LETTERBOXD_HEADERS = ['Title', 'Year', 'WatchedDate'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  'text/csv',
  'application/csv',
  'application/vnd.ms-excel'
];

const isLetterboxdFormat = (headers: string[]): boolean => {
  const normalizedHeaders = headers.map(h => h.trim().toLowerCase());
  return LETTERBOXD_HEADERS.every(header => 
    normalizedHeaders.includes(header.toLowerCase())
  );
};

export const validateCSVFile = async (file: File): Promise<ValidationResult> => {
  // 1. File type validation
  if (!file.name.toLowerCase().endsWith('.csv')) {
    return {
      isValid: false,
      error: "Invalid file type",
      details: "Please upload a CSV file with .csv extension"
    };
  }

  // 2. File size validation
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: "File too large",
      details: "The file size should not exceed 10MB"
    };
  }

  // 3. MIME type validation
  if (!ALLOWED_MIME_TYPES.includes(file.type) && file.type !== '') {
    return {
      isValid: false,
      error: "Invalid file format",
      details: "The file must be a valid CSV file"
    };
  }

  try {
    // 4. Content validation
    const content = await file.text();
    
    // Check if file is empty
    if (!content.trim()) {
      return {
        isValid: false,
        error: "Empty file",
        details: "The CSV file appears to be empty"
      };
    }

    // Basic CSV structure validation
    const lines = content.split('\n');
    if (lines.length < 2) {
      return {
        isValid: false,
        error: "Invalid CSV structure",
        details: "The file should contain at least a header row and one data row"
      };
    }

    // Header validation
    const headers = lines[0].toLowerCase().split(',');
    
    // Check if it's already a Letterboxd format file
    if (isLetterboxdFormat(headers)) {
      return {
        isValid: false,
        error: "Already converted file",
        details: "This file appears to be already in Letterboxd format. You can import this file directly to Letterboxd without converting it again. Go to letterboxd.com/import to upload this file."
      };
    }

    // Check for Netflix ViewingActivity structure
    const hasRequiredHeaders = NETFLIX_REQUIRED_HEADERS.every(header => 
      headers.some(h => h.trim().toLowerCase().includes(header.toLowerCase()))
    );

    if (!hasRequiredHeaders) {
      return {
        isValid: false,
        error: "Invalid Netflix history format",
        details: "This doesn't look like a Netflix viewing history file. Please make sure you're uploading the correct CSV file from Netflix (ViewingActivity.csv)"
      };
    }

    // 5. Basic content sanitation check
    const hasSuspiciousContent = content.includes('<script') || 
                                content.includes('javascript:') ||
                                content.includes('data:') ||
                                content.includes('vbscript:');
    
    if (hasSuspiciousContent) {
      return {
        isValid: false,
        error: "Security warning",
        details: "The file contains potentially malicious content"
      };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: "File processing error",
      details: "Unable to read the file content. Please make sure it's a valid CSV file"
    };
  }
}; 