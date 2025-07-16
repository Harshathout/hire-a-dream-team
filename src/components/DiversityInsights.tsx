import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, PieChart, TrendingUp, Users2 } from "lucide-react";
import { Candidate, getGenderDistribution, getEthnicityDistribution, getSkillsDistribution } from "@/data/candidates";

interface DiversityInsightsProps {
  candidates: Candidate[];
  selectedTeam: Candidate[];
}

export function DiversityInsights({ candidates, selectedTeam }: DiversityInsightsProps) {
  const allGenderDistribution = getGenderDistribution(candidates);
  const allEthnicityDistribution = getEthnicityDistribution(candidates);
  const allSkillsDistribution = getSkillsDistribution(candidates);

  const teamGenderDistribution = getGenderDistribution(selectedTeam);
  const teamEthnicityDistribution = getEthnicityDistribution(selectedTeam);

  const calculateDiversityScore = (team: Candidate[]) => {
    if (team.length === 0) return 0;
    
    const genderVariety = new Set(team.map(c => c.gender)).size;
    const ethnicityVariety = new Set(team.map(c => c.ethnicity)).size;
    const skillsVariety = new Set(team.flatMap(c => c.skills)).size;
    
    // Simple diversity score calculation
    const genderScore = Math.min(genderVariety / 3, 1) * 30; // Max 30 points
    const ethnicityScore = Math.min(ethnicityVariety / 5, 1) * 40; // Max 40 points
    const skillsScore = Math.min(skillsVariety / 10, 1) * 30; // Max 30 points
    
    return Math.round(genderScore + ethnicityScore + skillsScore);
  };

  const diversityScore = calculateDiversityScore(selectedTeam);

  return (
    <div className="space-y-6">
      {/* Diversity Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Diversity Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{diversityScore}/100</div>
              <p className="text-sm text-muted-foreground">
                {diversityScore >= 80 ? "Excellent diversity" : 
                 diversityScore >= 60 ? "Good diversity" : 
                 diversityScore >= 40 ? "Moderate diversity" : 
                 "Low diversity"}
              </p>
            </div>
            <Progress value={diversityScore} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-muted-foreground">Gender</div>
                <div className="font-semibold">{new Set(selectedTeam.map(c => c.gender)).size}/4</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Ethnicity</div>
                <div className="font-semibold">{new Set(selectedTeam.map(c => c.ethnicity)).size}/6</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Skills</div>
                <div className="font-semibold">{new Set(selectedTeam.flatMap(c => c.skills)).size}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gender Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users2 className="h-5 w-5" />
            Gender Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">All Candidates</h4>
              <div className="space-y-2">
                {allGenderDistribution.map(({ gender, count, percentage }) => (
                  <div key={gender} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-sm">{gender}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={percentage} className="w-20 h-2" />
                      <span className="text-sm font-medium w-12 text-right">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedTeam.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Selected Team</h4>
                <div className="space-y-2">
                  {teamGenderDistribution.map(({ gender, count, percentage }) => (
                    <div key={gender} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-success"></div>
                        <span className="text-sm">{gender}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={percentage} className="w-20 h-2" />
                        <span className="text-sm font-medium w-12 text-right">{percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ethnicity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Ethnicity Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">All Candidates</h4>
              <div className="space-y-2">
                {allEthnicityDistribution.map(({ ethnicity, count, percentage }) => (
                  <div key={ethnicity} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-sm">{ethnicity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={percentage} className="w-20 h-2" />
                      <span className="text-sm font-medium w-12 text-right">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedTeam.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Selected Team</h4>
                <div className="space-y-2">
                  {teamEthnicityDistribution.map(({ ethnicity, count, percentage }) => (
                    <div key={ethnicity} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-success"></div>
                        <span className="text-sm">{ethnicity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={percentage} className="w-20 h-2" />
                        <span className="text-sm font-medium w-12 text-right">{percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Skills Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Top Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {allSkillsDistribution.map(({ skill, count, percentage }) => (
              <div key={skill} className="flex items-center justify-between">
                <span className="text-sm">{skill}</span>
                <div className="flex items-center gap-2">
                  <Progress value={percentage} className="w-20 h-2" />
                  <span className="text-sm font-medium w-12 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}