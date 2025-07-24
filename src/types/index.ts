export interface FormData {
  name: string;
  age: number;
  city: string;
  income: number;
  dependents: number;
}

export interface InsuranceRecommendation {
  cover: number;
  reasoning: string;
}

export interface FormErrors {
  name?: string;
  age?: string;
  city?: string;
  income?: string;
  dependents?: string;
}