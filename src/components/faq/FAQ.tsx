import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { faqData } from './faq.data';
import { useDebounce } from '../../hooks/ui/useDebounce';

interface FAQProps {
  onInschrijfClick?: () => void;
  onContactClick?: () => void;
}

interface QuestionItemProps {
  question: string;
  answer: string;
  icon: string;
  action?: boolean;
  actionText?: string;
  onInschrijfClick?: () => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  answer,
  icon,
  action,
  actionText,
  onInschrijfClick
}) => (
  <details className="group">
    <summary className="flex items-center cursor-pointer p-4 bg-primary text-white font-bold rounded-lg transition-colors duration-300 hover:bg-secondary">
      <span className="mr-2 text-xl" role="img" aria-label={icon}>
        {icon}
      </span>
      <span className="flex-1">{question}</span>
      <span className="transform transition-transform duration-300 group-open:rotate-45 text-xl">
        +
      </span>
    </summary>
    <div className="mt-2 p-4 bg-gray-50 rounded-lg">
      <p className="text-gray-700 leading-relaxed">{answer}</p>
      {action && (
        <button
          onClick={onInschrijfClick}
          className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {actionText}
        </button>
      )}
    </div>
  </details>
);

const SearchBar: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => (
  <div className="mb-8">
    <input
      type="text"
      id="kl-qa-search-input"
      placeholder="🔍 Zoek je vraag..."
      value={value}
      onChange={onChange}
      className="w-full p-3 text-base border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
      aria-label="Zoek in veelgestelde vragen"
    />
  </div>
);

const BackToTopButton: React.FC<{
  show: boolean;
  onClick: () => void;
}> = ({ show, onClick }) => (
  <button
    onClick={onClick}
    className={`fixed bottom-5 right-5 w-12 h-12 bg-primary text-white rounded-full shadow-lg transition-all duration-300 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 z-50 ${
      show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
    }`}
    aria-label="Terug naar boven"
  >
    ⬆
  </button>
);

const FAQ: React.FC<FAQProps> = ({ onInschrijfClick, onContactClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleScroll = useCallback(() => {
    setShowBackToTop(window.scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCategories = useMemo(() => {
    const searchLower = debouncedSearchTerm.toLowerCase();
    return faqData
      .map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchLower) ||
          q.answer.toLowerCase().includes(searchLower)
        )
      }))
      .filter(category => category.questions.length > 0);
  }, [debouncedSearchTerm]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 font-roboto bg-white text-gray-800">
      <h2 className="text-4xl md:text-5xl text-center text-primary font-bold mb-8">
        Alles wat je wilt weten over De Koninklijke Loop
      </h2>
      
      <SearchBar 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCategories.map((category) => (
          <div 
            key={category.title} 
            className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:shadow-xl"
          >
            <h3 className="flex items-center text-2xl text-secondary font-bold mb-4 pb-2 border-b-2 border-secondary">
              <span className="mr-2 text-3xl" role="img" aria-label={category.icon}>
                {category.icon}
              </span>
              {category.title}
            </h3>
            <div className="space-y-4">
              {category.questions.map((qa) => (
                <QuestionItem
                  key={qa.question}
                  {...qa}
                  onInschrijfClick={qa.question.includes('contact') ? onContactClick : onInschrijfClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Kom je er niet uit of heb je een specifieke vraag?
        </p>
        <button
          onClick={onContactClick}
          className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3 rounded-lg
            font-medium hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300"
        >
          Neem direct contact op
        </button>
      </div>

      <BackToTopButton 
        show={showBackToTop}
        onClick={handleBackToTop}
      />
    </section>
  );
};

export default FAQ; 