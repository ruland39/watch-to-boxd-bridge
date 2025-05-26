
import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload as UploadIcon, Check, X, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) {
      setUploadState('error');
      return;
    }

    setFileName(file.name);
    setUploadState('uploading');
    setProgress(0);

    // Simulate file processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('success');
          // Navigate to preview after a short delay
          setTimeout(() => navigate('/preview'), 1500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [navigate]);

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
                <label htmlFor="file-upload">
                  <Button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg hover:scale-105 transition-all duration-300">
                    Choose File
                  </Button>
                </label>
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
                  Parsing your movies and matching titles
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
                  ✅ File uploaded successfully!
                </h3>
                <p className="text-gray-600 mb-4">
                  Redirecting you to review your movies...
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
                <h3 className="text-xl font-semibold text-red-900 mb-2">
                  ❌ We couldn't read that file
                </h3>
                <p className="text-gray-600 mb-6">
                  Make sure it's your Netflix watch history CSV file
                </p>
                <Button 
                  onClick={() => setUploadState('idle')}
                  className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300"
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">📋 How to get your Netflix data:</h4>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Go to your Netflix Account Settings</li>
            <li>2. Click "Download your personal information"</li>
            <li>3. Request your data and wait for the email</li>
            <li>4. Download and find the "ViewingActivity.csv" file</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Upload;
