export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: number;
  position: string;
  gender: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say';
  ethnicity: 'Asian' | 'Black' | 'Hispanic' | 'White' | 'Middle Eastern' | 'Mixed' | 'Other';
  skills: string[];
  education: string;
  previousCompany: string;
  salary: number;
  availability: 'Immediate' | '2 weeks' | '1 month' | '3 months';
  remote: boolean;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  rating: number;
  notes?: string;
  profileImage?: string;
}

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    experience: 5,
    position: 'Senior Frontend Developer',
    gender: 'Female',
    ethnicity: 'Asian',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    education: 'MS Computer Science - Stanford',
    previousCompany: 'Meta',
    salary: 145000,
    availability: 'Immediate',
    remote: true,
    portfolio: 'https://sarahchen.dev',
    linkedin: 'https://linkedin.com/in/sarahchen',
    github: 'https://github.com/sarahchen',
    rating: 4.8,
    notes: 'Excellent technical skills, strong leadership experience',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@email.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    experience: 3,
    position: 'Backend Developer',
    gender: 'Male',
    ethnicity: 'Black',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes'],
    education: 'BS Computer Science - MIT',
    previousCompany: 'Stripe',
    salary: 125000,
    availability: '2 weeks',
    remote: false,
    portfolio: 'https://marcusj.dev',
    linkedin: 'https://linkedin.com/in/marcusjohnson',
    github: 'https://github.com/marcusj',
    rating: 4.6,
    notes: 'Strong backend architecture skills, excellent team player',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena.rodriguez@email.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    experience: 7,
    position: 'Full Stack Developer',
    gender: 'Female',
    ethnicity: 'Hispanic',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
    education: 'BS Software Engineering - UT Austin',
    previousCompany: 'Shopify',
    salary: 135000,
    availability: '1 month',
    remote: true,
    portfolio: 'https://elenarodriguez.dev',
    linkedin: 'https://linkedin.com/in/elenarodriguez',
    github: 'https://github.com/elenarodriguez',
    rating: 4.9,
    notes: 'Exceptional full-stack capabilities, mentoring experience',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    experience: 2,
    position: 'Junior Frontend Developer',
    gender: 'Male',
    ethnicity: 'Asian',
    skills: ['Vue.js', 'JavaScript', 'CSS', 'HTML', 'Git'],
    education: 'Coding Bootcamp - General Assembly',
    previousCompany: 'Startup Inc.',
    salary: 85000,
    availability: 'Immediate',
    remote: true,
    portfolio: 'https://davidkim.dev',
    linkedin: 'https://linkedin.com/in/davidkim',
    github: 'https://github.com/davidkim',
    rating: 4.2,
    notes: 'Eager to learn, strong foundation in frontend technologies',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+1 (555) 567-8901',
    location: 'Chicago, IL',
    experience: 6,
    position: 'DevOps Engineer',
    gender: 'Male',
    ethnicity: 'Middle Eastern',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    education: 'MS Computer Engineering - University of Illinois',
    previousCompany: 'Netflix',
    salary: 140000,
    availability: '2 weeks',
    remote: false,
    portfolio: 'https://ahmedhassan.dev',
    linkedin: 'https://linkedin.com/in/ahmedhassan',
    github: 'https://github.com/ahmedhassan',
    rating: 4.7,
    notes: 'Expert in cloud infrastructure and CI/CD pipelines',
    profileImage: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '6',
    name: 'Taylor Smith',
    email: 'taylor.smith@email.com',
    phone: '+1 (555) 678-9012',
    location: 'Denver, CO',
    experience: 4,
    position: 'UI/UX Designer',
    gender: 'Non-binary',
    ethnicity: 'White',
    skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'HTML/CSS'],
    education: 'BA Graphic Design - Art Institute',
    previousCompany: 'Airbnb',
    salary: 110000,
    availability: '3 months',
    remote: true,
    portfolio: 'https://taylorsmith.design',
    linkedin: 'https://linkedin.com/in/taylorsmith',
    github: 'https://github.com/taylorsmith',
    rating: 4.5,
    notes: 'Creative designer with strong technical understanding',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '7',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+1 (555) 789-0123',
    location: 'Boston, MA',
    experience: 8,
    position: 'Senior Backend Developer',
    gender: 'Female',
    ethnicity: 'Asian',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Redis', 'MySQL'],
    education: 'MS Computer Science - Harvard',
    previousCompany: 'Google',
    salary: 165000,
    availability: '1 month',
    remote: false,
    portfolio: 'https://priyapatel.dev',
    linkedin: 'https://linkedin.com/in/priyapatel',
    github: 'https://github.com/priyapatel',
    rating: 4.9,
    notes: 'Senior developer with extensive microservices experience',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '8',
    name: 'Jordan Williams',
    email: 'jordan.williams@email.com',
    phone: '+1 (555) 890-1234',
    location: 'Atlanta, GA',
    experience: 3,
    position: 'Mobile Developer',
    gender: 'Male',
    ethnicity: 'Black',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'REST APIs'],
    education: 'BS Computer Science - Georgia Tech',
    previousCompany: 'Spotify',
    salary: 120000,
    availability: 'Immediate',
    remote: true,
    portfolio: 'https://jordanwilliams.dev',
    linkedin: 'https://linkedin.com/in/jordanwilliams',
    github: 'https://github.com/jordanwilliams',
    rating: 4.4,
    notes: 'Mobile development specialist with cross-platform experience',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '9',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '+1 (555) 901-2345',
    location: 'Miami, FL',
    experience: 5,
    position: 'Data Scientist',
    gender: 'Female',
    ethnicity: 'Hispanic',
    skills: ['Python', 'TensorFlow', 'Pandas', 'SQL', 'Machine Learning'],
    education: 'PhD Data Science - University of Miami',
    previousCompany: 'Tesla',
    salary: 155000,
    availability: '2 weeks',
    remote: true,
    portfolio: 'https://mariasantos.dev',
    linkedin: 'https://linkedin.com/in/mariasantos',
    github: 'https://github.com/mariasantos',
    rating: 4.8,
    notes: 'Data science expert with ML and AI experience',
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '10',
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    phone: '+1 (555) 012-3456',
    location: 'Portland, OR',
    experience: 4,
    position: 'Product Manager',
    gender: 'Non-binary',
    ethnicity: 'Mixed',
    skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics', 'Roadmapping'],
    education: 'MBA - Stanford Graduate School of Business',
    previousCompany: 'Uber',
    salary: 130000,
    availability: '1 month',
    remote: false,
    portfolio: 'https://alexthompson.dev',
    linkedin: 'https://linkedin.com/in/alexthompson',
    rating: 4.6,
    notes: 'Strategic product manager with strong technical background',
    profileImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop&crop=face'
  }
];

export const getGenderDistribution = (candidates: Candidate[]) => {
  const distribution = candidates.reduce((acc, candidate) => {
    acc[candidate.gender] = (acc[candidate.gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(distribution).map(([gender, count]) => ({
    gender,
    count,
    percentage: Math.round((count / candidates.length) * 100)
  }));
};

export const getEthnicityDistribution = (candidates: Candidate[]) => {
  const distribution = candidates.reduce((acc, candidate) => {
    acc[candidate.ethnicity] = (acc[candidate.ethnicity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(distribution).map(([ethnicity, count]) => ({
    ethnicity,
    count,
    percentage: Math.round((count / candidates.length) * 100)
  }));
};

export const getSkillsDistribution = (candidates: Candidate[]) => {
  const skillsMap = candidates.reduce((acc, candidate) => {
    candidate.skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(skillsMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([skill, count]) => ({
      skill,
      count,
      percentage: Math.round((count / candidates.length) * 100)
    }));
};