# Component Architecture Guide

## Component Overview

This document provides a detailed breakdown of each component and its responsibilities.

## Component Hierarchy

```
App.tsx
└── Dashboard.tsx (Main Page)
    ├── Header.tsx
    │   ├── SearchBar.tsx
    │   └── Action Buttons
    ├── StudentTable.tsx
    │   └── Table Rows with Actions
    ├── StudentFormModal.tsx
    │   └── Form Fields
    └── LoadingSpinner.tsx (Conditional)
```

## Component Details

### 1. App.tsx
**Location**: `src/App.tsx`

**Purpose**: Root component that renders the Dashboard

**Props**: None

**State**: None

```typescript
import Dashboard from './pages/Dashboard';

function App() {
  return <Dashboard />;
}
```

---

### 2. Dashboard.tsx
**Location**: `src/pages/Dashboard.tsx`

**Purpose**: Main container that manages all state and business logic

**State**:
- `students`: Array of student objects
- `isLoading`: Boolean for loading state
- `searchTerm`: String for search functionality
- `isModalOpen`: Boolean for modal visibility
- `editingStudent`: Student object or null for edit mode

**Key Functions**:
- `handleAddStudent()`: Opens modal for adding
- `handleEditStudent()`: Opens modal with pre-filled data
- `handleDeleteStudent()`: Shows confirmation and deletes
- `handleSubmitStudent()`: Adds or updates student
- `handleDownloadExcel()`: Exports filtered data to Excel

**Child Components**:
- Header
- StudentTable
- StudentFormModal
- LoadingSpinner

---

### 3. Header.tsx
**Location**: `src/components/Header.tsx`

**Purpose**: Displays title, description, action buttons, and search bar

**Props**:
```typescript
interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddStudent: () => void;
  onDownloadExcel: () => void;
}
```

**Features**:
- Responsive layout (stacks on mobile)
- Two action buttons (Add Student, Download Excel)
- Integrated search bar
- Gradient background on buttons

**Child Components**:
- SearchBar

---

### 4. SearchBar.tsx
**Location**: `src/components/SearchBar.tsx`

**Purpose**: Search input with icon for filtering students

**Props**:
```typescript
interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}
```

**Features**:
- Search icon from react-icons
- Real-time filtering
- Focus ring styling
- Placeholder text

**Styling**:
- White background
- Border with focus ring
- Left-aligned search icon
- Responsive width

---

### 5. StudentTable.tsx
**Location**: `src/components/StudentTable.tsx`

**Purpose**: Displays students in a table with action buttons

**Props**:
```typescript
interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}
```

**Features**:
- Responsive table layout
- Avatar with initials
- Age badge styling
- Hover effects on rows
- Edit and delete icons
- Empty state message
- Row count display

**Table Columns**:
1. ID - Student ID number
2. Name - Avatar + Full name
3. Email - Email address
4. Age - Age badge
5. Actions - Edit and delete icons

**Empty State**:
- Shows when no students exist or no search results
- Icon, title, and description
- Centered layout

---

### 6. StudentFormModal.tsx
**Location**: `src/components/StudentFormModal.tsx`

**Purpose**: Modal form for adding or editing students

**Props**:
```typescript
interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Omit<Student, 'id'> | Student) => void;
  editStudent?: Student | null;
}
```

**State**:
- `name`: String
- `email`: String
- `age`: String
- `errors`: Array of validation errors

**Features**:
- Pre-fills data in edit mode
- Real-time validation
- Field-level error messages
- Smooth slide-up animation
- Backdrop blur effect
- Responsive layout

**Form Fields**:
1. Name - Text input with user icon
2. Email - Email input with mail icon
3. Age - Number input with calendar icon

**Validation**:
- All fields required
- Email must be valid format
- Age must be positive number
- Age cannot exceed 150

**Behavior**:
- Opens with edit data if provided
- Clears form on close
- Shows errors below fields
- Prevents submission if invalid

---

### 7. LoadingSpinner.tsx
**Location**: `src/components/LoadingSpinner.tsx`

**Purpose**: Loading state indicator

**Props**: None

**Features**:
- Centered spinner
- Gradient background
- Rotating animation
- Loading message

**Styling**:
- Full screen overlay
- Blue spinning circle
- "Loading students..." text

---

## Utility Files

### validation.ts
**Location**: `src/utils/validation.ts`

**Exports**:
- `validateEmail()`: Email format validation
- `validateStudentForm()`: Complete form validation

**Returns**: Array of validation errors with field and message

---

### excelExport.ts
**Location**: `src/utils/excelExport.ts`

**Exports**:
- `exportToExcel()`: Converts student array to Excel file

**Parameters**:
- `students`: Array of students
- `filename`: Optional filename (default: 'students.xlsx')

**Features**:
- Converts JSON to worksheet
- Sets column widths
- Downloads file automatically

---

## Data Files

### students.ts
**Location**: `src/data/students.ts`

**Exports**:
- `Student` interface
- `initialStudents` array

**Student Interface**:
```typescript
interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
}
```

---

## State Management Flow

### Adding a Student
1. User clicks "Add Student" in Header
2. Dashboard sets `isModalOpen = true`
3. StudentFormModal opens (empty form)
4. User fills form and submits
5. Form validates input
6. Dashboard receives data
7. New student added to state with generated ID
8. Modal closes
9. Table updates with new student

### Editing a Student
1. User clicks edit icon in StudentTable
2. Dashboard sets `editingStudent` and `isModalOpen = true`
3. StudentFormModal opens with pre-filled data
4. User modifies form and submits
5. Form validates input
6. Dashboard receives updated data
7. Student updated in state array
8. Modal closes
9. Table updates with modified student

### Deleting a Student
1. User clicks delete icon in StudentTable
2. Dashboard shows SweetAlert2 confirmation
3. User confirms deletion
4. Dashboard filters out student from state
5. Table updates without deleted student
6. Success message displayed

### Searching Students
1. User types in SearchBar
2. Dashboard updates `searchTerm` state
3. `filteredStudents` memo recalculates
4. StudentTable receives filtered array
5. Table updates in real-time

### Exporting to Excel
1. User clicks "Download Excel" in Header
2. Dashboard checks if search is active
3. Exports filtered students if searching, otherwise all
4. Excel file downloads
5. Success message displayed

---

## Styling Conventions

### Color Palette
- **Primary**: Blue (600-700)
- **Success**: Green (600-700)
- **Error**: Red (600-700)
- **Neutral**: Slate (50-900)

### Spacing
- Consistent padding/margin (px-4, py-2, etc.)
- Card padding: p-6
- Section spacing: mb-6

### Typography
- Headers: font-bold, large sizes
- Body: font-medium, medium sizes
- Labels: font-medium, text-sm

### Animations
- Transitions: duration-200
- Hover effects on buttons/rows
- Modal slide-up animation
- Focus rings on interactive elements

---

## Best Practices Applied

1. **Single Responsibility**: Each component has one clear purpose
2. **Props Down, Events Up**: Parent manages state, children emit events
3. **Composition**: Small, reusable components
4. **Type Safety**: Full TypeScript coverage
5. **User Feedback**: Loading states, empty states, error messages
6. **Accessibility**: Focus states, proper labels, semantic HTML
7. **Performance**: useMemo for filtering, conditional rendering
8. **Maintainability**: Clear naming, organized structure

---

## Customization Guide

### Changing Colors
1. Update Tailwind classes in components
2. Replace `blue-600` with your color
3. Maintain consistency across components

### Adding Fields
1. Update `Student` interface in `students.ts`
2. Add field to `StudentFormModal`
3. Add validation in `validation.ts`
4. Add column to `StudentTable`

### Changing Icons
1. Import different icons from `react-icons`
2. Replace icon components
3. Maintain size consistency (w-5 h-5 typically)

### Modifying Table
1. Edit columns in `StudentTable.tsx`
2. Update interface if adding data
3. Adjust Excel export if needed

---

**This architecture ensures maintainability, scalability, and clean code organization.**
