import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Download, Share2, CheckCircle, TrendingUp, Users, Award } from "lucide-react";
import { Candidate, getGenderDistribution, getEthnicityDistribution } from "@/data/candidates";

interface ResultsSummaryProps {
  selectedTeam: Candidate[];
}

export function ResultsSummary({ selectedTeam }: ResultsSummaryProps) {
  const isComplete = selectedTeam.length === 5;
  const genderDistribution = getGenderDistribution(selectedTeam);
  const ethnicityDistribution = getEthnicityDistribution(selectedTeam);

  const totalSalary = selectedTeam.reduce((sum, candidate) => sum + candidate.salary, 0);
  const averageRating = selectedTeam.length > 0 
    ? Math.round(selectedTeam.reduce((sum, candidate) => sum + candidate.rating, 0) / selectedTeam.length * 10) / 10
    : 0;

  const allSkills = [...new Set(selectedTeam.flatMap(candidate => candidate.skills))];
  const skillCoverage = allSkills.length;

  const generateJustification = () => {
    if (selectedTeam.length === 0) return "No team selected yet.";
    
    const diversityMetrics = {
      gender: genderDistribution.length,
      ethnicity: ethnicityDistribution.length,
      skills: skillCoverage,
      experience: selectedTeam.map(c => c.experience)
    };

    const justifications = [];
    
    if (diversityMetrics.gender >= 2) {
      justifications.push(`Gender diversity: ${diversityMetrics.gender} different genders represented`);
    }
    
    if (diversityMetrics.ethnicity >= 3) {
      justifications.push(`Strong ethnic diversity: ${diversityMetrics.ethnicity} different ethnicities`);
    }
    
    if (diversityMetrics.skills >= 10) {
      justifications.push(`Comprehensive skill set: ${diversityMetrics.skills} unique skills covered`);
    }
    
    const avgExp = Math.round(diversityMetrics.experience.reduce((a, b) => a + b, 0) / diversityMetrics.experience.length);
    if (avgExp >= 4) {
      justifications.push(`Strong experience base: ${avgExp} years average experience`);
    }
    
    if (averageRating >= 4.5) {
      justifications.push(`High-quality candidates: ${averageRating}/5.0 average rating`);
    }

    return justifications.length > 0 
      ? justifications.join('. ') + '.'
      : 'This team provides a good balance of skills and diversity.';
  };

  if (selectedTeam.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No team selected</h3>
            <p className="text-muted-foreground">
              Add candidates to your team to see the results summary
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isComplete ? (
              <CheckCircle className="h-5 w-5 text-success" />
            ) : (
              <Users className="h-5 w-5 text-warning" />
            )}
            Team Selection Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {isComplete ? "Your team is complete!" : `Select ${5 - selectedTeam.length} more candidates to complete your team`}
              </p>
              <Badge variant={isComplete ? "default" : "secondary"} className="mt-2">
                {selectedTeam.length}/5 Team Members
              </Badge>
            </div>
            {isComplete && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Team Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Selected Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {selectedTeam.map((candidate) => {
              const initials = candidate.name.split(' ').map(n => n[0]).join('').toUpperCase();
              return (
                <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={candidate.profileImage} alt={candidate.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{candidate.name}</h4>
                      <p className="text-sm text-muted-foreground">{candidate.position}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {candidate.gender}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {candidate.ethnicity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">${candidate.salary.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{candidate.experience} years exp</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Average Rating</span>
                <span className="text-sm font-medium">{averageRating}/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Salary</span>
                <span className="text-sm font-medium">${totalSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avg Experience</span>
                <span className="text-sm font-medium">
                  {Math.round(selectedTeam.reduce((sum, c) => sum + c.experience, 0) / selectedTeam.length)} years
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="h-4 w-4" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Unique Skills</span>
                <span className="text-sm font-medium">{skillCoverage}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {allSkills.slice(0, 6).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {allSkills.length > 6 && (
                  <Badge variant="outline" className="text-xs">
                    +{allSkills.length - 6}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4" />
              Diversity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Gender Diversity</span>
                <span className="text-sm font-medium">{genderDistribution.length} types</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Ethnic Diversity</span>
                <span className="text-sm font-medium">{ethnicityDistribution.length} types</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Diversity Score</span>
                <span className="text-sm font-medium">
                  {Math.round(((genderDistribution.length / 3) + (ethnicityDistribution.length / 5)) * 50)}/100
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Justification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Selection Justification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">
              {generateJustification()}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium mb-2">Diversity Breakdown</h4>
                <div className="space-y-1">
                  <div className="text-sm">
                    <strong>Gender:</strong> {genderDistribution.map(g => `${g.gender} (${g.count})`).join(', ')}
                  </div>
                  <div className="text-sm">
                    <strong>Ethnicity:</strong> {ethnicityDistribution.map(e => `${e.ethnicity} (${e.count})`).join(', ')}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Key Strengths</h4>
                <ul className="text-sm space-y-1">
                  <li>• Balanced skill coverage across {skillCoverage} areas</li>
                  <li>• Strong performance ratings (avg {averageRating}/5.0)</li>
                  <li>• Diverse backgrounds and perspectives</li>
                  <li>• Solid experience foundation</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}