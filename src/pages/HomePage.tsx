import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import RegisterButton from '../components/RegisterButton';
import RegistrationForm from '../components/RegistrationForm';
import LoginButton from '../components/LoginButton';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';

const HomePage: React.FC = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleRegisterClick = () => {
    setFormVisible(true);
  };

  const handleFormClose = () => {
    setFormVisible(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" gutterBottom>
          Добро пожаловать на наш сайт
        </Typography>
        <Typography variant="h5" gutterBottom>
          Присоединяйтесь к нам сегодня!
        </Typography>
        <Box mt={4} display="flex" justifyContent="center" gap={2}>
          {authState.isAuthenticated ? (
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Выйти
            </Button>
          ) : (
            <>
              <RegisterButton onClick={handleRegisterClick} />
              <LoginButton />
            </>
          )}
        </Box>
      </motion.div>
      {isFormVisible && <RegistrationForm onClose={handleFormClose} />}
    </Container>
  );
};

export default HomePage;
