export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateStudentForm = (
  name: string,
  email: string,
  age: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (!email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!age.trim()) {
    errors.push({ field: 'age', message: 'Age is required' });
  } else {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum <= 0) {
      errors.push({ field: 'age', message: 'Age must be a positive number' });
    } else if (ageNum > 150) {
      errors.push({ field: 'age', message: 'Please enter a valid age' });
    }
  }

  return errors;
};
