import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import ConsentFlow from './components/ConsentFlow';
import SwipeCard from './components/SwipeCard';
import MiniChallenge from './components/MiniChallenge';
import PsychometricTest from './components/PsychometricTest';
import MoodBoard from './components/MoodBoard';
import ProgressTracker from './components/ProgressTracker';
import AchievementUnlock from './components/AchievementUnlock';
import LanguageSelector from './components/LanguageSelector';

const EnhancedGamifiedOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('consent');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  
  // User profile state
  const [userProfile, setUserProfile] = useState({
    consent: {
      dataCollection: false,
      personalizedContent: false,
      analytics: false
    },
    preferences: [],
    personality: {},
    skills: [],
    cognitiveProfile: {},
    visualPreferences: {},
    achievements: [],
    totalPoints: 0,
    completedChallenges: 0,
    badges: []
  });

  // UI state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [stepProgress, setStepProgress] = useState(0);

  const steps = [
    { key: 'consent', label: 'Privacy & Consent', progress: 0 },
    { key: 'interests', label: 'Career Interests', progress: 20 },
    { key: 'challenge', label: 'Mini Challenge', progress: 40 },
    { key: 'psychometric', label: 'Personality Test', progress: 60 },
    { key: 'moodboard', label: 'Visual Preferences', progress: 80 },
    { key: 'complete', label: 'Journey Begins', progress: 100 }
  ];

  // Mock data for career interest cards
  const careerCards = [
    {
      id: 'technology',
      title: 'Technology & Innovation',
      category: 'STEM',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      icon: 'Cpu',
      description: 'Shape the future through coding, AI, and digital transformation. Build applications that solve real-world problems.',
      skills: ['Programming', 'Problem Solving', 'Innovation']
    },
    {
      id: 'creative',
      title: 'Creative Arts & Design',
      category: 'Creative',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
      icon: 'Palette',
      description: 'Express creativity through visual design, storytelling, and artistic innovation. Create meaningful experiences.',
      skills: ['Creativity', 'Visual Design', 'Communication']
    },
    {
      id: 'business',
      title: 'Business & Leadership',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
      icon: 'Briefcase',
      description: 'Lead teams and organizations to success. Drive growth through strategic thinking and innovation.',
      skills: ['Leadership', 'Strategy', 'Communication']
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Wellness',
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
      icon: 'Heart',
      description: 'Improve lives through medical care, research, and health innovation. Make a meaningful impact.',
      skills: ['Empathy', 'Science', 'Care']
    },
    {
      id: 'education',
      title: 'Education & Training',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
      icon: 'GraduationCap',
      description: 'Shape minds and inspire learning. Transfer knowledge and empower the next generation.',
      skills: ['Teaching', 'Patience', 'Knowledge']
    },
    {
      id: 'finance',
      title: 'Finance & Economics',
      category: 'Finance',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
      icon: 'TrendingUp',
      description: 'Navigate financial markets and drive economic growth. Manage resources and investments wisely.',
      skills: ['Analysis', 'Risk Management', 'Strategy']
    },
    {
      id: 'environment',
      title: 'Environmental & Sustainability',
      category: 'Environment',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      icon: 'Leaf',
      description: 'Protect our planet and build sustainable solutions. Create a better future for generations.',
      skills: ['Environmental Science', 'Innovation', 'Passion']
    },
    {
      id: 'social',
      title: 'Social Impact & Advocacy',
      category: 'Social',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop',
      icon: 'Users',
      description: 'Drive positive social change and advocate for important causes. Make communities stronger.',
      skills: ['Advocacy', 'Communication', 'Empathy']
    }
  ];

  // Mini challenges data
  const miniChallenges = [
    {
      id: 'logic_puzzle',
      type: 'logic',
      title: 'Pattern Recognition',
      description: 'Complete the sequence and show your analytical thinking',
      question: 'What comes next? 2, 6, 12, 20, 30, ?',
      options: ['38', '42', '44', '48'],
      correctAnswer: '42',
      explanation: 'The pattern adds consecutive even numbers: +4, +6, +8, +10, +12',
      points: 100,
      timeLimit: 60
    },
    {
      id: 'creative_challenge',
      type: 'creative',
      title: 'Innovation Thinking',
      description: 'Find creative solutions to everyday problems',
      question: 'How would you improve the experience of waiting in line?',
      type: 'open_ended',
      keywords: ['digital', 'entertainment', 'efficiency', 'comfort', 'communication'],
      points: 150,
      timeLimit: 120
    }
  ];

  // Psychometric test questions
  const psychometricQuestions = [
    {
      id: 'teamwork_vs_individual',
      question: 'When working on a project, I prefer to:',
      options: [
        { text: 'Work independently and focus deeply', trait: 'introversion', weight: 2 },
        { text: 'Collaborate with a small trusted team', trait: 'collaboration', weight: 1 },
        { text: 'Brainstorm with large diverse groups', trait: 'extraversion', weight: 2 },
        { text: 'Lead and coordinate team efforts', trait: 'leadership', weight: 2 }
      ]
    },
    {
      id: 'decision_making',
      question: 'When making important decisions, I typically:',
      options: [
        { text: 'Analyze all data and research thoroughly', trait: 'analytical', weight: 2 },
        { text: 'Trust my intuition and gut feeling', trait: 'intuitive', weight: 2 },
        { text: 'Seek advice from experienced mentors', trait: 'collaborative', weight: 1 },
        { text: 'Consider the impact on all stakeholders', trait: 'empathetic', weight: 2 }
      ]
    },
    {
      id: 'problem_solving',
      question: 'When facing a complex challenge, I:',
      options: [
        { text: 'Break it down into smaller manageable parts', trait: 'systematic', weight: 2 },
        { text: 'Look for creative and innovative solutions', trait: 'creative', weight: 2 },
        { text: 'Research how others have solved similar problems', trait: 'methodical', weight: 1 },
        { text: 'Experiment with different approaches', trait: 'experimental', weight: 2 }
      ]
    }
  ];

  // Achievement definitions
  const achievementDefinitions = [
    {
      id: 'consent_champion',
      title: 'Privacy Champion',
      description: 'Completed privacy consent setup',
      icon: 'Shield',
      points: 50,
      badge: 'privacy'
    },
    {
      id: 'interest_explorer',
      title: 'Interest Explorer',
      description: 'Discovered your career interests',
      icon: 'Compass',
      points: 100,
      badge: 'explorer'
    },
    {
      id: 'challenge_master',
      title: 'Challenge Master',
      description: 'Completed your first mini challenge',
      icon: 'Zap',
      points: 150,
      badge: 'challenger'
    },
    {
      id: 'personality_insight',
      title: 'Self Discoverer',
      description: 'Unlocked personality insights',
      icon: 'Brain',
      points: 200,
      badge: 'insightful'
    },
    {
      id: 'style_curator',
      title: 'Style Curator',
      description: 'Customized your visual preferences',
      icon: 'Palette',
      points: 75,
      badge: 'curator'
    },
    {
      id: 'journey_starter',
      title: 'Journey Starter',
      description: 'Completed onboarding journey',
      icon: 'Trophy',
      points: 300,
      badge: 'achiever'
    }
  ];

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Update step progress
    const currentStepData = steps?.find(step => step?.key === currentStep);
    if (currentStepData) {
      setStepProgress(currentStepData?.progress);
    }
  }, [currentStep]);

  // Handle consent completion
  const handleConsentComplete = (consentData) => {
    setUserProfile(prev => ({
      ...prev,
      consent: consentData,
      totalPoints: prev?.totalPoints + 50
    }));
    
    unlockAchievement('consent_champion');
    setCurrentStep('interests');
  };

  // Handle card swipe
  const handleCardSwipe = (cardId, direction) => {
    if (direction === 'right') {
      const card = careerCards?.find(c => c?.id === cardId);
      setUserProfile(prev => ({
        ...prev,
        preferences: [...prev?.preferences, cardId],
        totalPoints: prev?.totalPoints + 25
      }));
    }

    // Move to next card or complete interests step
    if (currentCardIndex < careerCards?.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      unlockAchievement('interest_explorer');
      setTimeout(() => {
        setCurrentStep('challenge');
      }, 1000);
    }
  };

  // Handle mini challenge completion
  const handleChallengeComplete = (challengeId, score, answers) => {
    setUserProfile(prev => ({
      ...prev,
      skills: [...prev?.skills, { challengeId, score, answers }],
      completedChallenges: prev?.completedChallenges + 1,
      totalPoints: prev?.totalPoints + score
    }));

    unlockAchievement('challenge_master');
    setTimeout(() => {
      setCurrentStep('psychometric');
    }, 1000);
  };

  // Handle psychometric test completion
  const handlePsychometricComplete = (results) => {
    setUserProfile(prev => ({
      ...prev,
      personality: results?.traits,
      cognitiveProfile: results?.cognitive,
      totalPoints: prev?.totalPoints + 200
    }));

    unlockAchievement('personality_insight');
    setTimeout(() => {
      setCurrentStep('moodboard');
    }, 1000);
  };

  // Handle mood board completion
  const handleMoodBoardComplete = (preferences) => {
    setUserProfile(prev => ({
      ...prev,
      visualPreferences: preferences,
      totalPoints: prev?.totalPoints + 75
    }));

    unlockAchievement('style_curator');
    setTimeout(() => {
      setCurrentStep('complete');
      unlockAchievement('journey_starter');
    }, 1000);
  };

  // Unlock achievement
  const unlockAchievement = (achievementId) => {
    const achievement = achievementDefinitions?.find(a => a?.id === achievementId);
    if (achievement && !userProfile?.achievements?.includes(achievementId)) {
      setCurrentAchievement(achievement);
      setShowAchievement(true);
      
      setUserProfile(prev => ({
        ...prev,
        achievements: [...prev?.achievements, achievementId],
        badges: [...prev?.badges, achievement?.badge],
        totalPoints: prev?.totalPoints + achievement?.points
      }));
    }
  };

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferred-language', langCode);
  };

  const getCurrentStepLabel = () => {
    const stepData = steps?.find(s => s?.key === currentStep);
    return stepData?.label || 'Onboarding';
  };

  // Render current step content
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'consent':
        return <ConsentFlow onComplete={handleConsentComplete} />;
        
      case 'interests':
        return (
          <div className="w-full max-w-md mx-auto">
            <SwipeCard
              cards={careerCards}
              currentIndex={currentCardIndex}
              onSwipe={handleCardSwipe}
            />
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm mb-4">
                {currentCardIndex + 1} of {careerCards?.length} • Swipe right if interested
              </p>
              <div className="flex justify-center space-x-2">
                {careerCards?.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentCardIndex ? 'bg-primary' : 
                      index < currentCardIndex ? 'bg-success' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'challenge':
        return (
          <MiniChallenge
            challenge={miniChallenges?.[0]}
            onComplete={handleChallengeComplete}
          />
        );

      case 'psychometric':
        return (
          <PsychometricTest
            questions={psychometricQuestions}
            onComplete={handlePsychometricComplete}
          />
        );

      case 'moodboard':
        return <MoodBoard onComplete={handleMoodBoardComplete} />;

      case 'complete':
        return (
          <div className="text-center py-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, duration: 1 }}
              className="w-32 h-32 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
            >
              <Icon name="Trophy" size={48} color="white" />
            </motion.div>
            <h2 className="font-heading font-bold text-4xl text-foreground mb-4">
              Welcome to Your AI Career Journey!
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Congratulations! You've completed your personalized onboarding. Your AI Career Advisor is now ready to guide you toward your dream career with insights tailored just for you.
            </p>
            {/* Achievement Summary */}
            <div className="bg-card rounded-2xl p-6 mb-8 shadow-soft">
              <h3 className="font-bold text-xl mb-4">Your Journey Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{userProfile?.totalPoints}</div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-1">{userProfile?.achievements?.length}</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">{userProfile?.preferences?.length}</div>
                  <div className="text-sm text-muted-foreground">Interests</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">{userProfile?.badges?.length}</div>
                  <div className="text-sm text-muted-foreground">Badges</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => {
                  localStorage.setItem('user-onboarding-profile', JSON.stringify(userProfile));
                  navigate('/user-dashboard');
                }}
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                className="px-8 py-4 text-lg hover-lift"
              >
                Launch Dashboard
              </Button>
              
              <Button
                onClick={() => navigate('/ai-mentor-chat')}
                variant="outline"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="px-8 py-4 text-lg"
              >
                Start AI Chat
              </Button>
            </div>
          </div>
        );

      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-primary/5">
      {/* Language Selector Modal */}
      <AnimatePresence>
        {showLanguageSelector && (
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onClose={() => setShowLanguageSelector(false)}
          />
        )}
      </AnimatePresence>
      {/* Achievement Unlock Modal */}
      <AnimatePresence>
        {showAchievement && currentAchievement && (
          <AchievementUnlock
            achievement={currentAchievement}
            onClose={() => setShowAchievement(false)}
          />
        )}
      </AnimatePresence>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <Icon name="GraduationCap" size={24} color="white" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-foreground">CareerMentor AI</h1>
              <p className="text-sm text-muted-foreground">{getCurrentStepLabel()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Points Display */}
            <div className="hidden sm:flex items-center space-x-2 bg-primary/10 rounded-xl px-4 py-2 border border-primary/20">
              <Icon name="Star" size={18} color="var(--color-primary)" />
              <span className="font-bold text-primary">{userProfile?.totalPoints}</span>
              <span className="text-sm text-primary/70">pts</span>
            </div>
            
            {/* Language Toggle */}
            <Button
              onClick={() => setShowLanguageSelector(true)}
              variant="ghost"
              size="sm"
              iconName="Globe"
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <ProgressTracker
            progress={stepProgress}
            currentStep={currentStep}
            steps={steps}
            achievements={userProfile?.achievements?.length}
          />
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Footer */}
      <div className="border-t border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <Icon name="Shield" size={16} />
              <span>Your data is secure and private</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <span>© {new Date()?.getFullYear()} CareerMentor AI</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>AI-Powered Career Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedGamifiedOnboarding;
