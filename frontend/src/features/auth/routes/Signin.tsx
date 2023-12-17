import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { login } from '@/api/auth'
import { toast } from 'react-toastify'
import { LoginRequestValidator } from 'pharmacy-common/validators/auth.validator'
import { useAuth } from '@/hooks/auth'
import { IconButton, InputAdornment, Paper } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Favorite } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Built with <Favorite sx={{ fontSize: 12 }} color="error" /> by{' '}
      <Link color="inherit" href="https://github.com/features/copilot">
        Copilot and Sons
      </Link>{' '}
      &copy; {new Date().getFullYear()}.
    </Typography>
  )
}

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const { refreshUser } = useAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const data = new FormData(event.currentTarget)

    const username = data.get('username') as string | null
    const password = data.get('password') as string | null

    if (username !== null && password !== null) {
      const requestData = { username, password }

      try {
        const validatedData = LoginRequestValidator.parse(requestData) // Validate using Zod

        const response = await login(validatedData)
        console.log(response)

        if (response.token) {
          refreshUser() // Call the refreshUser function to update the user information
        }
        // Handle the response from the API as needed
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CssBaseline />
      <Paper
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 5,
          width: 500,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            color="secondary"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            color="secondary"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    style={{ marginRight: '1px' }}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      className="fa-regular"
                      id="togglePasswordIcon"
                      style={{ fontSize: '16px', background: 'transparent' }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link
                href="./forgot-password"
                variant="body2"
                color="text.primary"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="./register-request"
                variant="body2"
                color="text.primary"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </Container>
  )
}
