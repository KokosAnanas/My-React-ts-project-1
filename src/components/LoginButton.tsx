import React, { useState } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import LoginForm from './LoginForm'; 

const LoginButton: React.FC = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleLoginClick = () => {
    setFormVisible(true);
  };

  const handleFormClose = () => {
    setFormVisible(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button variant="outlined" color="primary" onClick={handleLoginClick}>
          Вход
        </Button>
      </motion.div>
      {isFormVisible && <LoginForm onClose={handleFormClose} />}
    </>
  );
};

export default LoginButton;
