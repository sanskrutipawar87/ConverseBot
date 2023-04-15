import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { MyAppBar } from "../Components/Dashboard/Dashboard";
import { Facebook, Twitter, LinkedIn, GitHub } from "@mui/icons-material";

const AboutMe = () => {
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
            {/* Profile Info */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Avatar
                  alt="Sanskruti Pawar"
                  src="/profile.jpg"
                  sx={{ width: "150px", height: "150px", margin: "auto" }}
                />
                <Typography variant="h5" sx={{ mt: 2 }}>
                  Sanskruti Pawar
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  I am an IT engineer currently studying in Diploma in
                  Information Technology.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <IconButton
                    aria-label="Facebook"
                    href="https://www.facebook.com/"
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    aria-label="Twitter"
                    href="https://twitter.com/"
                  >
                    <Twitter />
                  </IconButton>
                  <IconButton
                    aria-label="LinkedIn"
                    href="https://www.linkedin.com/"
                  >
                    <LinkedIn />
                  </IconButton>
                  <IconButton
                    aria-label="GitHub"
                    href="https://github.com/"
                  >
                    <GitHub />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
            {/* Skills */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography variant="h5">Skills</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  - HTML, CSS, JavaScript <br />
                  - ReactJS, NodeJS, ExpressJS <br />
                  - MySQL, MongoDB, Firebase <br />
                  - Git, GitHub <br />
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AboutMe;
