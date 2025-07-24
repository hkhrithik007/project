export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatIncome = (value: string): string => {
  const numericValue = value.replace(/[^\d]/g, '');
  if (!numericValue) return '';
  
  const number = parseInt(numericValue);
  return number.toLocaleString('en-IN');
};

export const validateForm = (data: FormData): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!data.age || data.age < 18 || data.age > 80) {
    errors.age = 'Age must be between 18 and 80';
  }
  
  if (!data.city.trim()) {
    errors.city = 'City is required';
  }
  
  if (!data.income || data.income < 50000) {
    errors.income = 'Income must be at least ₹50,000';
  }
  
  if (data.dependents < 0 || data.dependents > 10) {
    errors.dependents = 'Dependents must be between 0 and 10';
  }
  
  return errors;
};

export const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
  'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
  'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar',
  'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad'
];