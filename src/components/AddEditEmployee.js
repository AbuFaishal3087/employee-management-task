import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { addEmployee, removeSelectedEmployee, setSelectedEmployee, updateEmployee } from '../redux/employeesSlice';

const AddEditEmployee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const employee = useSelector((state) => state.employees.selectedEmployee);
    const employees = useSelector((state) => state.employees.employees);
    const { id } = useParams();
    let initialData = {
        name: "",
        age: "",
        image: "",
        phone: "",
        salary: "",
        email: ""
    }
    const [formData, setFormData] = useState(initialData);

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.age || formData.age <= 0) newErrors.age = 'Age must be a positive number';
        if (!formData.phone.trim().match(/^\+?\d{1,4}\s?\d{10}$/)) newErrors.phone = 'Invalid phone number';
        if (formData.salary && isNaN(formData.salary)) newErrors.salary = 'Salary must be a number';
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Invalid email address';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const sanitizedValue = value.replace(/[^+\d\s]/g, '');
            setFormData((prevData) => ({
                ...prevData,
                [name]: sanitizedValue
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (validImageTypes.includes(file.type)) {
                setFormData((prevData) => ({
                    ...prevData,
                    image: URL.createObjectURL(file)
                }));
            } else {
                alert('Please select a valid image file (JPG, PNG, GIF).');
            }
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            if (employee) {
                dispatch(updateEmployee({ ...employee, ...formData }));
            } else {
                const newEmployee = {
                    id: Date.now(),
                    ...formData
                };
                dispatch(addEmployee(newEmployee));
            }
            dispatch(removeSelectedEmployee());
            navigate('/');
        }
    };

    const handleBack = () => {
        navigate('/');
        dispatch(removeSelectedEmployee());
    };

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name,
                age: employee.age,
                image: employee.image,
                phone: employee.phone || '',
                salary: employee.salary || '',
                email: employee.email || ''
            })
        } else {
            if (id) {
                const selectedUserData = employees.find((val) => val.id == id);
                if (selectedUserData !== -1) {
                    setFormData({
                        name: selectedUserData.name,
                        age: selectedUserData.age,
                        image: selectedUserData.image,
                        phone: selectedUserData.phone || '',
                        salary: selectedUserData.salary || '',
                        email: selectedUserData.email || ''
                    })
                    dispatch(setSelectedEmployee(selectedUserData));
                }
            }
        }
    }, [id, employees])
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
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
                    width: '100%',
                    maxWidth: 600,
                    backgroundColor: '#fff',
                    textAlign: 'center',
                }}
            >
                <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{ mb: 2, textTransform: 'none' }}
                >
                    {"< "}Back to List
                </Button>
                {
                    employee &&
                    <Typography variant="h4" gutterBottom>
                        Edit Employee: {formData.name}
                    </Typography>
                }


                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 3,
                    }}
                >
                    <img
                        src={formData.image || "https://via.placeholder.com/150"}
                        alt={formData.name}
                        style={{
                            borderRadius: '50%',
                            width: '150px',
                            height: '150px',
                            objectFit: 'cover',
                            marginRight: 16,
                        }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ textTransform: 'none' }}
                    >
                        Upload Profile Image
                        <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                    </Button>
                </Box>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        error={Boolean(errors.age)}
                        helperText={errors.age}
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                    />
                    <TextField
                        label="Salary"
                        name="salary"
                        type="number"
                        value={formData.salary}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        error={Boolean(errors.salary)}
                        helperText={errors.salary}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ textTransform: 'none', padding: '12px', mt: 2 }}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AddEditEmployee;
