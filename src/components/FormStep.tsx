import React, { useState } from 'react';
import { FormData, FormErrors } from '../types';
import { formatIncome, indianCities } from '../utils/formatting';

interface FormStepProps {
  step: number;
  data: FormData;
  errors: FormErrors;
  onDataChange: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const FormStep: React.FC<FormStepProps> = ({
  step,
  data,
  errors,
  onDataChange,
  onNext,
  onPrev,
  isFirst,
  isLast
}) => {
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const handleCityChange = (value: string) => {
    onDataChange({ city: value });
    if (value.length > 0) {
      const filtered = indianCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setFilteredCities(filtered);
      setShowCityDropdown(true);
    } else {
      setShowCityDropdown(false);
    }
  };

  const selectCity = (city: string) => {
    onDataChange({ city });
    setShowCityDropdown(false);
  };

  const handleIncomeChange = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (numericValue) {
      onDataChange({ income: parseInt(numericValue) });
    } else {
      onDataChange({ income: 0 });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#004E98] text-center">What's your name?</h2>
            <div>
              <input
                type="text"
                value={data.name}
                onChange={(e) => onDataChange({ name: e.target.value })}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E98] transition-all ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                autoFocus
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#004E98] text-center">How old are you?</h2>
            <div>
              <select
                value={data.age || ''}
                onChange={(e) => onDataChange({ age: parseInt(e.target.value) })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E98] transition-all ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select your age</option>
                {Array.from({ length: 63 }, (_, i) => i + 18).map(age => (
                  <option key={age} value={age}>{age} years</option>
                ))}
              </select>
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#004E98] text-center">Which city do you live in?</h2>
            <div className="relative">
              <input
                type="text"
                value={data.city}
                onChange={(e) => handleCityChange(e.target.value)}
                placeholder="Type your city name"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E98] transition-all ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                onFocus={() => {
                  if (data.city && filteredCities.length > 0) {
                    setShowCityDropdown(true);
                  }
                }}
                onBlur={() => {
                  setTimeout(() => setShowCityDropdown(false), 200);
                }}
              />
              {showCityDropdown && filteredCities.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredCities.map((city, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectCity(city)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#004E98] text-center">What's your annual income?</h2>
            <div>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 text-lg">₹</span>
                <input
                  type="text"
                  value={data.income ? formatIncome(data.income.toString()) : ''}
                  onChange={(e) => handleIncomeChange(e.target.value)}
                  placeholder="Enter annual income"
                  className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E98] transition-all ${
                    errors.income ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.income && <p className="text-red-500 text-sm mt-1">{errors.income}</p>}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#004E98] text-center">How many dependents do you have?</h2>
            <p className="text-gray-600 text-center">Include spouse, children, and parents</p>
            <div className="flex items-center justify-center space-x-4">
              <button
                type="button"
                onClick={() => onDataChange({ dependents: Math.max(0, data.dependents - 1) })}
                className="w-12 h-12 bg-[#004E98] text-white rounded-full text-xl font-bold hover:bg-[#003875] transition-colors"
                disabled={data.dependents === 0}
              >
                -
              </button>
              <div className="text-4xl font-bold text-[#004E98] w-16 text-center">
                {data.dependents}
              </div>
              <button
                type="button"
                onClick={() => onDataChange({ dependents: Math.min(10, data.dependents + 1) })}
                className="w-12 h-12 bg-[#004E98] text-white rounded-full text-xl font-bold hover:bg-[#003875] transition-colors"
                disabled={data.dependents === 10}
              >
                +
              </button>
            </div>
            {errors.dependents && <p className="text-red-500 text-sm mt-1 text-center">{errors.dependents}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Step {step} of 5</span>
          <span className="text-sm text-gray-600">{Math.round((step / 5) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#004E98] to-[#D7263D] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Step Content */}
      <div className="mb-8">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between space-x-4">
        {!isFirst && (
          <button
            type="button"
            onClick={onPrev}
            className="flex-1 px-6 py-3 border-2 border-[#004E98] text-[#004E98] rounded-lg hover:bg-[#004E98] hover:text-white transition-all font-semibold"
          >
            Previous
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className={`${isFirst ? 'w-full' : 'flex-1'} px-6 py-3 bg-gradient-to-r from-[#004E98] to-[#D7263D] text-white rounded-lg hover:shadow-lg transition-all font-semibold`}
        >
          {isLast ? 'Get Quote' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default FormStep;