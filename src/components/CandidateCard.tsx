import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, DollarSign, Star, Users, Plus } from "lucide-react";
import { Candidate } from "@/data/candidates";

interface CandidateCardProps {
  candidate: Candidate;
  onAddToTeam?: (candidate: Candidate) => void;
  onViewProfile?: (candidate: Candidate) => void;
  isInTeam?: boolean;
  compact?: boolean;
}

export function CandidateCard({ 
  candidate, 
  onAddToTeam, 
  onViewProfile, 
  isInTeam = false,
  compact = false 
}: CandidateCardProps) {
  const initials = candidate.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${
      isInTeam ? 'ring-2 ring-primary' : 'hover:shadow-glow'
    } ${compact ? 'p-3' : ''}`}>
      <CardHeader className={compact ? "pb-2" : "pb-4"}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className={compact ? "h-10 w-10" : "h-12 w-12"}>
              <AvatarImage src={candidate.profileImage} alt={candidate.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className={`font-semibold ${compact ? 'text-sm' : 'text-lg'}`}>
                {candidate.name}
              </h3>
              <p className={`text-muted-foreground ${compact ? 'text-xs' : 'text-sm'}`}>
                {candidate.position}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{candidate.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={compact ? "pt-0" : ""}>
        <div className="space-y-3">
          {!compact && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{candidate.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{candidate.experience} years</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>${candidate.salary.toLocaleString()}</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, compact ? 3 : 5).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > (compact ? 3 : 5) && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.length - (compact ? 3 : 5)}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between gap-2 pt-2">
            <div className="flex gap-1">
              <Badge variant="outline" className="text-xs">
                {candidate.gender}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {candidate.ethnicity}
              </Badge>
            </div>
            
            <div className="flex gap-2">
              {onViewProfile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewProfile(candidate)}
                  className="text-xs"
                >
                  View
                </Button>
              )}
              {onAddToTeam && !isInTeam && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onAddToTeam(candidate)}
                  className="text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              )}
              {isInTeam && (
                <Badge variant="default" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  In Team
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}