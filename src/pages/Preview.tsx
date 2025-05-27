import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, ChevronUp, Upload, ExternalLink, Home } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWatchHistory } from '@/contexts/WatchHistoryContext';
import { generateLetterboxdCsv } from '@/lib/csvConverter';
import { Checkbox } from "@/components/ui/checkbox";
import { searchMovie } from '@/lib/movieApi';
import testApiKey from '@/lib/testApiKey';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import confetti from 'canvas-confetti';

const Preview = () => {
  const navigate = useNavigate();
  const { entries, originalFile, toggleSelection, toggleAllSelection, selectedCount, setEntries } = useWatchHistory();
  const [isLoadingPosters, setIsLoadingPosters] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500); // Show after scrolling 500px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Test API key when component mounts, but don't show toast
    const verifyApiKey = async () => {
      await testApiKey();
    };
    verifyApiKey();
  }, []);

  useEffect(() => {
    // Redirect to upload if no data is present
    if (!originalFile || entries.length === 0) {
      navigate('/upload');
    }
  }, [originalFile, entries, navigate]);

  useEffect(() => {
    const fetchMoviePosters = async () => {
      if (!entries.length) return;

      setIsLoadingPosters(true);
      const updatedEntries = [...entries];
      let hasUpdates = false;
      let errorCount = 0;

      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (!entry.movieDetails) {
          let retryCount = 0;
          const maxRetries = 3;
          
          while (retryCount < maxRetries) {
            try {
              console.log(`Fetching details for movie ${i + 1}/${entries.length}: ${entry.Title}`);
              const details = await searchMovie(entry.Title, entry.Year);
              
              if (details) {
                updatedEntries[i] = {
                  ...entry,
                  movieDetails: details
                };
                hasUpdates = true;
                break; // Success, exit retry loop
              }
            } catch (error) {
              console.error(`Error fetching details for ${entry.Title}:`, error);
              
              // Check if it's a rate limit error
              if (error.response?.data?.Error === "Request limit reached!") {
                toast({
                  title: "Rate Limit Reached",
                  description: "OMDB API rate limit reached. Waiting 5 seconds before retrying...",
                  variant: "default"
                });
                // Wait 5 seconds before retrying
                await new Promise(resolve => setTimeout(resolve, 5000));
                retryCount++;
                continue;
              }
              
              errorCount++;
              // If we get too many non-rate-limit errors, show a toast and stop
              if (errorCount > 3) {
                toast({
                  title: "API Error",
                  description: "There was an issue fetching movie details. Please check your API key or try again later.",
                  variant: "destructive"
                });
                break;
              }
              break; // Exit retry loop for non-rate-limit errors
            }
          }
          
          if (retryCount === maxRetries) {
            toast({
              title: "Rate Limit Error",
              description: "Unable to fetch more movies due to rate limiting. Please try again later.",
              variant: "destructive"
            });
            break; // Stop processing more movies
          }
          
          // Add a longer delay between requests to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
        }
      }

      if (hasUpdates) {
        setEntries(updatedEntries);
        toast({
          title: "Movies Updated",
          description: "Successfully fetched movie details and posters",
        });
      }
      setIsLoadingPosters(false);
  };

    fetchMoviePosters();
  }, [entries.length, toast, setEntries]);

  // Add confetti effect when modal opens
  useEffect(() => {
    if (showSuccessModal) {
      // First burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4ade80', '#22c55e', '#16a34a'], // Green shades
      });

      // Second burst after a small delay
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 }
        });
      }, 200);
    }
  }, [showSuccessModal]);

  const handleDownload = () => {
    const selectedEntries = entries.filter(entry => entry.isSelected);
    if (selectedEntries.length === 0) {
      toast({
        title: "No movies selected",
        description: "Please select at least one movie to download",
        variant: "destructive"
      });
      return;
    }

    try {
      const csvContent = generateLetterboxdCsv(selectedEntries);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'letterboxd_history.csv';
      link.click();
      URL.revokeObjectURL(link.href);

      // Show success modal and trigger confetti
      setShowSuccessModal(true);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error generating your export file. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLetterboxdUpload = () => {
    window.open('https://letterboxd.com/import/', '_blank');
  };

  if (!originalFile || entries.length === 0) {
    return null;
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/upload')}
            className="mb-4 hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Step 2: Review your movies
          </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              We found {entries.length} movies in your Netflix history.
            </p>
            <div className="space-y-4">
              <Button
                onClick={handleDownload}
                disabled={selectedCount === 0}
                className={cn(
                  "bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg",
                  "hover:scale-105 transition-all duration-300",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Selected ({selectedCount} Movies)
              </Button>
            </div>
        </div>

          {/* Movies Section */}
          <div className="relative">
            {/* Select All Control */}
            <div className="flex items-center justify-start mb-4 gap-2">
              <Checkbox 
                id="selectAll"
                checked={selectedCount === entries.length}
                onCheckedChange={(checked) => toggleAllSelection(!!checked)}
                className={cn(
                  "h-5 w-5 border-2",
                  selectedCount === entries.length ? "border-blue-500" : "border-gray-300",
                  "transition-colors duration-300",
                  "data-[state=checked]:bg-blue-500",
                  "data-[state=checked]:border-blue-500"
                )}
              />
              <label
                htmlFor="selectAll"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Select All ({selectedCount} of {entries.length})
              </label>
        </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {entries.map((entry, index) => (
                <Card 
                  key={index} 
                  className={cn(
                    "hover:shadow-lg transition-all duration-300 cursor-pointer group",
                    "relative overflow-hidden",
                    entry.isSelected && "ring-2 ring-blue-500 shadow-lg"
                  )}
                  onClick={() => toggleSelection(index)}
                >
            <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <div 
                        className={cn(
                          "flex items-center justify-center",
                          "transition-transform duration-300"
                        )}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click from firing
                        }}
                    >
                        <Checkbox
                          checked={entry.isSelected}
                          onCheckedChange={() => toggleSelection(index)}
                          className={cn(
                            "h-5 w-5 border-2",
                            entry.isSelected ? "border-blue-500" : "border-gray-300",
                            "transition-colors duration-300",
                            "data-[state=checked]:bg-blue-500",
                            "data-[state=checked]:border-blue-500"
                          )}
                        />
                      </div>

                      {/* Poster */}
                      <div className="flex-shrink-0">
                        {isLoadingPosters ? (
                          <div className="relative overflow-hidden">
                            <Skeleton className={cn(
                              "w-24 h-36",
                              "after:absolute after:inset-0",
                              "after:bg-gradient-to-r after:from-transparent",
                              "after:via-white/20 after:to-transparent",
                              "after:animate-shimmer after:translate-x-[-100%]"
                            )} />
                          </div>
                        ) : (
                          <img
                            src={entry.movieDetails?.Poster || '/placeholder-poster.svg'}
                            alt={entry.Title}
                            className="w-24 h-36 object-cover rounded-md bg-gray-100"
                          onError={(e) => {
                              console.log('Image load error for:', entry.Title);
                              const img = e.target as HTMLImageElement;
                              img.src = '/placeholder-poster.svg';
                          }}
                        />
                        )}
                      </div>

                      {/* Movie Info */}
                      <div className="flex-grow">
                <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            {entry.Title}
                  </h3>
                          {entry.Year && (
                            <p className="text-gray-500 mt-1">({entry.Year})</p>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                          Watched on {entry.WatchedDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
              ))}
            </div>

            {/* Bottom message */}
            <div className="text-center py-8 text-gray-600 animate-fade-in">
              <p className="text-lg">
                🎬 You've reached the bottom! 🍿
              </p>
              <p className="text-sm mt-2">
                Time to export your movie collection to Letterboxd!
              </p>
            </div>
                      </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Download Successful! 🎉</DialogTitle>
            <DialogDescription className="text-center space-y-2">
              <p className="text-lg mt-4">
                Your movies have been successfully exported to Letterboxd format.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Ready to import your movies to Letterboxd?
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-6">
            <Button 
              onClick={handleLetterboxdUpload}
              className={cn(
                "relative bg-green-600 hover:bg-green-700 text-white font-medium overflow-hidden",
                "after:absolute after:inset-0",
                "after:bg-gradient-to-r after:from-transparent",
                "after:via-white/25 after:to-transparent",
                "after:translate-x-[-100%]",
                "after:animate-[shimmer_2s_infinite]",
                "after:pointer-events-none"
              )}
            >
              <span className="relative z-10 flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                Import to Letterboxd
              </span>
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
    </div>
        </DialogContent>
      </Dialog>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-4",
          "flex items-center gap-2 text-gray-700 hover:text-gray-900",
          "transition-all duration-300 ease-in-out transform",
          "hover:shadow-xl hover:-translate-y-1",
          "z-50",
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        )}
      >
        <span className="text-sm font-medium">Back to top</span>
        <ChevronUp className="w-4 h-4 animate-subtle-bounce" />
      </button>
    </>
  );
};

export default Preview;
