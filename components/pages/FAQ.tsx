import React from 'react';

const faqData = [
  {
    question: 'How do I register for courses?',
    answer: 'Course registration is handled through the student online portal. You can find the portal link on the university\'s main website. Registration periods are announced via email and on the academic calendar.',
  },
  {
    question: 'Where can I find the library hours?',
    answer: 'Library hours are posted on the library section of the university website. They typically vary during exam periods and holidays. You can also call the library front desk for the most up-to-date information.',
  },
  {
    question: 'What student clubs are available?',
    answer: 'There is a wide variety of student clubs, from academic and professional groups to sports and cultural organizations. A full list is available on the Student Life office website, and you can sign up during the annual club fair at the beginning of the fall semester.',
  },
  {
    question: 'Who do I contact for IT support?',
    answer: 'For IT support, including password resets and software issues, please contact the IT Help Desk. You can submit a ticket online, email them at helpdesk@university.example, or visit their office in the tech building.',
  },
  {
    question: 'Is there a campus map available?',
    answer: 'Yes, an interactive campus map is available on the university website and mobile app. You can use it to find buildings, parking lots, and other key locations on campus.',
  },
];

const FAQ: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-slate-800 border-b pb-2">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqData.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">{item.question}</h3>
            <p className="text-slate-700 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
