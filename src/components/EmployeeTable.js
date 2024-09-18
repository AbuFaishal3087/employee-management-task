import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, Paper, Typography } from '@mui/material';
import { setSelectedEmployee, deleteEmployee } from '../redux/employeesSlice';

const EmployeeTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const employees = useSelector((state) => state.employees.employees);

    const handleEdit = (employee) => {
        dispatch(setSelectedEmployee(employee));
        navigate(`/edit/${employee.id}`);
    };

    const handleDelete = (id) => {
        dispatch(deleteEmployee(id));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                padding: 2
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    maxWidth: '80%',
                    width: '100%',
                    margin: 'auto',
                    backgroundColor: '#ffffff',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Employee List
                </Typography>

                <TableContainer>
                    <Link to="/add">
                        <Button
                            variant="contained"
                            style={{
                                float: "right"
                            }}
                        >
                            + Add Employee
                        </Button>
                    </Link>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><strong>Image</strong></TableCell>
                                <TableCell align="center"><strong>Name</strong></TableCell>
                                <TableCell align="center"><strong>Age</strong></TableCell>
                                <TableCell align="center"><strong>Phone</strong></TableCell>
                                <TableCell align="center"><strong>Email</strong></TableCell>
                                <TableCell align="center"><strong>Salary (Rs)</strong></TableCell>
                                <TableCell align="center"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                employees.length === 0 ?
                                    <TableRow>
                                        <TableCell align="center">No data found</TableCell>
                                    </TableRow>
                                    :
                                    employees.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell align="center">
                                                <img src={employee.image || "https://via.placeholder.com/150"} alt={employee.name} width="50" />
                                            </TableCell>
                                            <TableCell align="center">{employee.name}</TableCell>
                                            <TableCell align="center">{employee.age}</TableCell>
                                            <TableCell align="center">{employee.phone}</TableCell>
                                            <TableCell align="center">{employee.email}</TableCell>
                                            <TableCell align="center">{employee.salary}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    sx={{ marginRight: 1 }}
                                                    onClick={() => handleEdit(employee)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleDelete(employee.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default EmployeeTable;
