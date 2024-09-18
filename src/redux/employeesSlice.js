import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    employees: [
        { id: 1, name: 'John Doe', image: 'https://via.placeholder.com/150', age: 30, salary: 29000, phone: '+91 7903374117', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', image: 'https://via.placeholder.com/150', age: 25, salary: 29000, phone: '+91 7903374118', email: 'jane.smith@example.com' },
        { id: 3, name: 'Michael Johnson', image: 'https://via.placeholder.com/150', age: 40, salary: 28000, phone: '+91 7903374119', email: 'michael.johnson@example.com' },
        { id: 4, name: 'Emily Davis', image: 'https://via.placeholder.com/150', age: 22, salary: 29000, phone: '+91 7903374120', email: 'emily.davis@example.com' },
        // { id: 5, name: 'Christopher Miller', image: 'https://via.placeholder.com/150', age: 28, salary: 44000, phone: '+91 7903374121', email: 'christopher.miller@example.com' },
        // { id: 6, name: 'Olivia Brown', image: 'https://via.placeholder.com/150', age: 35, salary: 29000, phone: '+91 7903374122', email: 'olivia.brown@example.com' },
        // { id: 7, name: 'Daniel Wilson', image: 'https://via.placeholder.com/150', age: 32, salary: 12000, phone: '+91 7903374123', email: 'daniel.wilson@example.com' },
        // { id: 8, name: 'Sophia Garcia', image: 'https://via.placeholder.com/150', age: 27, salary: 29000, phone: '+91 7903374124', email: 'sophia.garcia@example.com' },
        // { id: 9, name: 'Liam Martinez', image: 'https://via.placeholder.com/150', age: 29, salary: 31000, phone: '+91 7903374125', email: 'liam.martinez@example.com' },
        // { id: 10, name: 'Mia Anderson', image: 'https://via.placeholder.com/150', age: 33, salary: 100000, phone: '+91 7903374126', email: 'mia.anderson@example.com' }
    ],
    selectedEmployee: null,
};

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setSelectedEmployee: (state, action) => {
            state.selectedEmployee = action.payload;
        },
        removeSelectedEmployee: (state, action) => {
            state.selectedEmployee = null;
        },
        addEmployee: (state, action) => {
            state.employees.push(action.payload);
        },
        updateEmployee: (state, action) => {
            const index = state.employees.findIndex(emp => emp.id === action.payload.id);
            if (index !== -1) {
                state.employees[index] = action.payload;
            }
        },
        deleteEmployee: (state, action) => {
            state.employees = state.employees.filter(emp => emp.id !== action.payload);
        },
    },
});

export const { setSelectedEmployee, removeSelectedEmployee, addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
