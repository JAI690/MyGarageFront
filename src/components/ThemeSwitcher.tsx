import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { toggleTheme, mode } = useThemeContext();

  return (
    <FormControlLabel
      control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
      label={mode === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
    />
  );
};

export default ThemeSwitcher;
