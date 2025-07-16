import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import { Candidate } from "@/data/candidates";
import { CandidateCard } from "./CandidateCard";

interface CandidatesDashboardProps {
  candidates: Candidate[];
  selectedTeam: Candidate[];
  onAddToTeam: (candidate: Candidate) => void;
  onViewProfile: (candidate: Candidate) => void;
}

export function CandidatesDashboard({ 
  candidates, 
  selectedTeam, 
  onAddToTeam, 
  onViewProfile 
}: CandidatesDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [ethnicityFilter, setEthnicityFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const selectedTeamIds = new Set(selectedTeam.map(c => c.id));

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesGender = genderFilter === "all" || candidate.gender === genderFilter;
    const matchesEthnicity = ethnicityFilter === "all" || candidate.ethnicity === ethnicityFilter;
    
    const matchesExperience = experienceFilter === "all" || 
      (experienceFilter === "junior" && candidate.experience <= 2) ||
      (experienceFilter === "mid" && candidate.experience > 2 && candidate.experience <= 5) ||
      (experienceFilter === "senior" && candidate.experience > 5);

    return matchesSearch && matchesGender && matchesEthnicity && matchesExperience;
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case "name":
        aValue = a.name;
        bValue = b.name;
        break;
      case "experience":
        aValue = a.experience;
        bValue = b.experience;
        break;
      case "salary":
        aValue = a.salary;
        bValue = b.salary;
        break;
      case "rating":
        aValue = a.rating;
        bValue = b.rating;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }

    if (typeof aValue === "string") {
      const comparison = aValue.localeCompare(bValue as string);
      return sortOrder === "asc" ? comparison : -comparison;
    } else {
      return sortOrder === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    }
  });

  const availableCandidates = sortedCandidates.filter(candidate => !selectedTeamIds.has(candidate.id));

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Candidates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Non-binary">Non-binary</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ethnicityFilter} onValueChange={setEthnicityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Ethnicity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ethnicities</SelectItem>
                <SelectItem value="Asian">Asian</SelectItem>
                <SelectItem value="Black">Black</SelectItem>
                <SelectItem value="Hispanic">Hispanic</SelectItem>
                <SelectItem value="White">White</SelectItem>
                <SelectItem value="Middle Eastern">Middle Eastern</SelectItem>
                <SelectItem value="Mixed">Mixed</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid (3-5 years)</SelectItem>
                <SelectItem value="senior">Senior (5+ years)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center gap-2"
            >
              {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            {availableCandidates.length} Available Candidates
          </h2>
          {selectedTeam.length > 0 && (
            <Badge variant="secondary">
              {selectedTeam.length}/5 Selected
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {filteredCandidates.length} total matches
          </span>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onAddToTeam={selectedTeam.length < 5 ? onAddToTeam : undefined}
            onViewProfile={onViewProfile}
            isInTeam={selectedTeamIds.has(candidate.id)}
          />
        ))}
      </div>

      {availableCandidates.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No candidates found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}