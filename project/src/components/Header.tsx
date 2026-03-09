import { FiUserPlus, FiDownload } from 'react-icons/fi';
import SearchBar from './SearchBar';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddStudent: () => void;
  onDownloadExcel: () => void;
}

const Header = ({ searchTerm, onSearchChange, onAddStudent, onDownloadExcel }: HeaderProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-1">
            Student Management Dashboard
          </h1>
          <p className="text-slate-500">Manage and track student information efficiently</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onAddStudent}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600
                     text-white font-medium rounded-lg hover:bg-blue-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <FiUserPlus className="w-5 h-5 mr-2" />
            Add Student
          </button>
          <button
            onClick={onDownloadExcel}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-green-600
                     text-white font-medium rounded-lg hover:bg-green-700
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                     transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <FiDownload className="w-5 h-5 mr-2" />
            Download Excel
          </button>
        </div>
      </div>
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </div>
  );
};

export default Header;
