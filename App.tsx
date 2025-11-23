import React, { useState } from 'react';
import { Dumbbell, Info, HeartPulse } from 'lucide-react';
import InputForm from './components/InputForm';
import PlanDisplay from './components/PlanDisplay';
import { UserProfile, GeneratedPlan } from './types';
import { generateFitnessPlan } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'input' | 'result'>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (userProfile: UserProfile) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedPlan = await generateFitnessPlan(userProfile);
      setPlan(generatedPlan);
      setCurrentView('result');
    } catch (err) {
      console.error(err);
      setError("Failed to generate plan. Please verify your API Key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setCurrentView('input');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
                <Dumbbell className="text-white h-6 w-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              FitGenIE
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <span className="flex items-center hover:text-blue-600 cursor-pointer transition-colors">
                <Info size={16} className="mr-1.5"/> About Project
            </span>
            <span className="flex items-center hover:text-blue-600 cursor-pointer transition-colors">
                <HeartPulse size={16} className="mr-1.5"/> Health Tips
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {currentView === 'input' && (
             <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in">
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Your Personal AI Fitness Coach
                    </h1>
                    <p className="text-lg text-slate-600">
                        Get a fully customized workout routine and diet plan based on your goals and food preferences. 
                        Designed for students & professionals.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md w-full text-center">
                        {error}
                    </div>
                )}
                
                <div className="w-full">
                    <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left mt-12">
                     <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                            <span className="text-xl">🥗</span>
                        </div>
                        <h3 className="font-bold text-slate-800 mb-1">Diet Specific</h3>
                        <p className="text-sm text-slate-500">Tailored for Vegetarians, Eggetarians, and Non-Vegetarians.</p>
                     </div>
                     <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                            <span className="text-xl">🎯</span>
                        </div>
                        <h3 className="font-bold text-slate-800 mb-1">Goal Oriented</h3>
                        <p className="text-sm text-slate-500">Specific plans for Fat Loss, Muscle Gain, or Endurance.</p>
                     </div>
                     <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                            <span className="text-xl">🤖</span>
                        </div>
                        <h3 className="font-bold text-slate-800 mb-1">AI Powered</h3>
                        <p className="text-sm text-slate-500">Utilizing advanced AI to generate optimal routines.</p>
                     </div>
                </div>
             </div>
          )}

          {currentView === 'result' && plan && (
            <PlanDisplay plan={plan} onReset={handleReset} />
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm">
                Jaypee Institute of Information Technology | Sector-62, Noida
            </p>
            <p className="text-slate-400 text-xs mt-2">
                Minor Project Synopsis Implementation | AI-Based Recommendation System
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;