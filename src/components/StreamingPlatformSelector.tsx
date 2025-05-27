import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export type StreamingPlatform = 'netflix' | 'hbo' | 'disney' | 'prime' | 'hulu';

interface StreamingPlatformSelectorProps {
  activePlatform: StreamingPlatform;
  onPlatformChange: (platform: StreamingPlatform) => void;
}

const platforms = [
  { 
    id: 'netflix', 
    name: 'Netflix', 
    emoji: '🎬',
    available: true 
  },
  { 
    id: 'hbo', 
    name: 'HBO Max', 
    emoji: '🌟',
    available: false 
  },
  { 
    id: 'disney', 
    name: 'Disney+', 
    emoji: '✨',
    available: false 
  },
  { 
    id: 'prime', 
    name: 'Prime', 
    emoji: '📦',
    available: false 
  },
  { 
    id: 'hulu', 
    name: 'Hulu', 
    emoji: '📺',
    available: false 
  },
] as const;

export const StreamingPlatformSelector = ({
  activePlatform,
  onPlatformChange
}: StreamingPlatformSelectorProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <Tabs value={activePlatform} onValueChange={(value) => onPlatformChange(value as StreamingPlatform)}>
        <TabsList className="w-full grid grid-cols-5 p-1">
          {platforms.map((platform) => (
            <TabsTrigger
              key={platform.id}
              value={platform.id}
              disabled={!platform.available}
              className="flex flex-col items-center justify-center gap-1 py-3 px-1 relative min-w-0"
            >
              <span className="text-base">{platform.emoji}</span>
              <span className="text-sm truncate w-full text-center">{platform.name}</span>
              {!platform.available && platform.id === 'hbo' && (
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0"
                >
                  Coming Soon
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
