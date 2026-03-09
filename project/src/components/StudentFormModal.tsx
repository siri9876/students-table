import { useState, useEffect } from 'react';
import { FiX, FiUser, FiMail, FiCalendar } from 'react-icons/fi';
import { Student } from '../data/students';
import { validateStudentForm, ValidationError } from '../utils/validation';

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Omit<Student, 'id'> | Student) => void;
  editStudent?: Student | null;
}

const StudentFormModal = ({ isOpen, onClose, onSubmit, editStudent }: StudentFormModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name);
      setEmail(editStudent.email);
      setAge(editStudent.age.toString());
    } else {
      setName('');
      setEmail('');
      setAge('');
    }
    setErrors([]);
  }, [editStudent, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateStudentForm(name, email, age);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const studentData = {
      ...(editStudent && { id: editStudent.id }),
      name: name.trim(),
      email: email.trim(),
      age: parseInt(age),
    };

    onSubmit(studentData);
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setAge('');
    setErrors([]);
    onClose();
  };

  const getFieldError = (field: string) => {
    return errors.find(error => error.field === field)?.message;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-slate-900 bg-opacity-50 backdrop-blur-sm"
          onClick={handleClose}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-modal-slide-up">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">
                {editStudent ? 'Edit Student' : 'Add New Student'}
              </h3>
              <button
                onClick={handleClose}
                className="text-white hover:text-blue-100 transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white px-6 py-6">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  <FiUser className="inline w-4 h-4 mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors(errors.filter(err => err.field !== 'name'));
                  }}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    getFieldError('name')
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Enter student name"
                />
                {getFieldError('name') && (
                  <p className="mt-1.5 text-sm text-red-600">{getFieldError('name')}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  <FiMail className="inline w-4 h-4 mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors(errors.filter(err => err.field !== 'email'));
                  }}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    getFieldError('email')
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Enter email address"
                />
                {getFieldError('email') && (
                  <p className="mt-1.5 text-sm text-red-600">{getFieldError('email')}</p>
                )}
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-2">
                  <FiCalendar className="inline w-4 h-4 mr-1" />
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setErrors(errors.filter(err => err.field !== 'age'));
                  }}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    getFieldError('age')
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Enter age"
                  min="1"
                />
                {getFieldError('age') && (
                  <p className="mt-1.5 text-sm text-red-600">{getFieldError('age')}</p>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg
                         hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
                         transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {editStudent ? 'Update Student' : 'Add Student'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentFormModal;
