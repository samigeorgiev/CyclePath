import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2196f3',
            dark: '#1769aa',
            light: '#4dabf5'
        },
        secondary: green
    }
});
