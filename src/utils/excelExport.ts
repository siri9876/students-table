import * as XLSX from 'xlsx';
import { Student } from '../data/students';

export const exportToExcel = (students: Student[], filename: string = 'students.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(students);

  const columnWidths = [
    { wch: 10 },
    { wch: 25 },
    { wch: 30 },
    { wch: 10 }
  ];
  worksheet['!cols'] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

  XLSX.writeFile(workbook, filename);
};
