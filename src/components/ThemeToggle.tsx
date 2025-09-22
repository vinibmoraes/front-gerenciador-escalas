import { Switch, FormControlLabel, Box } from '@mui/material';
import { useThemeContext } from '../contexts/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <LightModeIcon sx={{ color: isDarkMode ? 'text.secondary' : 'primary.main', mr: 1 }} />
      <FormControlLabel
        control={
          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            color="default"
          />
        }
        label=""
        labelPlacement="start"
      />
      <DarkModeIcon sx={{ color: isDarkMode ? 'primary.main' : 'text.secondary', ml: 1 }} />
    </Box>
  );
};

export default ThemeToggle;
