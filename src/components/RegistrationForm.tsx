import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registerUser } from '../features/auth/authSlice';

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const resultAction = await dispatch(registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    }));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/boards');
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ p: 4, mt: 4, position: 'relative' }}>
        <Typography variant="h4" gutterBottom>
          Регистрация
        </Typography>
        {authState.error && (
          <Typography color="error" gutterBottom>
            {authState.error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Имя"
            fullWidth
            margin="normal"
            {...register('name', { required: 'Имя обязательно' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...register('email', { 
              required: 'Email обязателен',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Неверный формат Email'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Пароль"
            type="password"
            fullWidth
            margin="normal"
            {...register('password', { 
              required: 'Пароль обязателен',
              minLength: {
                value: 6,
                message: 'Минимальная длина пароля: 6 символов'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" type="submit" disabled={authState.loading}>
              {authState.loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Отмена
            </Button>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default RegistrationForm;
