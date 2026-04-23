import React, { useState } from 'react';

// State Management with useState
const Form = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    // Handling Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Toggle Password Visibility
    const togglePassword = () => setShowPassword(prev => !prev);

    // Form Validation
    const validateForm = () => {
        const newErrors = {};
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!emailPattern.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setSubmittedData(formData);
            console.log('Form data submitted:', formData);
        }
    };

    //Reusable Input Rendering
    const renderInput = (label, name, type = 'text') => (
        <div>
            <label htmlFor={name}>{label}:</label>
            <input
                type={name === 'password' ? (showPassword ? 'text' : 'password') : type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                style={{ borderColor: errors[name] ? 'red' : 'black' }}
            />
            {name === 'password' && (
                <button type="button" onClick={togglePassword}>
                    {showPassword ? 'Hide Password' : 'Show Password'}
                </button>
            )}
            {errors[name] && <p style={{ color: 'red' }}>{errors[name]}</p>}
        </div>
    );

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {renderInput('Name', 'name')}
                {renderInput('Email', 'email', 'email')}
                {renderInput('Password', 'password')}
                <button type="submit">Submit</button>
            </form>

            {submittedData && (
                <div>
                    <h3>Submitted Data:</h3>
                    <p>Name: {submittedData.name}</p>
                    <p>Email: {submittedData.email}</p>
                    <p>Password: {submittedData.password}</p>
                </div>
            )}
        </div>
    );
};

export default Form;