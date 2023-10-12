import React from 'react';
import {Divider, Grid, List, ListItem, Paper, styled, Typography} from '@mui/material';


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
        <Grid item xs={12}>
            <List component="nav" aria-label="menu items">
                {items.map((item, index) => (
                    <div key={item.id}>
                        <ListItem button onClick={() => onItemSelect(item)} sx={{ padding: '16px 32px' }}>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>{item.description}</Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ ml: 'auto' }}>Кол: {item.amount}</Typography>
                            <Typography variant="h6" color="primary" sx={{ ml: 2 }}>{item.price} руб.</Typography>
                        </ListItem>
                        {index !== items.length - 1 && <Divider />}  {/* Добавляем разделитель между элементами списка, кроме последнего */}
                    </div>
                ))}
            </List>
        </Grid>
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
