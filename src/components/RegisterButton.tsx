import React from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

interface RegisterButtonProps {
  onClick: () => void;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button variant="contained" color="primary" onClick={onClick}>
        Зарегистрироваться
      </Button>
    </motion.div>
  );
};

export default RegisterButton;
