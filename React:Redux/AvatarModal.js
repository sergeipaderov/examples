import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography, Button } from '@material-ui/core'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createBlob } from '../../actions/blobsActions'

import styles from './AvatarModal.styles';
import AvatarLogoUploader from '../common/AvatarLogoUploader/AvatarLogoUploader'
import ErrorSnackbar from '../core/ErrorSnackbar/ErrorSnackbar'

class AddAvatarModal extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      logo: null,
      loading: false,
      showResponseError: false,
      errorMessage: ''
    }
  }

  onLoadingSuccess = (value) => {
    this.setState({ logo: value, loading: false })
  }

  isLoadingNow = () => {
    this.setState({ loading: true })
  }

  onModalClose = () => {
    this.props.onModalClose()
  }

  onSaveClick = () => {
    if (this.state.logo) {
      this.setState({ loading: true }, () => {
        this.props.createBlob(this.state.logo).then(() => {
          if (this.props.blob && this.props.blob.createdBlob) {
            this.props.onAvatarLogoChanged(this.props.blob.createdBlob)
          } else {
            this.setState({ showResponseError: true, errorMessage: this.props.blob.createdBlobError, loading: false })
          }
        })
      })
    } else {
      this.onModalClose()
    }
  }

  onSnackbarClose = () => {
    this.setState({ showResponseError: false }, () => {
      this.setState({ errorMessage: '' })
    })
  }

  render = () => {
    const { isOpen, uploadedFile, classes } = this.props
    const { loading, showResponseError, errorMessage } = this.state

    return (
      <Dialog open={isOpen} onClose={this.onModalClose} maxWidth='md' fullWidth>
        <ErrorSnackbar isOpen={showResponseError} message={errorMessage} onSnackbarClose={this.onSnackbarClose} />
        <DialogTitle>
          <Typography variant="h5">Change profile picture</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="row" alignItems="center" justify="center" spacing={3} className="m-b-15">
            <Grid item xs={6}>
              <AvatarLogoUploader
                isLoading={this.isLoadingNow}
                onSuccess={this.onLoadingSuccess}
                uploadedFile={uploadedFile}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button className={classes.button} disabled={loading} variant="contained" color="primary" onClick={this.onSaveClick}>Save</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => {
  return { blob: state.blobs }
}

export default connect(mapStateToProps, { createBlob })(withRouter(withStyles(styles)(AddAvatarModal)))
