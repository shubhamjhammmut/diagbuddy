import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { mockTests, categories, type TestItem } from '../utils/mockData';
import { BookingFlowModal } from '../components/BookingFlowModal';
import { Search, Filter, ShieldCheck, Clock, Sparkles, AlertCircle } from 'lucide-react';

export const Tests: React.FC = () => {
  const { t } = useLanguage();
  const { getAITestRecommendations } = useApp();
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // AI Symptom Recommender state
  const [symptomInput, setSymptomInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestedNames, setAiSuggestedNames] = useState<string[]>([]);
  const [aiError, setAiError] = useState(false);

  // Booking state
  const [selectedTest, setSelectedTest] = useState<TestItem | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleAISymptomCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomInput.trim()) return;

    setAiLoading(true);
    setAiError(false);
    setAiSuggestedNames([]);

    try {
      const suggestions = await getAITestRecommendations(symptomInput);
      setAiSuggestedNames(suggestions);
      
      // If we got valid suggestions, auto-scroll to results and highlight
      if (suggestions.length > 0) {
        setSelectedCategory('All'); // Clear category filter to show all matches
      }
    } catch (err) {
      console.error(err);
      setAiError(true);
    } finally {
      setAiLoading(false);
    }
  };

  // Filter logic: match either text search, category, or AI suggestion
  const filteredTests = mockTests.filter(test => {
    const matchesSearch = 
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      test.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleBook = (test: TestItem) => {
    setSelectedTest(test);
    setBookingOpen(true);
  };

  return (
    <div className="py-10 bg-brand-gray min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Page Header */}
        <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-navy">Find a Diagnostic Test</h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1">Search blood tests, checkups, and panels available in your locality.</p>
          </div>
        </div>

        {/* AI Symptom Checker Widget */}
        <div className="bg-gradient-to-br from-brand-navy to-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-brand-primary/20 rounded-xl text-brand-primary">
              <Sparkles className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="font-extrabold text-base">DiagBuddy AI Symptom Checker</h2>
              <p className="text-[10px] text-slate-400">Describe your symptoms in simple English to recommend relevant tests.</p>
            </div>
          </div>

          <form onSubmit={handleAISymptomCheck} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
              placeholder="Describe symptoms, e.g., feeling tired, rapid weight loss, high body temperature..."
            />
            <button
              type="submit"
              disabled={aiLoading}
              className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-xs px-6 py-3 rounded-2xl transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-1.5"
            >
              <span>{aiLoading ? 'Analyzing...' : 'Analyze Symptoms'}</span>
            </button>
          </form>

          {aiError && (
            <p className="text-[10px] text-rose-400 font-bold flex items-center"><AlertCircle className="h-3.5 w-3.5 mr-1" /> Error connecting to AI assistant. Please try again.</p>
          )}

          {/* Suggested Tests results */}
          {aiSuggestedNames.length > 0 && (
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2 animate-fadeIn">
              <p className="text-[10px] font-bold text-brand-primary uppercase tracking-wider">AI Recommended Tests</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {aiSuggestedNames.map((name, index) => (
                  <span 
                    key={index}
                    className="text-[11px] font-bold bg-brand-primary/10 border border-brand-primary/30 text-brand-primary px-3 py-1.5 rounded-xl flex items-center space-x-1"
                  >
                    <span>{name}</span>
                  </span>
                ))}
              </div>
              <p className="text-[9px] text-slate-500 italic mt-2">These tests match your description. Check the catalog details below to book.</p>
            </div>
          )}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full flex-1">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder={t('btn.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:border-brand-primary focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase flex-shrink-0">
            <Filter className="h-4 w-4" />
            <span>Category:</span>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="md:hidden w-full border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Category Chips (Desktop only) */}
        <div className="hidden md:flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setAiSuggestedNames([]); // clear suggestions highlight on manual click
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                selectedCategory === cat
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm font-bold'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <p className="text-xs text-slate-500 font-medium">
          Showing {filteredTests.length} diagnostic test{filteredTests.length === 1 ? '' : 's'} available
        </p>

        {/* Tests Grid */}
        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => {
              // Highlight test if suggested by AI
              const isSuggested = aiSuggestedNames.some(name => 
                name.toLowerCase().includes(test.name.toLowerCase()) || 
                test.name.toLowerCase().includes(name.toLowerCase())
              );

              return (
                <div 
                  key={test.id} 
                  className={`bg-white border rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 ${
                    isSuggested 
                      ? 'border-brand-primary ring-4 ring-brand-primary/10 shadow-lg translate-y-[-2px]' 
                      : 'border-slate-200/80'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase ${
                        isSuggested 
                          ? 'bg-brand-primary text-white border-brand-primary' 
                          : 'bg-brand-primary/5 text-brand-primary border-brand-primary/10'
                      }`}>
                        {isSuggested ? 'AI Suggested Match' : test.category}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{test.code}</span>
                    </div>

                    <h3 className="font-bold text-base text-brand-navy mt-3">{test.name}</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{test.description}</p>
                    
                    <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 font-medium">
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 text-brand-teal mr-1.5" />
                        <span>Report within {test.tatHours} hours</span>
                      </div>
                      {test.homeAvailable && (
                        <div className="flex items-center">
                          <ShieldCheck className="h-3.5 w-3.5 text-brand-teal mr-1.5" />
                          <span>Home collection available</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Test Price</span>
                      <span className="text-lg font-black text-brand-navy">₹{test.price}</span>
                    </div>
                    
                    <button
                      onClick={() => handleBook(test)}
                      className="bg-brand-primary hover:bg-brand-primary/95 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-brand-primary/5 active:scale-95"
                    >
                      {t('btn.bookNow')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border rounded-3xl p-12 text-center max-w-md mx-auto">
            <p className="text-slate-400 text-sm font-semibold">No tests match your search terms.</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for generic terms like "Blood", "Sugar", "CBC".</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setAiSuggestedNames([]); }}
              className="text-xs text-brand-primary font-bold mt-4 underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>

      <BookingFlowModal
        isOpen={bookingOpen}
        test={selectedTest}
        onClose={() => {
          setBookingOpen(false);
          setSelectedTest(null);
        }}
      />
    </div>
  );
};
