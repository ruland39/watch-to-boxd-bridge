
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Edit, AlertTriangle, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface Movie {
  id: string;
  title: string;
  year: number;
  watchedDate: string;
  confidence: 'High' | 'Medium' | 'Low';
  selected: boolean;
}

const Preview = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([
    { id: '1', title: 'The Social Network', year: 2010, watchedDate: '2024-01-15', confidence: 'High', selected: true },
    { id: '2', title: 'Inception', year: 2010, watchedDate: '2024-01-20', confidence: 'High', selected: true },
    { id: '3', title: 'The Dark Knight', year: 2008, watchedDate: '2024-02-01', confidence: 'Medium', selected: true },
    { id: '4', title: 'Interstellar', year: 2014, watchedDate: '2024-02-10', confidence: 'High', selected: true },
    { id: '5', title: 'Parasite', year: 2019, watchedDate: '2024-02-15', confidence: 'Low', selected: false },
  ]);

  const selectedCount = movies.filter(movie => movie.selected).length;
  const lowConfidenceCount = movies.filter(movie => movie.confidence === 'Low').length;

  const toggleMovie = (id: string) => {
    setMovies(prev => prev.map(movie => 
      movie.id === id ? { ...movie, selected: !movie.selected } : movie
    ));
  };

  const getConfidenceBadge = (confidence: string) => {
    const variants = {
      High: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Low: 'bg-red-100 text-red-800'
    };
    return (
      <Badge className={variants[confidence as keyof typeof variants]}>
        {confidence}
      </Badge>
    );
  };

  return (
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've matched your Netflix history to movie titles. You can uncheck any movie you don't want to import.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{movies.length}</div>
              <div className="text-gray-600">Total Movies Found</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{selectedCount}</div>
              <div className="text-gray-600">Selected for Import</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{lowConfidenceCount}</div>
              <div className="text-gray-600">Need Review</div>
            </CardContent>
          </Card>
        </div>

        {/* Warning for low matches */}
        {lowConfidenceCount > 0 && (
          <Card className="mb-8 border-orange-200 bg-orange-50 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900">
                    ⚠️ Some titles didn't match perfectly
                  </h3>
                  <p className="text-orange-800">
                    You can fix them manually or skip these movies. Low confidence matches are unchecked by default.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Movies Table */}
        <Card className="shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Movie Collection</span>
              <span className="text-sm font-normal text-gray-500">
                {selectedCount} of {movies.length} selected
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Include</TableHead>
                  <TableHead>🎬 Title</TableHead>
                  <TableHead>📅 Watched Date</TableHead>
                  <TableHead>🧠 Match Confidence</TableHead>
                  <TableHead className="w-20">Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movies.map((movie) => (
                  <TableRow 
                    key={movie.id} 
                    className={`transition-all duration-300 hover:bg-gray-50 ${
                      movie.selected ? 'bg-green-50/50' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={movie.selected}
                        onCheckedChange={() => toggleMovie(movie.id)}
                        className="hover:scale-110 transition-transform duration-200"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{movie.title}</div>
                        <div className="text-sm text-gray-500">({movie.year})</div>
                      </div>
                    </TableCell>
                    <TableCell>{movie.watchedDate}</TableCell>
                    <TableCell>{getConfidenceBadge(movie.confidence)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="text-center mt-8">
          <Button 
            size="lg"
            onClick={() => navigate('/export')}
            disabled={selectedCount === 0}
            className="px-8 py-4 text-lg bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300"
          >
            Continue to Export
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          {selectedCount === 0 && (
            <p className="text-sm text-gray-500 mt-2">Select at least one movie to continue</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
