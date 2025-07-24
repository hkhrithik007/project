import React from 'react';
import { InsuranceRecommendation } from '../types';
import { formatCurrency } from '../utils/formatting';
import AnimatedRupee from './AnimatedRupee';

interface ResultsProps {
  recommendation: InsuranceRecommendation;
  onStartOver: () => void;
}

const Results: React.FC<ResultsProps> = ({ recommendation, onStartOver }) => {
  const monthlyPremium = Math.round(recommendation.cover * 0.009);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#004E98] mb-4">Your Insurance Recommendation</h2>
        <div className="flex items-center justify-center mb-4">
          <AnimatedRupee isActive={false} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
        {/* Recommended Cover */}
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-[#D7263D] mb-2">
            {formatCurrency(recommendation.cover)}
          </div>
          <div className="text-lg text-gray-600">Recommended Cover Amount</div>
        </div>

        {/* Monthly Premium */}
        <div className="bg-gradient-to-r from-[#004E98] to-[#D7263D] rounded-lg p-6 text-white text-center mb-6">
          <div className="text-2xl font-bold mb-1">
            {formatCurrency(monthlyPremium)}/month
          </div>
          <div className="text-sm opacity-90">Estimated Monthly Premium</div>
        </div>

        {/* Reasoning */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-[#004E98] mb-3">Why this amount?</h3>
          <p className="text-gray-700 leading-relaxed">{recommendation.reasoning}</p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl mb-2">🏥</div>
            <div className="text-sm font-semibold text-[#004E98]">Cashless Treatment</div>
            <div className="text-xs text-gray-600">5000+ Network Hospitals</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl mb-2">💊</div>
            <div className="text-sm font-semibold text-[#004E98]">Medicine Coverage</div>
            <div className="text-xs text-gray-600">Pre & Post Hospitalization</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl mb-2">🚑</div>
            <div className="text-sm font-semibold text-[#004E98]">Emergency Care</div>
            <div className="text-xs text-gray-600">24/7 Ambulance Service</div>
          </div>
        </div>

        {/* WhatsApp Quote Button */}
        <button className="w-full bg-gradient-to-r from-[#004E98] to-[#D7263D] text-white py-4 px-6 rounded-lg text-lg font-bold hover:shadow-lg transition-all mb-4">
          📱 WhatsApp Quote
        </button>

        {/* Start Over Button */}
        <button
          onClick={onStartOver}
          className="w-full border-2 border-[#004E98] text-[#004E98] py-3 px-6 rounded-lg font-semibold hover:bg-[#004E98] hover:text-white transition-all"
        >
          Calculate for Different Profile
        </button>
      </div>
    </div>
  );
};

export default Results;