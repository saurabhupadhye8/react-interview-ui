import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import './App.css'

const WidgetList = lazy(() => import('./components/WidgetList'))
const WidgetForm = lazy(() => import('./components/WidgetForm'))

const App = (): JSX.Element => (
  <Stack>
    <Router>
      <Suspense
        fallback={
          <Stack spacing={4} sx={{ margin: 'auto', maxWidth: 900, paddingTop: '4em', width: '100%' }}>
            <Typography sx={{ textAlign: 'center' }} variant="h3">
              Loading...
            </Typography>
          </Stack>
        }
      >
        <Routes>
          <Route path='/' element={<WidgetList />} />
          <Route path='/widget' element={<WidgetForm />} />
          <Route path='/widget/:widgetName' element={<WidgetForm />} />
        </Routes>
      </Suspense>
    </Router>
  </Stack>
)

export default App
