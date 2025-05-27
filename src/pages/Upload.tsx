import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Upload as UploadIcon, 
  Check, 
  X, 
  ArrowLeft, 
  ExternalLink,
  AlertTriangle 
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import StepProgress from '@/components/StepProgress';
import { convertNetflixToLetterboxd } from '@/lib/csvConverter';
import { validateCSVFile } from '@/lib/csvValidator';
import { useWatchHistory } from '@/contexts/WatchHistoryContext';
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Upload = () => {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [errorDetails, setErrorDetails] = useState<{ error: string; details: string } | null>(null);
  const navigate = useNavigate();
  const { setEntries, setOriginalFile } = useWatchHistory();
  const { toast } = useToast();

  const netflixSteps = [
    {
      title: "Go to Netflix Viewing Activity",
      description: "Click the button below to open Netflix viewing activity page in a new tab",
      content: (
        <a 
          href="https://www.netflix.com/viewingactivity" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex"
        >
          <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-base hover:scale-105 transition-all duration-300">
            Open Netflix Viewing Activity
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </a>
      )
    },
    {
      title: "Download History",
      description: "At the bottom of your viewing activity, click 'Download all' to get your ViewingActivity.csv file"
    },
    {
      title: "Upload File",
      description: "Once downloaded, drag and drop the ViewingActivity.csv file here or use the upload button"
    }
  ];

  const handleFile = useCallback(async (file: File) => {
    setFileName(file.name);
    setErrorDetails(null);

    try {
      // Validate the file first
      const validationResult = await validateCSVFile(file);
      
      if (!validationResult.isValid) {
        setUploadState('error');
        setErrorDetails({
          error: validationResult.error || 'Validation Error',
          details: validationResult.details || 'The file could not be validated'
        });
        return;
      }

      setUploadState('uploading');
      setProgress(0);

      // Start progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      // Process the file
      const processedEntries = await convertNetflixToLetterboxd(file);
      
      // Store the results
      setOriginalFile(file);
      setEntries(processedEntries);

      // Complete the progress
      clearInterval(progressInterval);
      setProgress(100);
      setUploadState('success');

      // Navigate to preview after a short delay
      setTimeout(() => navigate('/preview'), 1500);
    } catch (error) {
      setUploadState('error');
      setErrorDetails({
        error: 'Processing Error',
        details: error instanceof Error ? error.message : 'Failed to process the file'
      });
    }
  }, [navigate, setEntries, setOriginalFile]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const handleButtonClick = () => {
    document.getElementById('file-upload')?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Step 1: Upload your Netflix history
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your Netflix viewing history CSV file and we'll start processing your data.
          </p>
        </div>

        {/* Instructions Card */}
        <Card className="max-w-2xl mx-auto mb-8 shadow-lg border-2 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to get your Netflix data:</h2>
            <div className="relative">
              <StepProgress steps={netflixSteps} currentStep={uploadState === 'idle' ? 2 : 3} />
            </div>
          </CardContent>
        </Card>

        {/* Upload Card */}
        <Card className="max-w-2xl mx-auto shadow-lg border-2 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-8">
            {uploadState === 'idle' && (
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50 scale-105' 
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <UploadIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Drop your CSV here or click to upload
                </h3>
                <p className="text-gray-600 mb-6">
                  Make sure it's your Netflix watch history from Account Settings
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleInputChange}
                  className="hidden"
                  id="file-upload"
                />
                <Button 
                  onClick={handleButtonClick}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg hover:scale-105 transition-all duration-300"
                >
                  Choose File
                </Button>
              </div>
            )}

            {uploadState === 'uploading' && (
              <div className="text-center animate-fade-in">
                <div className="h-16 w-16 mx-auto mb-4 relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Processing your data...
                </h3>
                <p className="text-gray-600 mb-6">
                  Converting Netflix format to Letterboxd format
                </p>
                <Progress value={progress} className="w-full mb-4" />
                <p className="text-sm text-gray-500">{fileName}</p>
              </div>
            )}

            {uploadState === 'success' && (
              <div className="text-center animate-fade-in">
                <div className="h-16 w-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-900 mb-2">
                  ✅ File processed successfully!
                </h3>
                <p className="text-gray-600 mb-4">
                  Taking you to preview your movies...
                </p>
                <div className="animate-pulse">
                  <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full animate-[slide-in-right_1.5s_ease-out]"></div>
                  </div>
                </div>
              </div>
            )}

            {uploadState === 'error' && (
              <div className="text-center animate-fade-in">
                <div className="h-16 w-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="h-8 w-8 text-red-600" />
                </div>
                
                <Alert variant="destructive" className="mb-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>{errorDetails?.error || 'Upload Error'}</AlertTitle>
                  <AlertDescription className="mt-2">
                    {errorDetails?.details || 'Something went wrong while processing your file.'}
                  </AlertDescription>
                </Alert>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-amber-900 mb-2">How to fix this:</h4>
                  <ol className="text-left text-amber-800 space-y-2">
                    <li>1. Go to <a href="https://www.netflix.com/viewingactivity" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Netflix Viewing Activity</a></li>
                    <li>2. Scroll to the bottom of the page</li>
                    <li>3. Click "Download all" to get your viewing history</li>
                    <li>4. Upload the downloaded "ViewingActivity.csv" file</li>
                  </ol>
                </div>

                <Button 
                  onClick={() => {
                    setUploadState('idle');
                    setErrorDetails(null);
                  }}
                  className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300"
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
