import React from 'react';
import { Container, Typography, Box, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

interface Board {
  name: string;
  tasks: string[];
}

const BoardsPage: React.FC = () => {
  const boards: Board[] = [
    {
      name: 'Доска А',
      tasks: ['Задача 1', 'Задача 2', 'Задача 3'],
    },
    {
      name: 'Доска Б',
      tasks: ['Задача 4', 'Задача 5'],
    },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Доски
      </Typography>
      <Box display="flex" flexDirection="column" gap={3}>
        {boards.map((board, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {board.name}
                </Typography>
                <List>
                  {board.tasks.map((task, idx) => (
                    <ListItem key={idx}>
                      <ListItemText primary={task} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
};

export default BoardsPage;

