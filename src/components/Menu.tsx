import React from 'react';
import {Grid, IconButton, Paper, styled, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export type MenuItem = {
    id: number;
    name: string;
    price: number;
    description?: string;
    amount?: string;

};

export type MenuProps = {
    items: MenuItem[];
    onItemSelect: (item: MenuItem) => void;
};

const Menu: React.FC<MenuProps> = ({items, onItemSelect}) => (
    <Grid container spacing={2}>
        {items.map(item => (
            <Grid item xs={6} key={item.id}>
                <CustomPaper elevation={4} onClick={() => onItemSelect(item)}>
                    <Typography sx={{p: 1}} variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                    <Typography sx={{p: 1}} variant="body2" color="textSecondary">Кол: {item.amount}</Typography>
                    <Typography sx={{p: 1}} variant="h6" color="primary">{item.price} руб.</Typography>
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

  .menu-text {
    white-space: nowrap; // Предотвращаем перенос текста
    text-overflow: ellipsis; // Добавляем многоточие при обрезке текста
  }
`;


export default Menu;
