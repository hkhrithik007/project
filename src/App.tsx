import React, { useState } from 'react';
import { FormData, InsuranceRecommendation, FormErrors } from './types';
import { validateForm } from './utils/formatting';
import { getInsuranceRecommendation } from './services/openai';
import Logo from './components/Logo';
import FormStep from './components/FormStep';
import LoadingScreen from './components/LoadingScreen';
import Results from './components/Results';

type AppState = 'form' | 'loading' | 'results' | 'error';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [appState, setAppState] = useState<AppState>('form');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: 0,
    city: '',
    income: 0,
    dependents: 0
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [recommendation, setRecommendation] = useState<InsuranceRecommendation | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDataChange = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    // Clear errors for the field being updated
    const updatedField = Object.keys(data)[0];
    if (errors[updatedField as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [updatedField]: undefined }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const stepValidations: { [key: number]: () => boolean } = {
      1: () => {
        if (!formData.name.trim()) {
          setErrors({ name: 'Name is required' });
          return false;
        }
        if (formData.name.trim().length < 2) {
          setErrors({ name: 'Name must be at least 2 characters' });
          return false;
        }
        return true;
      },
      2: () => {
        if (!formData.age || formData.age < 18 || formData.age > 80) {
          setErrors({ age: 'Please select a valid age between 18 and 80' });
          return false;
        }
        return true;
      },
      3: () => {
        if (!formData.city.trim()) {
          setErrors({ city: 'City is required' });
          return false;
        }
        return true;
      },
      4: () => {
        if (!formData.income || formData.income < 50000) {
          setErrors({ income: 'Income must be at least ₹50,000' });
          return false;
        }
        return true;
      },
      5: () => {
        if (formData.dependents < 0 || formData.dependents > 10) {
          setErrors({ dependents: 'Dependents must be between 0 and 10' });
          return false;
        }
        return true;
      }
    };

    const validator = stepValidations[currentStep];
    return validator ? validator() : true;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setErrors({});

    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final step - submit form
      const formErrors = validateForm(formData);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      try {
        setAppState('loading');
        const result = await getInsuranceRecommendation(formData);
        setRecommendation(result);
        setAppState('results');
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        setAppState('error');
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setErrors({});
    }
  };

  const startOver = () => {
    setCurrentStep(1);
    setAppState('form');
    setFormData({
      name: '',
      age: 0,
      city: '',
      income: 0,
      dependents: 0
    });
    setErrors({});
    setRecommendation(null);
    setErrorMessage('');
  };

  const renderContent = () => {
    switch (appState) {
      case 'form':
        return (
          <FormStep
            step={currentStep}
            data={formData}
            errors={errors}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentStep === 1}
            isLast={currentStep === 5}
          />
        );
      
      case 'loading':
        return <LoadingScreen />;
      
      case 'results':
        return recommendation ? (
          <Results
            recommendation={recommendation}
            onStartOver={startOver}
          />
        ) : null;
      
      case 'error':
        return (
          <div className="w-full max-w-md mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="text-red-600 text-lg font-semibold mb-2">
                Oops! Something went wrong
              </div>
              <p className="text-red-700 mb-4">{errorMessage}</p>
              <button
                onClick={() => setAppState('form')}
                className="bg-[#D7263D] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        <Logo />
        
        <div className="flex justify-center">
          {renderContent()}
        </div>
        
        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>© 2025 NICSAN. Protecting what matters most.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;