import React, { useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTasks } from '../features/tasks/tasksSlice';

interface Board {
  name: string;
  tasks: string[];
}

const BoardsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasksState = useAppSelector((state) => state.tasks);
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authState.isAuthenticated) {
      dispatch(fetchTasks());
    }
  }, [dispatch, authState.isAuthenticated]);

  const boards: Board[] = [
    {
      name: 'Доска А',
      tasks: tasksState.tasks.slice(0, 3).map(task => task.title),
    },
    {
      name: 'Доска Б',
      tasks: tasksState.tasks.slice(3, 5).map(task => task.title),
    },
  ];

  if (tasksState.loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 5, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (tasksState.error) {
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography color="error" variant="h6">
          {tasksState.error}
        </Typography>
      </Container>
    );
  }

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
