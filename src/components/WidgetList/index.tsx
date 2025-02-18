import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import WidgetDisplay from '../WidgetDisplay'
import { deleteWidget, fetchAllWidgets, Widget } from '../../lib/apiConnect'

const WidgetList = (): JSX.Element => {
  const [widgets, setWidgets] = useState<Widget[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllWidgets()
      .then(setWidgets)
      .catch((error) => console.error('Error fetching widgets', error))
  }, [])

  const handleDelete = (widgetName: string) => {
      deleteWidget(widgetName)
          .then(setWidgets)
          .catch((error) => console.error('Error deleting widget', error))
  }

  return (
    <Stack spacing={4} sx={{ margin: 'auto', maxWidth: 900, paddingTop: '4em', width: '100%' }}>
      <Typography sx={{ textAlign: 'center' }} variant="h3">
        List of widgets:
      </Typography>
      <Grid container justifyContent="center">
        <Button variant="outlined" onClick={() => navigate("/widget")}>Create New Widget</Button>
      </Grid>
      <Grid container justifyContent="center" spacing={4} sx={{ paddingRight: 4, width: '100%' }}>
        {widgets.map(current =>
            <WidgetDisplay key={current.name} widget={current} handleDelete={handleDelete} />
        )}
      </Grid>
    </Stack>
  )
}

export default WidgetList
