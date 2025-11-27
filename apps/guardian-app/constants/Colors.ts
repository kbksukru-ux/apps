const tintColorLight = '#224A34'; // Dark Forest Green
const tintColorDark = '#F5F5F0'; // Sweet Dark White / Cream

export default {
  light: {
    text: '#1A1A1A', // Dark Gray
    background: '#F5F5F0', // Sweet Dark White / Cream
    tint: tintColorLight,
    tabIconDefault: '#A3B18A', // Sage Green
    tabIconSelected: tintColorLight,
    primary: '#224A34', // Dark Forest Green
    secondary: '#A3B18A', // Sage Green
    accent: '#D4A373', // Earthy Brown/Orange for contrast
    card: '#FFFFFF',
  },
  dark: {
    text: '#F5F5F0',
    background: '#1A1A1A', // Dark Gray
    tint: tintColorDark,
    tabIconDefault: '#588157',
    tabIconSelected: tintColorDark,
    primary: '#3A5A40', // Lighter Forest Green for dark mode
    secondary: '#A3B18A',
    accent: '#DAD7CD',
    card: '#224A34',
  },
};
