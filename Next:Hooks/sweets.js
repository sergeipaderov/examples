import React, { useState, useEffect } from 'react'
import { MainLayout } from '../components/MainLayout'
import Card from '../components/Card'
import { Grid } from '@material-ui/core'
import fire from '../utils/firebase'
import { makeStyles } from '@material-ui/core/styles'

export default function Sweets(props) {
  const classes = useStyles()

  if (!props.items) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Doces">
      <Grid
        container
        alignItems="center"
        justify="space-around"
        className={classes.container}
      >
        {props.items.map((item, index) => (
          <Card
            id={item.id}
            key={item.id}
            xs={4}
            img={item.photo}
            title={item.title}
            desc={item.desc}
          />
        ))}
      </Grid>
    </MainLayout>
  )
}

const useStyles = makeStyles({
  container: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
})

export const getServerSideProps = async () => {
  const content = {}
  await fire
    .firestore()
    .collection('sweets')
    .get()
    .then((result) => {
      content['items'] = result.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    })
  return {
    props: {
      items: content.items,
    },
  }
}
