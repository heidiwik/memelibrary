//import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";

import { Link } from "react-router-dom";

const pages = ["Frontpage", "Memes"];

function ResponsiveAppBar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ bgcolor: "grey", color: "#FFE8E8" }}
    >
      <Container sx={{ maxWidth: "100%" }} maxWidth={false}>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "#FFB6C1",
                textDecoration: "none",
                fontSize: "2.9rem",
                fontFamily: '"Dancing Script", cursive',
              }}
            >
              MemeHub
            </Typography>
          </div>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              marginLeft: "20px",
            }}
          >
            {pages.map((page) => {
              return (
                <Link
                  to={`/${page}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  key={page}
                >
                  <Button
                    sx={{
                      my: 2,
                      color: "black",
                      display: "flex",
                      backgroundColor: "#FFB6C1",
                      marginRight: "10px",
                      fontSize: "12px",
                      textTransform: "none",
                      // shadow
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                      fontFamily: '"Lato", cursive',
                      "&.Mui-disabled": {
                        color: "white",
                      },
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              );
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Link
              to="/Settings"
              style={{ textDecoration: "none", color: "inherit" }}
            ></Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
