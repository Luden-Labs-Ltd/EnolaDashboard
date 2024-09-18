import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { theme } from 'theme/theme';


interface WithThemeProps {
}

const withTheme = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithTheme: React.FC<P & WithThemeProps> = (props) => {
    return (
      <ThemeProvider theme={theme}>
          <WrappedComponent {...props} />
      </ThemeProvider>
    );
  };

  return ComponentWithTheme;
};

export default withTheme;