import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import Link from 'next/link'
import fire from '../../utils/firebase'
import { MainLayout } from '../../components/MainLayout'
import { makeStyles } from '@material-ui/core/styles'
import Contacts from '../../components/Contacts'

const Item = ({ title, desc, photo, autor, city, fb, insta, email }) => {
  const classes = useStyles()

  if (!title && !desc && !photo) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="title">
      <Grid container alignItems="center" justify="space-around">
        <Grid item lg={12} className={classes.itemCard}>
          <Card className={classes.root}>
            <Grid container className={classes.infoContainer}>
              <Grid item xs={12} md={8}>
                <CardMedia
                  className={classes.media}
                  image={photo}
                  title={title}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="secondary"
                    variant="h4"
                    component="h2"
                    noWrap
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    align="justify"
                    className={classes.desc}
                  >
                    {desc}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
            <CardContent className={classes.contactsContainer}>
              <Grid item xs={12} md={8}>
                <Contacts
                  autor={autor}
                  city={city}
                  fb={fb}
                  insta={insta}
                  email={email}
                />
              </Grid>
            </CardContent>
            <CardActions className={classes.actionsContainer}>
              <Link href={`/sweets`}>
                <Button size="small" color="primary">
                  Back
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default Item

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    border: '1px solid #f7f2f2',
    height: '100%',
  },
  infoContainer: {
    display: 'flex',
  },
  itemCard: {
    zIndex: 100,
    width: '100%',
  },
  media: {
    width: '100%',
    height: 'auto',
    minHeight: 460,
    borderRadius: 5,
  },
  title: {
    marginBottom: 26,
  },
  desc: {
    overflow: 'hidden',
  },
  contactsContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingRight: 0,
    paddingLeft: 0,
  },
  actionsContainer: {
    justifyContent: 'flex-end',
  },
})

export const getServerSideProps = async ({ query }) => {
  const content = {}
  await fire
    .firestore()
    .collection('sweets')
    .doc(query.id)
    .get()
    .then((result) => {
      content['title'] = result.data().title
      content['desc'] = result.data().desc
      content['photo'] = result.data().photo
      content['autor'] = result.data().autor
      content['city'] = result.data().city
      content['email'] = result.data().email
      content['fb'] = result.data().fb
      content['insta'] = result.data().insta
    })
  return {
    props: {
      title: content.title,
      desc: content.desc,
      photo: content.photo,
      autor: content.autor,
      city: content.city,
      email: content.email,
      fb: content.fb,
      insta: content.insta,
    },
  }
}
