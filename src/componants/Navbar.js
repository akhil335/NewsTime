import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./navbar.css";

const styles = (theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
  },
  logo: {
    flexGrow: "1",
    display: "contents",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(0),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
    padding: "10px 1rem",
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
    this.setAnchorEl = this.setAnchorEl.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClick(event) {
    this.setAnchorEl(event.currentTarget);
  }
  setAnchorEl(value) {
    this.setState({
      anchorEl: value,
      open: !this.state.open,
    });
  }
  handleClose() {
    this.setAnchorEl(null);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <AppBar position="static">
          <CssBaseline />
          <Toolbar
            className="toolbar"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <nav className={classes.logo}>
              <Typography variant="h4">NewsTime</Typography>
            </nav>

            <Search style={{ width: "30%" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {/* <BrowserRouter> */}
            <div className={classes.navlinks}>
              <Link to="/" className={classes.link}>
                Home
              </Link>
              <Link
                to="#"
                className={classes.link}
                id="fade-button"
                aria-controls={this.open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={this.open ? "true" : undefined}
                onClick={this.handleClick}
              >
                Category
              </Link>

              <Menu
                id="fade-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={this.Fade}
              >
                <Link to="/business">
                  <MenuItem onClick={this.handleClose}>business</MenuItem>
                </Link>
                <Link to="/entertainment">
                  <MenuItem onClick={this.handleClose}>entertainment</MenuItem>
                </Link>
                <Link to="/health">
                  <MenuItem onClick={this.handleClose}>health</MenuItem>
                </Link>
                <Link to="/science">
                  <MenuItem onClick={this.handleClose}>science</MenuItem>
                </Link>
                <Link to="/sports">
                  <MenuItem onClick={this.handleClose}>sports</MenuItem>
                </Link>
                <Link to="/technology">
                  <MenuItem onClick={this.handleClose}>technology</MenuItem>
                </Link>
              </Menu>

              <Link to="/Contact" className={classes.link}>
                Contact
              </Link>
              <Link to="/About" className={classes.link}>
                About
              </Link>
            </div>
            {/* </BrowserRouter> */}
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default withStyles(styles)(Navbar);
