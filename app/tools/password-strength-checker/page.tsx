
'use client';

import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import zxcvbn from 'zxcvbn';

export default function PasswordStrengthCheckerPage() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState<any>(null);

  useEffect(() => {
    if (password) {
      setStrength(zxcvbn(password));
    } else {
      setStrength(null);
    }
  }, [password]);

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0:
        return 'text-red-500';
      case 1:
        return 'text-orange-500';
      case 2:
        return 'text-yellow-500';
      case 3:
        return 'text-blue-500';
      case 4:
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStrengthText = (score: number) => {
    switch (score) {
      case 0:
        return 'Very Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Excellent';
      default:
        return 'Enter a password';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Password Strength Checker</h1>
          <p className="text-lg text-gray-600 mt-2">Check the strength of your passwords.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <Lock className="w-16 h-16 mb-4 text-gray-500" />
            <div className="w-full mb-4">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {strength && (
              <div className="w-full mt-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Strength: <span className={getStrengthColor(strength.score)}>{getStrengthText(strength.score)}</span></h2>
                {strength.feedback.suggestions.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Suggestions:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {strength.feedback.suggestions.map((suggestion: string, index: number) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
