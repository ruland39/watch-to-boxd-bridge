
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, ExternalLink, Check } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Export = () => {
  const navigate = useNavigate();
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    // Simulate CSV download
    const csvContent = "Title,Year,WatchedDate\nThe Social Network,2010,2024-01-15\nInception,2010,2024-01-20";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'letterboxd-import.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/preview')}
            className="mb-4 hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Preview
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Step 3: Export to Letterboxd
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your file is ready! Upload it to Letterboxd to import your movies.
          </p>
        </div>

        {/* Download Section */}
        <Card className="mb-8 shadow-lg animate-fade-in">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="h-20 w-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Download className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ready for Download!
              </h3>
              <p className="text-gray-600">
                We've processed your movies into a Letterboxd-compatible format.
              </p>
            </div>
            
            <Button 
              size="lg"
              onClick={handleDownload}
              className={`px-8 py-4 text-lg transition-all duration-300 hover:scale-105 ${
                downloaded 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {downloaded ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Downloaded! 
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  📁 Download CSV
                </>
              )}
            </Button>
            
            {downloaded && (
              <p className="text-sm text-green-600 mt-2 animate-fade-in">
                ✅ File saved to your downloads folder
              </p>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mb-8 shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              How to Import to Letterboxd
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Go to Letterboxd Import Page
                </h4>
                <p className="text-gray-600 mb-2">
                  Click the button below to open Letterboxd's import tool
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://letterboxd.com/import/', '_blank')}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Letterboxd Import
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Upload the CSV you just downloaded
                </h4>
                <p className="text-gray-600">
                  Select your downloaded CSV file and upload it to Letterboxd
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Review and confirm your import
                </h4>
                <p className="text-gray-600">
                  Letterboxd will show you a preview. Confirm to add movies to your profile!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tip Section */}
        <Card className="mb-8 border-blue-200 bg-blue-50 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Pro Tip
                </h3>
                <p className="text-blue-800">
                  You need a free Letterboxd account to import your movies. Sign up at{" "}
                  <a 
                    href="https://letterboxd.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-600 transition-colors duration-300"
                  >
                    letterboxd.com
                  </a>{" "}
                  if you don't have one yet!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Done Button */}
        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => navigate('/')}
            variant="outline"
            className="px-8 py-4 text-lg hover:scale-105 transition-all duration-300"
          >
            All done ✅
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Want to convert more files? You can always come back and upload another CSV!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Export;
