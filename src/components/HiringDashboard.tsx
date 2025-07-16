import { useState } from "react";
import { mockCandidates, Candidate } from "@/data/candidates";
import { Navigation } from "./Navigation";
import { CandidatesDashboard } from "./CandidatesDashboard";
import { TeamBuilder } from "./TeamBuilder";
import { DiversityInsights } from "./DiversityInsights";
import { ResultsSummary } from "./ResultsSummary";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Star, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function HiringDashboard() {
  const [activeTab, setActiveTab] = useState("candidates");
  const [selectedTeam, setSelectedTeam] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const { toast } = useToast();

  const handleAddToTeam = (candidate: Candidate) => {
    if (selectedTeam.length >= 5) {
      toast({
        title: "Team Full",
        description: "You can only select up to 5 team members.",
        variant: "destructive",
      });
      return;
    }

    if (selectedTeam.some(member => member.id === candidate.id)) {
      toast({
        title: "Already Selected",
        description: "This candidate is already in your team.",
        variant: "destructive",
      });
      return;
    }

    setSelectedTeam([...selectedTeam, candidate]);
    toast({
      title: "Added to Team",
      description: `${candidate.name} has been added to your team.`,
    });
  };

  const handleRemoveFromTeam = (candidateId: string) => {
    const candidate = selectedTeam.find(c => c.id === candidateId);
    setSelectedTeam(selectedTeam.filter(member => member.id !== candidateId));
    toast({
      title: "Removed from Team",
      description: `${candidate?.name} has been removed from your team.`,
    });
  };

  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowProfile(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "candidates":
        return (
          <CandidatesDashboard
            candidates={mockCandidates}
            selectedTeam={selectedTeam}
            onAddToTeam={handleAddToTeam}
            onViewProfile={handleViewProfile}
          />
        );
      case "team":
        return (
          <TeamBuilder
            selectedTeam={selectedTeam}
            onRemoveFromTeam={handleRemoveFromTeam}
            onViewProfile={handleViewProfile}
          />
        );
      case "insights":
        return (
          <DiversityInsights
            candidates={mockCandidates}
            selectedTeam={selectedTeam}
          />
        );
      case "results":
        return (
          <ResultsSummary
            selectedTeam={selectedTeam}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        teamSize={selectedTeam.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Candidate Profile</DialogTitle>
          </DialogHeader>
          
          {selectedCandidate && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedCandidate.profileImage} alt={selectedCandidate.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {selectedCandidate.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{selectedCandidate.name}</h2>
                  <p className="text-lg text-muted-foreground">{selectedCandidate.position}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedCandidate.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedCandidate.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{selectedCandidate.rating}/5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact & Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Email:</strong> {selectedCandidate.email}</div>
                    <div><strong>Phone:</strong> {selectedCandidate.phone}</div>
                    <div><strong>Location:</strong> {selectedCandidate.location}</div>
                    <div><strong>Remote:</strong> {selectedCandidate.remote ? "Yes" : "No"}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Employment Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Previous Company:</strong> {selectedCandidate.previousCompany}</div>
                    <div><strong>Expected Salary:</strong> ${selectedCandidate.salary.toLocaleString()}</div>
                    <div><strong>Availability:</strong> {selectedCandidate.availability}</div>
                    <div><strong>Education:</strong> {selectedCandidate.education}</div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-semibold mb-3">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Diversity Info */}
              <div>
                <h3 className="font-semibold mb-3">Diversity Information</h3>
                <div className="flex gap-2">
                  <Badge variant="outline">{selectedCandidate.gender}</Badge>
                  <Badge variant="outline">{selectedCandidate.ethnicity}</Badge>
                </div>
              </div>

              {/* Links */}
              {(selectedCandidate.portfolio || selectedCandidate.linkedin || selectedCandidate.github) && (
                <div>
                  <h3 className="font-semibold mb-3">Links</h3>
                  <div className="flex gap-2">
                    {selectedCandidate.portfolio && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedCandidate.portfolio} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Portfolio
                        </a>
                      </Button>
                    )}
                    {selectedCandidate.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedCandidate.linkedin} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {selectedCandidate.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedCandidate.github} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedCandidate.notes && (
                <div>
                  <h3 className="font-semibold mb-3">Notes</h3>
                  <p className="text-sm text-muted-foreground">{selectedCandidate.notes}</p>
                </div>
              )}

              {/* Action Button */}
              <div className="flex justify-end">
                {!selectedTeam.some(member => member.id === selectedCandidate.id) && selectedTeam.length < 5 && (
                  <Button onClick={() => {
                    handleAddToTeam(selectedCandidate);
                    setShowProfile(false);
                  }}>
                    Add to Team
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}