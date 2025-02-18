import React from 'react'
import { useNavigate } from 'react-router'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { Widget } from '../../lib/apiConnect'

export interface DisplayWidgetProps {
  widget: Widget
  handleDelete: (name: string) => void
}

const DisplayWidget = ({ widget, handleDelete }: DisplayWidgetProps): JSX.Element => {
  const { description, name, price } = widget
  const navigate = useNavigate()

  return (
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography component="div" gutterBottom variant="h4">
              {name}
            </Typography>
            <Typography component="div" gutterBottom variant="h5">
              ${price}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {description}
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={5}>
                <Button variant="outlined" color="success" onClick={() => navigate(`/widget/${name}`)}>Edit</Button>
              </Grid>
              <Grid item xs={5}>
                <Button variant="outlined" color="error" onClick={() => handleDelete(name)}>Delete</Button>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
  </Grid>)
}

export default DisplayWidget
