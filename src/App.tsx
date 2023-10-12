import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';
import MenuPage from "./components/MenuPage";
import KitchenPage from "./components/KitchenPage";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {Header} from "./components/Header";
import {MenuEditor} from "./components/MenuEditor";
import {useSelector} from "react-redux";
import {AppState} from "./redux/reducers";



const App: React.FC = () => {


    return(

        <Grid>
            <Router>
                {/* Header - верхняя панель */}
                <Header/>

                {/* Routes - содержимое страницы */}
                <Routes>

                    <Route
                        path="/"
                        element={<Navigate to={"/menu"} replace />}
                    />

                    <Route path="/menu" element={<MenuPage/>}/>
                    <Route path="/kitchen" element={<KitchenPage/>}/>
                    <Route path="/menu-editor" element={<MenuEditor/>}/>
                </Routes>
            </Router>
        </Grid>
    );
}


export default App;
