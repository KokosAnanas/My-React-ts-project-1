import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import RegisterButton from '../components/RegisterButton';
import RegistrationForm from '../components/RegistrationForm';

const HomePage: React.FC = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleRegisterClick = () => {
    setFormVisible(true);
  };

  const handleFormClose = () => {
    setFormVisible(false);
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
        <Box mt={4}>
          <RegisterButton onClick={handleRegisterClick} />
        </Box>
      </motion.div>
      {isFormVisible && <RegistrationForm onClose={handleFormClose} />}
    </Container>
  );
};

export default HomePage;
