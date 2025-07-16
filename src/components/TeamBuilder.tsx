import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trash2, Users, Target, Award } from "lucide-react";
import { Candidate, getGenderDistribution, getEthnicityDistribution } from "@/data/candidates";
import { CandidateCard } from "./CandidateCard";

interface TeamBuilderProps {
  selectedTeam: Candidate[];
  onRemoveFromTeam: (candidateId: string) => void;
  onViewProfile: (candidate: Candidate) => void;
}

export function TeamBuilder({ selectedTeam, onRemoveFromTeam, onViewProfile }: TeamBuilderProps) {
  const maxTeamSize = 5;
  const teamSize = selectedTeam.length;
  const progress = (teamSize / maxTeamSize) * 100;

  const genderDistribution = getGenderDistribution(selectedTeam);
  const ethnicityDistribution = getEthnicityDistribution(selectedTeam);

  const getAllSkills = () => {
    const skillsMap = selectedTeam.reduce((acc, candidate) => {
      candidate.skills.forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(skillsMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
  };

  const averageExperience = selectedTeam.length > 0 
    ? Math.round(selectedTeam.reduce((sum, candidate) => sum + candidate.experience, 0) / selectedTeam.length)
    : 0;

  const averageRating = selectedTeam.length > 0
    ? Math.round(selectedTeam.reduce((sum, candidate) => sum + candidate.rating, 0) / selectedTeam.length * 10) / 10
    : 0;

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Team Size</span>
              <span className="text-sm text-muted-foreground">{teamSize}/{maxTeamSize}</span>
            </div>
            <Progress value={progress} className="h-2" />
            {teamSize === maxTeamSize && (
              <Badge variant="default" className="w-fit">
                <Target className="h-3 w-3 mr-1" />
                Team Complete
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      {teamSize > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {selectedTeam.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <img 
                      src={candidate.profileImage} 
                      alt={candidate.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{candidate.name}</h4>
                      <p className="text-sm text-muted-foreground">{candidate.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewProfile(candidate)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveFromTeam(candidate.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Analytics */}
      {teamSize > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Team Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Team Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Average Experience</span>
                  <span className="text-sm font-medium">{averageExperience} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Average Rating</span>
                  <span className="text-sm font-medium">{averageRating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Unique Skills</span>
                  <span className="text-sm font-medium">{getAllSkills().length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Diversity Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Diversity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Gender Distribution</h4>
                  <div className="flex flex-wrap gap-1">
                    {genderDistribution.map(({ gender, count, percentage }) => (
                      <Badge key={gender} variant="secondary" className="text-xs">
                        {gender}: {count} ({percentage}%)
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Ethnicity Distribution</h4>
                  <div className="flex flex-wrap gap-1">
                    {ethnicityDistribution.map(({ ethnicity, count, percentage }) => (
                      <Badge key={ethnicity} variant="secondary" className="text-xs">
                        {ethnicity}: {count} ({percentage}%)
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}