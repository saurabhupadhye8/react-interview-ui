import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { Box, TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { createWidget, fetchWidget, updateWidget, Widget } from '../../lib/apiConnect'

const WidgetForm = () => {
    const navigate = useNavigate()
    const { widgetName } = useParams()
    const [widget, setWidget] = useState<Widget>({
        name: '',
        price: 1,
        description: ''
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [widgetError, setWidgetError] = useState({
        name: false,
        price: false,
        description: false
    })

    useEffect(() => {
        if (widgetName) {
            fetchWidget(widgetName)
                .then(setWidget)
                .catch((error) => console.error('Error fetching widget', error))
        }
    }, [widgetName]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, validity: { valid } } = e.target
        const isDataValid = !valid || (name === 'price' && !validateDecimal(value))

        setWidgetError({ ...widgetError, [name]: isDataValid });
        setWidget({ ...widget, [name]: value })
        setErrorMessage("")
    }

    const validateDecimal = (value: string) => {
        const splitValue = value.split(".")

        if (splitValue.length > 1) {
            const decimalPart = splitValue[1]
            return decimalPart.length < 3
        }

        return true
    }

    const submitWidget = (event: any) => {
        event.preventDefault()

        if (event.target.checkValidity()) {
            if (widgetName) {
                updateWidget(widget)
                    .then(__ => navigate("/"))
                    .catch((error) => console.error('Error updating widgets', error))
            } else {
                createWidget(widget)
                    .then(__ => navigate("/"))
                    .catch((error) => {
                        console.error('Error creating widgets', error)

                        const { response: { data } } = error
                        const message = data[0] ? data[0] : data.message

                        if (message) {
                            setErrorMessage(message)
                        }
                    })
            }
        }
    }

    return (
        <Stack spacing={4} sx={{ margin: 'auto', maxWidth: 600, paddingTop: '4em', width: '100%' }}>
            <Typography sx={{ textAlign: 'center' }} variant="h3">
                {widgetName ? "Update Widget" : "Create New Widget"}
            </Typography>
            <Grid item xs={6}>
                <Card>
                    <CardContent>
                        <Box component="form" onSubmit={submitWidget} noValidate>
                            <Stack spacing={2}>
                                <Typography sx={{ textAlign: 'center' }} color="red">
                                    {errorMessage}
                                </Typography>
                                <TextField
                                    label="Name"
                                    variant="filled"
                                    name="name"
                                    value={widget.name}
                                    type="text"
                                    multiline
                                    onChange={handleChange}
                                    disabled={!!widgetName}
                                    required
                                    error={widgetError.name}
                                    helperText={widgetError.name ? "Name must be between 3 and 100 characters" : ""}
                                    inputProps={{
                                        minLength: 3,
                                        maxLength: 100
                                    }}
                                />
                                <TextField
                                    label="Price"
                                    variant="filled"
                                    name="price"
                                    value={widget.price}
                                    type="number"
                                    onChange={handleChange}
                                    required
                                    error={widgetError.price}
                                    helperText={widgetError.price ? "Price must be between 1 and 20000 characters and upto 2 precision decimal" : ""}
                                    inputProps={{
                                        min: 1,
                                        max: 20000,
                                        step: 0.01,
                                    }}
                                />
                                <TextField
                                    label="Description"
                                    variant="filled"
                                    name="description"
                                    value={widget.description}
                                    type="text"
                                    multiline
                                    onChange={handleChange}
                                    required
                                    error={widgetError.description}
                                    helperText={widgetError.description ? "Description must be between 5 and 1000 characters" : ""}
                                    inputProps={{
                                        minLength: 5,
                                        maxLength: 1000
                                    }}
                                />
                                <Grid container justifyContent="center" spacing={2}>
                                    <Grid item xs={3}>
                                        <Button variant="contained" color="primary" type="submit">
                                            {widgetName ? "Update" : "Create"}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button variant="contained" color="error" onClick={() => navigate("/")}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Stack>
    )
}

export default WidgetForm
