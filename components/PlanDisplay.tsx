import React, { useState } from 'react';
import { GeneratedPlan } from '../types';
import { Utensils, Dumbbell, Activity, PieChart } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PlanDisplayProps {
  plan: GeneratedPlan;
  onReset: () => void;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b']; // Blue, Green, Amber

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, onReset }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workout' | 'diet'>('overview');

  const macroData = plan.macroSplit && plan.macroSplit.length > 0 ? [
    { name: 'Protein', value: plan.macroSplit[0].protein },
    { name: 'Carbs', value: plan.macroSplit[0].carbs },
    { name: 'Fats', value: plan.macroSplit[0].fats },
  ] : [];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-xl animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-4">
        <div>
            <h2 className="text-3xl font-bold text-slate-800">Your Personalized Plan</h2>
            <p className="text-slate-500 mt-1">AI-Powered recommendation based on your goals</p>
        </div>
        <button 
            onClick={onReset}
            className="mt-4 md:mt-0 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
            Start Over
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-8 bg-slate-100 p-1 rounded-xl w-full md:w-fit">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'overview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Activity size={18} />
          <span>Overview</span>
        </button>
        <button
          onClick={() => setActiveTab('workout')}
          className={`flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'workout' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Dumbbell size={18} />
          <span>Workout</span>
        </button>
        <button
          onClick={() => setActiveTab('diet')}
          className={`flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'diet' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Utensils size={18} />
          <span>Diet</span>
        </button>
      </div>

      {/* Overview Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Analysis Summary</h3>
                <p className="text-blue-800 leading-relaxed">{plan.summary}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Target Calories</p>
                    <p className="text-3xl font-extrabold text-slate-800 mt-2">{plan.dailyCalories}</p>
                    <p className="text-xs text-slate-400 mt-1">kcal / day</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">BMI Score</p>
                    <p className="text-3xl font-extrabold text-slate-800 mt-2">{plan.bmi.toFixed(1)}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        plan.bmiCategory === 'Normal' ? 'bg-green-100 text-green-700' : 
                        plan.bmiCategory.includes('Overweight') ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                        {plan.bmiCategory}
                    </span>
                </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center h-80">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 self-start">Macro Breakdown</h3>
            <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                        <Pie
                            data={macroData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {macroData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                    </RePieChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Workout Content */}
      {activeTab === 'workout' && (
        <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plan.workoutPlan.map((day, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-lg text-slate-800">{day.day}</h4>
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">{day.focus}</span>
                        </div>
                        <ul className="space-y-3">
                            {day.exercises.map((ex, i) => (
                                <li key={i} className="flex justify-between text-sm items-start">
                                    <span className="text-slate-700 w-2/3">{ex.name}</span>
                                    <span className="text-slate-500 text-right w-1/3 text-xs">{ex.sets} x {ex.reps}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* Diet Content */}
      {activeTab === 'diet' && (
        <div className="space-y-6 animate-fade-in-up">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mb-6 flex items-start gap-3">
                 <Utensils className="text-orange-500 mt-0.5" size={20}/>
                 <div>
                    <h4 className="font-semibold text-orange-900 text-sm">Dietary Note</h4>
                    <p className="text-orange-800 text-sm mt-1">This plan respects your dietary preference. Ensure you stay hydrated (3-4L water/day).</p>
                 </div>
            </div>

            <div className="space-y-4">
                {plan.dietPlan.map((meal, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all group">
                        <div className="bg-slate-50 w-full md:w-32 p-4 flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-slate-200 group-hover:bg-blue-50 transition-colors">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{meal.type}</span>
                            <span className="text-sm font-semibold text-slate-800 mt-1">{meal.calories} kcal</span>
                        </div>
                        <div className="p-4 md:p-6 flex-1">
                            <h4 className="text-lg font-bold text-slate-800 mb-2">{meal.name}</h4>
                            <p className="text-slate-600 leading-relaxed text-sm">{meal.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default PlanDisplay;