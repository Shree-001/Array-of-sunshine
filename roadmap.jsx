import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoadmapHeader from './components/RoadmapHeader';
import TimelinePhase from './components/TimelinePhase';
import MilestoneCard from './components/MilestoneCard';
import ProgressTracker from './components/ProgressTracker';
import AlternativePaths from './components/AlternativePaths';

const LearningRoadmap = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [activeView, setActiveView] = useState('timeline');
  const [showCelebration, setShowCelebration] = useState(false);

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock roadmap data
  const roadmapData = {
    id: "fullstack-web-dev",
    title: "Full Stack Web Development",
    description: "Master modern web development from frontend to backend with hands-on projects",
    startDate: "2024-01-15",
    targetDate: "2024-07-15",
    estimatedHours: 240,
    enrolledCount: 15420,
    currentStreak: 12,
    completedModules: 18,
    totalModules: 32,
    timeInvested: 85,
    phases: [
      {
        id: "foundation",
        title: "Foundation Phase",
        description: "Build strong fundamentals in HTML, CSS, and JavaScript",
        type: "foundation",
        difficulty: "beginner",
        duration: 8,
        progress: 100,
        modules: [
          {
            id: "html-basics",
            title: "HTML Fundamentals",
            description: "Learn semantic HTML structure and best practices",
            duration: "3 hours",
            type: "video",
            completed: true,
            skills: ["HTML5", "Semantic Markup", "Accessibility"]
          },
          {
            id: "css-styling",
            title: "CSS Styling & Layout",
            description: "Master CSS Grid, Flexbox, and responsive design",
            duration: "5 hours",
            type: "video",
            completed: true,
            skills: ["CSS3", "Flexbox", "Grid", "Responsive Design"]
          },
          {
            id: "js-fundamentals",
            title: "JavaScript Essentials",
            description: "Core JavaScript concepts and DOM manipulation",
            duration: "8 hours",
            type: "project",
            completed: true,
            skills: ["JavaScript", "DOM", "ES6+", "Event Handling"]
          }
        ],
        milestones: [
          {
            id: "first-website",
            title: "Build Your First Website",
            description: "Create a responsive portfolio website using HTML, CSS, and JavaScript",
            dueDate: "2024-02-15",
            completed: true,
            completedDate: "2024-02-12",
            difficulty: "easy",
            points: 100,
            requirements: [
              { title: "Responsive design implementation", completed: true },
              { title: "Interactive JavaScript features", completed: true },
              { title: "Semantic HTML structure", completed: true }
            ],
            skills: ["HTML", "CSS", "JavaScript", "Responsive Design"]
          }
        ],
        resources: [
          {
            id: "mdn-docs",
            title: "MDN Web Docs",
            description: "Comprehensive web development documentation",
            type: "free",
            rating: 4.9
          },
          {
            id: "css-tricks",
            title: "CSS-Tricks Complete Guide",
            description: "In-depth CSS tutorials and references",
            type: "free",
            rating: 4.8
          }
        ]
      },
      {
        id: "frontend-frameworks",
        title: "Frontend Frameworks",
        description: "Learn React.js and modern frontend development practices",
        type: "intermediate",
        difficulty: "intermediate",
        duration: 10,
        progress: 65,
        modules: [
          {
            id: "react-basics",
            title: "React Fundamentals",
            description: "Components, props, state, and lifecycle methods",
            duration: "6 hours",
            type: "video",
            completed: true,
            skills: ["React", "JSX", "Components", "State Management"]
          },
          {
            id: "react-hooks",
            title: "React Hooks & Context",
            description: "Modern React patterns with hooks and context API",
            duration: "4 hours",
            type: "video",
            inProgress: true,
            skills: ["React Hooks", "Context API", "useEffect", "useState"]
          },
          {
            id: "react-project",
            title: "React Todo Application",
            description: "Build a full-featured todo app with React",
            duration: "8 hours",
            type: "project",
            completed: false,
            skills: ["React", "State Management", "API Integration"]
          }
        ],
        milestones: [
          {
            id: "react-app",
            title: "React Application Deployment",
            description: "Build and deploy a React application with modern features",
            dueDate: "2024-04-01",
            completed: false,
            difficulty: "medium",
            points: 200,
            requirements: [
              { title: "Component-based architecture", completed: true },
              { title: "State management implementation", completed: false },
              { title: "API integration", completed: false }
            ],
            skills: ["React", "Deployment", "State Management"]
          }
        ],
        resources: [
          {
            id: "react-docs",
            title: "Official React Documentation",
            description: "Learn React from the official documentation",
            type: "free",
            rating: 4.9
          }
        ]
      },
      {
        id: "backend-development",
        title: "Backend Development",
        description: "Server-side development with Node.js and databases",
        type: "advanced",
        difficulty: "advanced",
        duration: 12,
        progress: 25,
        modules: [
          {
            id: "nodejs-basics",
            title: "Node.js Fundamentals",
            description: "Server-side JavaScript with Node.js and Express",
            duration: "6 hours",
            type: "video",
            completed: true,
            skills: ["Node.js", "Express", "Server Development"]
          },
          {
            id: "database-design",
            title: "Database Design & MongoDB",
            description: "NoSQL database design and MongoDB operations",
            duration: "5 hours",
            type: "video",
            completed: false,
            skills: ["MongoDB", "Database Design", "NoSQL"]
          },
          {
            id: "api-development",
            title: "RESTful API Development",
            description: "Build scalable APIs with authentication",
            duration: "8 hours",
            type: "project",
            completed: false,
            skills: ["REST API", "Authentication", "JWT"]
          }
        ],
        milestones: [
          {
            id: "fullstack-app",
            title: "Full Stack Application",
            description: "Complete MERN stack application with authentication",
            dueDate: "2024-06-15",
            completed: false,
            difficulty: "advanced",
            points: 500,
            requirements: [
              { title: "Frontend React application", completed: false },
              { title: "Backend API with Node.js", completed: false },
              { title: "Database integration", completed: false },
              { title: "User authentication", completed: false }
            ],
            skills: ["MERN Stack", "Authentication", "Full Stack Development"]
          }
        ],
        resources: [
          {
            id: "nodejs-docs",
            title: "Node.js Official Documentation",
            description: "Complete Node.js reference and tutorials",
            type: "free",
            rating: 4.8
          }
        ]
      }
    ]
  };

  // Mock progress data
  const progressData = {
    currentStreak: 12,
    longestStreak: 28,
    weeklyGoalHours: 10,
    weeklyActualMinutes: 420, // 7 hours
    completedModules: 18,
    totalModules: 32,
    totalPoints: 2850,
    weeklyPoints: 150,
    recentAchievements: [
      {
        id: "streak-master",
        title: "Streak Master",
        description: "Maintained 10+ day learning streak",
        icon: "Flame",
        rarity: "epic",
        points: 100,
        earnedDate: "2 days ago"
      },
      {
        id: "react-ninja",
        title: "React Ninja",
        description: "Completed React fundamentals module",
        icon: "Code",
        rarity: "rare",
        points: 75,
        earnedDate: "1 week ago"
      },
      {
        id: "early-bird",
        title: "Early Bird",
        description: "Completed morning study session",
        icon: "Sun",
        rarity: "common",
        points: 25,
        earnedDate: "Today"
      }
    ],
    activityData: Array.from({ length: 28 }, (_, i) => ({
      date: new Date(Date.now() - (27 - i) * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0],
      minutes: Math.floor(Math.random() * 180)
    })),
    reminders: [
      { id: 1, title: "Daily coding practice", time: "9:00 AM" },
      { id: 2, title: "Review yesterday\'s learning", time: "8:00 PM" },
      { id: 3, title: "Weekend project work", time: "Sat 10:00 AM" }
    ]
  };

  // Mock alternative paths
  const alternativePaths = [
    {
      id: "fast-track",
      title: "Fast Track Path",
      subtitle: "Accelerated Learning",
      description: "Intensive 16-week program focusing on essential skills for quick job readiness",
      type: "fast-track",
      duration: 16,
      modules: 24,
      difficulty: "intermediate",
      popularity: 35,
      keyDifferences: [
        "Focuses on most in-demand skills only",
        "More intensive daily schedule",
        "Less theory, more practical projects",
        "Job placement assistance included"
      ],
      pros: [
        "Faster time to job market",
        "Intensive hands-on experience",
        "Industry-focused curriculum",
        "Career support included"
      ],
      cons: [
        "Requires more daily commitment",
        "Less depth in certain topics",
        "Higher intensity may be challenging",
        "Limited flexibility in schedule"
      ],
      skills: ["React", "Node.js", "MongoDB", "Git", "Deployment", "Testing"]
    },
    {
      id: "comprehensive",
      title: "Comprehensive Path",
      subtitle: "Deep Learning Experience",
      description: "Thorough 28-week program covering advanced topics and computer science fundamentals",
      type: "comprehensive",
      duration: 28,
      modules: 45,
      difficulty: "advanced",
      popularity: 45,
      keyDifferences: [
        "Includes computer science fundamentals",
        "Advanced topics like system design",
        "Multiple programming languages",
        "Research and innovation projects"
      ],
      pros: [
        "Comprehensive skill development",
        "Strong theoretical foundation",
        "Multiple specialization options",
        "Research opportunities"
      ],
      cons: [
        "Longer time commitment",
        "More theoretical content",
        "May include unnecessary topics",
        "Delayed job market entry"
      ],
      skills: ["React", "Node.js", "Python", "System Design", "Algorithms", "DevOps", "Machine Learning"]
    },
    {
      id: "specialized",
      title: "Frontend Specialist",
      subtitle: "UI/UX Focused",
      description: "Specialized 20-week program focusing exclusively on frontend development and design",
      type: "specialized",
      duration: 20,
      modules: 28,
      difficulty: "intermediate",
      popularity: 20,
      keyDifferences: [
        "Frontend and design focused",
        "Advanced CSS and animations",
        "Multiple frontend frameworks",
        "UI/UX design principles"
      ],
      pros: [
        "Deep frontend expertise",
        "Design skills included",
        "High demand specialization",
        "Creative project portfolio"
      ],
      cons: [
        "Limited backend knowledge",
        "Narrower job opportunities",
        "May need backend skills later",
        "Less full-stack versatility"
      ],
      skills: ["React", "Vue.js", "Advanced CSS", "Design Systems", "Animation", "TypeScript"]
    }
  ];

  const currentPath = {
    title: roadmapData?.title,
    description: roadmapData?.description,
    duration: 24,
    modules: 32,
    difficulty: "intermediate",
    popularity: 65,
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git"]
  };

  const handleTogglePhaseExpansion = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  const handleCustomizeRoadmap = () => {
    // Handle roadmap customization
    console.log('Customizing roadmap...');
  };

  const handleDownloadRoadmap = () => {
    // Handle PDF download
    console.log('Downloading roadmap PDF...');
  };

  const handleShareRoadmap = () => {
    // Handle sharing functionality
    console.log('Sharing roadmap...');
  };

  const handleCompleteMilestone = (milestoneId) => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
    console.log('Completing milestone:', milestoneId);
  };

  const handleViewMilestoneDetails = (milestoneId) => {
    console.log('Viewing milestone details:', milestoneId);
  };

  const handleViewAchievements = () => {
    console.log('Viewing all achievements...');
  };

  const handleSetReminder = () => {
    console.log('Setting study reminder...');
  };

  const handleSwitchPath = (pathId) => {
    console.log('Switching to path:', pathId);
  };

  const handleComparePathsModal = () => {
    console.log('Opening path comparison modal...');
  };

  // Get upcoming milestones
  const upcomingMilestones = roadmapData?.phases?.flatMap(phase => phase?.milestones || [])?.filter(milestone => !milestone?.completed)?.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))?.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="bg-card rounded-xl border border-border shadow-soft-lg p-8 animate-bounce">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-success to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Trophy" size={32} color="white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Milestone Completed!</h3>
              <p className="text-muted-foreground">Great job on your progress! 🎉</p>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/user-dashboard" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground font-medium">Learning Roadmap</span>
        </nav>

        {/* Roadmap Header */}
        <RoadmapHeader 
          roadmap={roadmapData}
          onCustomizeRoadmap={handleCustomizeRoadmap}
          onDownloadRoadmap={handleDownloadRoadmap}
          onShareRoadmap={handleShareRoadmap}
        />

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex bg-muted rounded-lg p-1">
            {[
              { value: 'timeline', label: 'Timeline View', icon: 'Calendar' },
              { value: 'milestones', label: 'Milestones', icon: 'Flag' },
              { value: 'progress', label: 'Progress', icon: 'TrendingUp' }
            ]?.map((view) => (
              <button
                key={view?.value}
                onClick={() => setActiveView(view?.value)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeView === view?.value
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={view?.icon} size={16} />
                <span>{view?.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
            >
              <Link to="/ai-mentor-chat" className="flex items-center space-x-2">
                Ask AI Mentor
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              iconName="BarChart3"
              iconPosition="left"
            >
              <Link to="/skill-gap-analysis" className="flex items-center space-x-2">
                View Skills Gap
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Timeline View */}
            {activeView === 'timeline' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Learning Timeline</h2>
                {roadmapData?.phases?.map((phase, index) => (
                  <TimelinePhase
                    key={phase?.id}
                    phase={phase}
                    isActive={phase?.progress > 0 && phase?.progress < 100}
                    isCompleted={phase?.progress === 100}
                    isExpanded={expandedPhase === phase?.id}
                    onToggleExpand={() => handleTogglePhaseExpansion(phase?.id)}
                  />
                ))}
              </div>
            )}

            {/* Milestones View */}
            {activeView === 'milestones' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Milestones</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingMilestones?.map((milestone) => (
                    <MilestoneCard
                      key={milestone?.id}
                      milestone={milestone}
                      onComplete={handleCompleteMilestone}
                      onViewDetails={handleViewMilestoneDetails}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Progress View */}
            {activeView === 'progress' && (
              <ProgressTracker
                progressData={progressData}
                onViewAchievements={handleViewAchievements}
                onSetReminder={handleSetReminder}
              />
            )}

            {/* Alternative Paths */}
            <AlternativePaths
              currentPath={currentPath}
              alternativePaths={alternativePaths}
              onSwitchPath={handleSwitchPath}
              onComparePathsModal={handleComparePathsModal}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card rounded-xl border border-border shadow-soft p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-bold text-primary">56%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '56%' }}></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{progressData?.currentStreak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{progressData?.completedModules}</div>
                    <div className="text-xs text-muted-foreground">Modules Done</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Up */}
            <div className="bg-card rounded-xl border border-border shadow-soft p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Next Up</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Play" size={16} color="white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">React Hooks & Context</h4>
                    <p className="text-xs text-muted-foreground">4 hours remaining</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">React Project</h4>
                    <p className="text-xs text-muted-foreground">Starts after current module</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Study Schedule */}
            <div className="bg-card rounded-xl border border-border shadow-soft p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">This Week's Schedule</h3>
              <div className="space-y-3">
                {[
                  { day: 'Today', task: 'React Hooks Practice', time: '2 hours', status: 'current' },
                  { day: 'Tomorrow', task: 'Context API Tutorial', time: '1.5 hours', status: 'upcoming' },
                  { day: 'Wednesday', task: 'Project Setup', time: '3 hours', status: 'upcoming' }
                ]?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div>
                      <div className="font-medium text-foreground text-sm">{item?.day}</div>
                      <div className="text-xs text-muted-foreground">{item?.task}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">{item?.time}</div>
                      <div className={`text-xs ${
                        item?.status === 'current' ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {item?.status === 'current' ? 'In Progress' : 'Scheduled'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-card rounded-xl border border-border shadow-soft p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Helpful Resources</h3>
              <div className="space-y-3">
                {[
                  { title: 'React Documentation', type: 'Official Docs', icon: 'BookOpen' },
                  { title: 'JavaScript MDN', type: 'Reference', icon: 'ExternalLink' },
                  { title: 'CSS-Tricks', type: 'Tutorials', icon: 'Palette' }
                ]?.map((resource, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer">
                    <Icon name={resource?.icon} size={16} className="text-primary" />
                    <div className="flex-1">
                      <div className="font-medium text-foreground text-sm">{resource?.title}</div>
                      <div className="text-xs text-muted-foreground">{resource?.type}</div>
                    </div>
                    <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRoadmap;
