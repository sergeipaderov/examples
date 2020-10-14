import React, { useState } from 'react'
// import { useRouter } from 'next/router'
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Button,
  Select,
  MenuItem,
  Fab,
  makeStyles,
  Modal,
  Backdrop,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import UploadIcon from '../public/icons/upload.svg'
import fire from '../utils/firebase'

export const EditModal = ({
  itemCategory,
  itemTitle,
  itemAutor,
  itemCity,
  itemEmail,
  itemPhone,
  itemInsta,
  itemFb,
  itemDesc,
  itemPhoto,
  itemId,
  isOpen,
  handleClose,
}) => {
  // const router = useRouter()
  const classes = useStyles()
  const [open, setOpen] = useState(isOpen)
  const [category, setCategory] = useState(itemCategory)
  const [title, setTitle] = useState(itemTitle)
  const [autor, setAutor] = useState(itemAutor)
  const [city, setCity] = useState(itemCity)
  const [email, setEmail] = useState(itemEmail)
  const [phone, setPhone] = useState(itemPhone)
  const [insta, setInsta] = useState(itemInsta)
  const [fb, setFb] = useState(itemFb)
  const [desc, setDesc] = useState(itemDesc)
  const [photo, setPhoto] = useState(itemPhoto)

  const [categoryError, setCategoryError] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [autorError, setAutorError] = useState(false)
  const [cityError, setCityError] = useState(false)
  const [photoError, setPhotoError] = useState(false)
  const [descError, setDescError] = useState(false)

  let sendingObject = {}

  const onHandleSubmit = () => {
    if (category && title && autor && city) {
      sendingObject = {
        autor,
        city,
        desc,
        email,
        fb,
        insta,
        phone,
        photo,
        title,
        category,
      }
    }

    !category ? setCategoryError(true) : setCategoryError(false)
    !title ? setTitleError(true) : setTitleError(false)
    !autor ? setAutorError(true) : setAutorError(false)
    !city ? setCityError(true) : setCityError(false)
    !desc ? setDescError(true) : setDescError(false)

    if (category && title && autor && city && desc) {
      fire
        .firestore()
        .collection(`${sendingObject.category}`)
        .doc(`${itemId}`)
        .set({
          ...sendingObject,
        })

      handleClose()
    }
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.boxWrapper}>
        <Box className={classes.box}>
          <Typography className={classes.formTitle}>Edit Card</Typography>
          <FormControl fullWidth>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={'decor'}>Decor</MenuItem>
              <MenuItem value={'sweets'}>Doces</MenuItem>
              <MenuItem value={'flowers'}>Flores</MenuItem>
              <MenuItem value={'photo'}>Photo</MenuItem>
              <MenuItem value={'souvenirs'}>Lembrancinhas</MenuItem>
              <MenuItem value={'animators'}>Animadores</MenuItem>
              <MenuItem value={'other'}>Outros</MenuItem>
            </Select>
            {!!categoryError && (
              <FormHelperText error>Campo obrigatório</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="Title">Title</InputLabel>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {!!titleError && (
              <FormHelperText error>Campo obrigatório</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="Autor">Autor</InputLabel>
            <Input
              id="autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
            {!!autorError && (
              <FormHelperText error>Campo obrigatório</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="City">City</InputLabel>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {!!cityError && (
              <FormHelperText error>Campo obrigatório</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="phone">Phone / WhatsApp</InputLabel>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="insta">Instagram</InputLabel>
            <Input
              id="insta"
              multiline={true}
              value={insta}
              onChange={(e) => setInsta(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="facebook">Facebook</InputLabel>
            <Input
              id="facebook"
              multiline={true}
              value={fb}
              onChange={(e) => setFb(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="desc">Description</InputLabel>
            <Input
              id="desc"
              multiline={true}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            {!!descError && (
              <FormHelperText error>Campo obrigatório</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="photo">Photo Link</InputLabel>
            <Input
              id="photo"
              multiline={true}
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth style={{ paddingTop: 20 }}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: 'none' }}
                id="upload-photo"
                type="file"
                multiple
              />

              <Fab
                color="secondary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
              >
                <UploadIcon className={classes.icon} /> Add Photo
              </Fab>
            </label>
            {!!photoError && (
              <FormHelperText error>Imagem obrigatório</FormHelperText>
            )}
          </FormControl>
          <Box pl={1} pr={1} pt={4} pb={15} className={classes.buttonContainer}>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onHandleSubmit}
            >
              Done
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  )
}

const useStyles = makeStyles({
  boxWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    zIndex: 1000,
  },
  box: {
    border: '1px solid #507B6D',
    borderRadius: 10,
    padding: 40,
    width: 96,
    marginBottom: 30,
    backgroundColor: '#ffffff',
    width: '80%',
    marginTop: '3%',
    zIndex: 1000,
  },
  formTitle: {
    fontSize: '28px !important',
    color: '#507B6D',
  },
  icon: {
    cursor: 'pointer',
    width: 24,
    height: 24,
    marginTop: 0,
    marginLeft: 10,
    marginBottom: 0,
    marginRight: 10,
    fill: '#fff !important',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 !important',
    marginTop: 50,
  },
})
