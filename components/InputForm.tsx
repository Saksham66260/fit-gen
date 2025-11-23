import React, { useState } from 'react';
import { UserProfile, FitnessGoal, DietaryPreference } from '../types';
import { ChevronRight, Loader2 } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: UserProfile) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    age: 20,
    weight: 70,
    height: 170,
    goal: FitnessGoal.MAINTENANCE,
    preference: DietaryPreference.VEGETARIAN,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' || name === 'height' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-blue-600 p-6 text-white text-center">
        <h2 className="text-2xl font-bold">Create Your Profile</h2>
        <p className="text-blue-100 mt-2 text-sm">Tell us about yourself to get a personalized AI plan</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Chetan"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
        </div>

        <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Age</label>
                <input
                    type="number"
                    name="age"
                    min="10"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Weight (kg)</label>
                <input
                    type="number"
                    name="weight"
                    min="20"
                    max="200"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Height (cm)</label>
                <input
                    type="number"
                    name="height"
                    min="100"
                    max="250"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Fitness Goal</label>
            <div className="grid grid-cols-2 gap-3">
                {Object.values(FitnessGoal).map((goal) => (
                    <label key={goal} className={`
                        relative flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all
                        ${formData.goal === goal 
                            ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium ring-1 ring-blue-500' 
                            : 'border-slate-200 hover:border-blue-300 text-slate-600'}
                    `}>
                        <input
                            type="radio"
                            name="goal"
                            value={goal}
                            checked={formData.goal === goal}
                            onChange={handleChange}
                            className="sr-only"
                        />
                        <span className="text-sm">{goal}</span>
                    </label>
                ))}
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Dietary Preference</label>
            <select
                name="preference"
                value={formData.preference}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
                {Object.values(DietaryPreference).map((pref) => (
                    <option key={pref} value={pref}>{pref}</option>
                ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">We will customize meal suggestions based on this choice.</p>
        </div>

        <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
            {isLoading ? (
                <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Analyzing with AI...</span>
                </>
            ) : (
                <>
                    <span>Generate My Plan</span>
                    <ChevronRight size={20} />
                </>
            )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;