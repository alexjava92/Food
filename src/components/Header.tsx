import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {Link} from "react-router-dom";
import React from "react";

export const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <Menu />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    Пивко
                </Typography>
                {/* Menu Links */}
                <Link to="/menu" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Меню для кассира</Link>
                <Link to="/kitchen" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Кухня</Link>
                <Link to="/menu-editor" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Редактор меню</Link>
            </Toolbar>
        </AppBar>
    );
};