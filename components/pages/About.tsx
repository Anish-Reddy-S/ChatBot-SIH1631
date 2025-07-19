import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="relative bg-white p-8 rounded-lg shadow-md border border-slate-200">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">About CampusAssist</h2>
        <p className="text-slate-700 mb-4 leading-relaxed">
          CampusAssist is your dedicated AI-powered guide designed to make your campus experience smoother and more informed. Whether you're a prospective student, currently enrolled, or a member of the faculty, CampusAssist is here to provide quick and accurate answers to your questions.
        </p>
        <p className="text-slate-700 mb-4 leading-relaxed">
          Our mission is to bridge the information gap and provide instant access to campus knowledge, from academic schedules and course details to event information and student services. We aim to be a reliable, 24/7 resource for the entire campus community.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3 text-blue-600">Technology</h3>
        <p className="text-slate-700 leading-relaxed">
          This application is powered by Google's Gemini AI, a state-of-the-art large language model that enables natural, conversational interactions. We leverage its capabilities to understand your questions and provide relevant, helpful responses in real-time.
        </p>
        <div className="absolute bottom-4 right-5 text-xs text-slate-400 animate-pulse hover:animate-none hover:text-slate-600 transition-colors">
          By DS-B15
        </div>
      </div>
    </div>
  );
};

export default About;
