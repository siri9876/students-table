import { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import { Student, initialStudents } from '../data/students';
import { exportToExcel } from '../utils/excelExport';
import Header from '../components/Header';
import StudentTable from '../components/StudentTable';
import StudentFormModal from '../components/StudentFormModal';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setStudents(initialStudents);
      setIsLoading(false);
    }, 1500);
  }, []);

  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return students;

    const searchLower = searchTerm.toLowerCase();
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchLower) ||
        student.email.toLowerCase().includes(searchLower)
    );
  }, [students, searchTerm]);

  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      setStudents(students.filter((student) => student.id !== id));

      Swal.fire({
        title: 'Deleted!',
        text: 'Student has been removed successfully.',
        icon: 'success',
        confirmButtonColor: '#2563eb',
        timer: 2000,
      });
    }
  };

  const handleSubmitStudent = (studentData: Omit<Student, 'id'> | Student) => {
    if ('id' in studentData) {
      setStudents(
        students.map((student) =>
          student.id === studentData.id ? (studentData as Student) : student
        )
      );

      Swal.fire({
        title: 'Success!',
        text: 'Student information updated successfully.',
        icon: 'success',
        confirmButtonColor: '#2563eb',
        timer: 2000,
      });
    } else {
      const newStudent: Student = {
        ...studentData,
        id: students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1,
      };

      setStudents([...students, newStudent]);

      Swal.fire({
        title: 'Success!',
        text: 'New student added successfully.',
        icon: 'success',
        confirmButtonColor: '#2563eb',
        timer: 2000,
      });
    }
  };

  const handleDownloadExcel = () => {
    const dataToExport = searchTerm.trim() ? filteredStudents : students;

    if (dataToExport.length === 0) {
      Swal.fire({
        title: 'No Data',
        text: 'There are no students to export.',
        icon: 'info',
        confirmButtonColor: '#2563eb',
      });
      return;
    }

    exportToExcel(dataToExport);

    Swal.fire({
      title: 'Downloaded!',
      text: `Exported ${dataToExport.length} student${dataToExport.length !== 1 ? 's' : ''} to Excel.`,
      icon: 'success',
      confirmButtonColor: '#2563eb',
      timer: 2000,
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddStudent={handleAddStudent}
          onDownloadExcel={handleDownloadExcel}
        />

        <StudentTable
          students={filteredStudents}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />

        <StudentFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitStudent}
          editStudent={editingStudent}
        />
      </div>
    </div>
  );
};

export default Dashboard;
