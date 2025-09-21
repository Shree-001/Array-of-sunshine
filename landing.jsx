import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from './components/HeroSection';
import FeatureHighlights from './components/FeatureHighlights';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

const LandingPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const pageContent = {
    en: {
      title: "CareerMentor AI - Discover Your Perfect Career Path",
      description: "AI-powered career guidance platform for Indian students aged 15-25. Get personalized skill analysis, learning roadmaps, and 24/7 AI mentorship to find your ideal career match.",
      keywords: "career guidance, AI mentor, skill analysis, learning roadmap, Indian students, career exploration, job guidance, career counseling"
    },
    hi: {
      title: "CareerMentor AI - अपना सही करियर पाथ खोजें",
      description: "15-25 साल के भारतीय छात्रों के लिए AI-संचालित करियर गाइडेंस प्लेटफॉर्म। व्यक्तिगत स्किल एनालिसिस, लर्निंग रोडमैप्स, और 24/7 AI मेंटरशिप पाएं।",
      keywords: "करियर गाइडेंस, AI मेंटर, स्किल एनालिसिस, लर्निंग रोडमैप, भारतीय छात्र, करियर एक्सप्लोरेशन"
    }
  };

  const content = pageContent?.[currentLanguage] || pageContent?.en;

  return (
    <>
      <Helmet>
        <title>{content?.title}</title>
        <meta name="description" content={content?.description} />
        <meta name="keywords" content={content?.keywords} />
        <meta property="og:title" content={content?.title} />
        <meta property="og:description" content={content?.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://careermentor.ai/landing-page" />
        <meta property="og:image" content="https://careermentor.ai/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content?.title} />
        <meta name="twitter:description" content={content?.description} />
        <meta name="twitter:image" content="https://careermentor.ai/twitter-image.jpg" />
        <link rel="canonical" href="https://careermentor.ai/landing-page" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content={currentLanguage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "CareerMentor AI",
            "description": content?.description,
            "url": "https://careermentor.ai",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://careermentor.ai/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <HeroSection />

        {/* Feature Highlights */}
        <FeatureHighlights />

        {/* Stats Section */}
        <StatsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
