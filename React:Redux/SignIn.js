import React from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  FormHelperText,
  FormControl
} from '@material-ui/core'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createSession } from '../../actions/sessionsActions'

import Logo from '../core/Logo'
import ErrorSnackbar from '../core/ErrorSnackbar/ErrorSnackbar'

import './styled.scss'

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      email: {
        value: '',
        error: ''
      },
      password: {
        value: '',
        error: ''
      },
      loading: false,
      showResponseError: false,
      errorMessage: ''
    }
  }

  onNextClick = () => {
    const { email, password } = this.state

    let hasError = false

    if (!email.value) {
      this.setState({
        email: { ...email, error: `Email can't be empty` }
      })
      hasError = true
    }
    if (!password.value) {
      this.setState({
        password: { ...password, error: `Password can't be empty` }
      })
      hasError = true
    }
    if (hasError) return
    const sendingObject = {
      email: email.value,
      password: password.value
    }
    this.setState({ loading: true }, () => {
      this.props.createSession(sendingObject).then(() => {
        if (this.props.session && this.props.session.createdSession) {
          this.setState({ loading: false }, () => {
            this.props.history.push('/agencies')
          })
        } else {
          this.setState({
            showResponseError: true,
            errorMessage: this.props.session.createdSessionError
          })
        }
      })
    })
  }

  onSnackbarClose = () => {
    this.setState({ showResponseError: false }, () => {
      this.setState({ errorMessage: '' })
    })
  }

  render() {
    const { email, password, showResponseError, errorMessage } = this.state
    return (
      <>
        <ErrorSnackbar
          isOpen={showResponseError}
          message={errorMessage}
          onSnackbarClose={this.onSnackbarClose}
        />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <Avatar className="logo">
              <Logo />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className="form" noValidate>
              <FormControl fullWidth margin="dense" error={!!email.error}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Login"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email.value}
                  onChange={event =>
                    this.setState({
                      email: {
                        ...email,
                        value: event.target.value.toLowerCase(),
                        error: ''
                      }
                    })}
                />
                {!!email.error && (
                  <FormHelperText>{email.error}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth margin="dense" error={!!password.error}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password.value}
                  onChange={event =>
                    this.setState({
                      password: {
                        ...password,
                        value: event.target.value,
                        error: ''
                      }
                    })
                  }
                />
                {!!password.error && (
                  <FormHelperText>{password.error}</FormHelperText>
                )}
              </FormControl>
            </form>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={this.onNextClick}
            >
              Sign In
            </Button>
          </div>
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => {
  return { session: state.sessions }
}

export default connect(mapStateToProps, { createSession })(withRouter(SignIn))
