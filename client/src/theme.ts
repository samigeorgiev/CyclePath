import green from '@material-ui/core/colors/green'
import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#35A331',
            dark: '#82b27e',
            light: '#c8ffc3'
        },
        // primary: green,
        secondary: green
    }
})
