import React from 'react';
import {Grid, IconButton, Paper, styled} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export type MenuItem = {
    id: number;
    name: string;
    price: number;
};

export type MenuProps = {
    items: MenuItem[];
    onItemSelect: (item: MenuItem) => void;
};

const Menu: React.FC<MenuProps> = ({items, onItemSelect}) => (
    <Grid container spacing={2}>
        {items.map(item => (
            <Grid item xs={6} key={item.id}>
                <CustomPaper elevation={4} style={{
                    padding: '10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s', // Добавляем анимацию
                }}
                       onClick={() => onItemSelect(item)}>
                    <div>
                        {item.name} - {item.price} руб.
                    </div>
                    <IconButton color="primary" aria-label="Add to shopping cart" onClick={() => onItemSelect(item)}>
                        <AddIcon/>
                    </IconButton>
                </CustomPaper>
            </Grid>
        ))}
    </Grid>
);

const CustomPaper = styled(Paper)`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s; // Анимация для transform и box-shadow
  &:hover {
    transform: scale(1.05); // Увеличение при наведении
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); // Тень при наведении
  }
  &:active {
    transform: scale(0.95); // Уменьшение при нажатии
  }
`;


export default Menu;
