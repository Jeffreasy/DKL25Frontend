import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';

interface Directory {
  name: string;
  path: string;
}

interface LoggerState {
  directories: Directory[];
  selectedDirectory: string;
  fileType: string;
  isLoading: boolean;
  result: {
    success: boolean;
    message: string;
    filesFound?: number;
    logPath?: string;
  } | null;
}

export default function FileLogger() {
  const [state, setState] = useState<LoggerState>({
    directories: [],
    selectedDirectory: '',
    fileType: '.tsx',
    isLoading: true,
    result: null,
  });

  useEffect(() => {
    // Laad beschikbare directories bij component mount
    fetchDirectories();
  }, []);

  const fetchDirectories = async () => {
    try {
      const response = await fetch('/api/dev/directories');
      const data = await response.json();
      setState(prev => ({
        ...prev,
        directories: data,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Kon directories niet laden:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const handleSubmit = async () => {
    setState(prev => ({ ...prev, isLoading: true, result: null }));

    try {
      const response = await fetch('/api/dev/generate-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          directory: state.selectedDirectory,
          fileType: state.fileType,
        }),
      });

      const result = await response.json();
      setState(prev => ({
        ...prev,
        isLoading: false,
        result: result,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        result: {
          success: false,
          message: 'Er is een fout opgetreden bij het genereren van de log.',
        },
      }));
    }
  };

  if (state.isLoading && !state.directories.length) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', my: 4 }}>
      <Typography variant="h5" gutterBottom>
        File Logger
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Directory</InputLabel>
        <Select
          value={state.selectedDirectory}
          label="Directory"
          onChange={(e) => setState(prev => ({ ...prev, selectedDirectory: e.target.value }))}
        >
          <MenuItem value="src">Hele src map</MenuItem>
          {state.directories.map((dir) => (
            <MenuItem key={dir.path} value={dir.path}>
              {dir.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Bestandstype"
        value={state.fileType}
        onChange={(e) => setState(prev => ({ ...prev, fileType: e.target.value }))}
        helperText="Bijvoorbeeld: .tsx, .ts, .js, .jsx"
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!state.selectedDirectory || !state.fileType || state.isLoading}
        fullWidth
      >
        {state.isLoading ? <CircularProgress size={24} /> : 'Genereer Log'}
      </Button>

      {state.result && (
        <Box mt={3} p={2} bgcolor={state.result.success ? 'success.light' : 'error.light'} borderRadius={1}>
          <Typography color="textPrimary">
            {state.result.message}
          </Typography>
          {state.result.success && (
            <>
              <Typography variant="body2" mt={1}>
                Aantal bestanden: {state.result.filesFound}
              </Typography>
              <Typography variant="body2">
                Log bestand: {state.result.logPath}
              </Typography>
            </>
          )}
        </Box>
      )}
    </Paper>
  );
} 