import React from "react";
import { Box, Container, Grid, Toolbar } from "@mui/material";
import { MyAppBar } from "../Components/Dashboard/Dashboard";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Typography from '@mui/material/Typography';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const ContactMe = () => {

    const [submitting, setSubmitting] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        subject: Yup.string().required('Subject is required'),
        message: Yup.string().required('Message is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setSubmitting(true);
            console.log(values);
            // Do your submission logic here
            setSubmitting(false);
        },
    });

    return (
        <>
            <MyAppBar />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        {/* Home Page */}
                        <Grid item xs={12}>
                            <Container component="main" maxWidth="xs">
                                <Box
                                    sx={{
                                        marginTop: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography component="h1" variant="h5">
                                        Contact Me
                                    </Typography>
                                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Full Name"
                                            name="name"
                                            autoComplete="name"
                                            autoFocus
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="email"
                                            label="Email Address"
                                            type="text"
                                            id="email"
                                            autoComplete="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="subject"
                                            label="Subject"
                                            type="text"
                                            id="subject"
                                            autoComplete="subject"
                                            value={formik.values.subject}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.subject && Boolean(formik.errors.subject)}
                                            helperText={formik.touched.subject && formik.errors.subject}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="message"
                                            label="Message"
                                            multiline
                                            rows={4}
                                            id="message"
                                            autoComplete="message"
                                            value={formik.values.message}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.message && Boolean(formik.errors.message)}
                                            helperText={formik.touched.message && formik.errors.message}
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={submitting}
                                        >
                                            {submitting ? 'Submitting...' : 'Submit'}
                                        </Button>
                                    </Box>
                                </Box>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default ContactMe;
