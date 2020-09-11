import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  withStyles
} from '@material-ui/core'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { deleteSession, clearStore } from '../../../actions/sessionsActions'
import logo from '../../../assets/images/logo.png'
import styles from './Header.styles'

class Header extends React.PureComponent {
  constructor(props) {
    super(props)
    this.tabsRef = React.createRef()
    this.state = {
      redirect: false
    }
  }

  onLogoutClick = () => {
    this.setState({ loading: true }, () => {
      this.props.deleteSession().then(() => {
        if (this.props.session.deletedSession) {
          this.props.clearStore().then(() => {
            this.setState({ isLogOut: true, redirect: true })
          })
        } else {
          this.setState({
            showResponseError: true,
            errorMessage: this.props.session.deletedSessionError,
            loading: false
          })
        }
      })
    })
  }

  render = () => {
    const { classes } = this.props
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar className={classes.headerGrid}>
              <div className={classes.headerMenu}>
                <Link className={classes.link} to="/">
                  <img src={logo} alt="Logo" />
                </Link>
                <div className={classes.navigationBlock}>
                  <Link className={classes.link} to="/agencies">
                    <Button className={classes.navigationItem}>Agencies</Button>
                  </Link>
                  <Link className={classes.link} to="/users">
                    <Button className={classes.navigationItem}>Users</Button>
                  </Link>
                  <Link className={classes.link} to="/library">
                    <Button className={classes.navigationItem}>Library</Button>
                  </Link>
                </div>
              </div>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.onLogoutClick}
                  // color="inherit"
                  style={{ fill: 'hsla(0,0%,100%,.65)' }}
                >
                  <ExitToApp className={classes.logoutIcon} />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    session: state.sessions
  }
}

Header.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    headerGrid: PropTypes.string,
    headerMenu: PropTypes.string,
    navigationBlock: PropTypes.string,
    navigationItem: PropTypes.string,
    logoutIcon: PropTypes.string,
    link: PropTypes.string
  })
}

Header.defaultProps = {
  classes: {
    root: '',
    headerGrid: '',
    headerMenu: '',
    navigationBlock: '',
    navigationItem: '',
    logoutIcon: '',
    link: ''
  }
}

export default connect(mapStateToProps, { deleteSession, clearStore })(
  withRouter(withStyles(styles)(Header))
)
