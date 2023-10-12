import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addMenuItem, deleteMenuItemAC, updateMenuItem} from '../redux/actions';
import {AppState} from '../redux/reducers';
import {Button, Input, Paper, TextField, Typography} from "@mui/material";
import {MenuItem as MenuEditorType} from './Menu';


export function MenuEditor() {

    const menuItems = useSelector<AppState, MenuEditorType[]>(
        (state) => state.menuItems
    );

    const [addingItem, setAddingItem] = useState(false);

    const handleAddClick = () => {
        setAddingItem(true);
    }

    return (
        <div>
            {addingItem ? (
                <AddForm

                    onCancel={() => setAddingItem(false)}
                />
            ) : (
                <Button onClick={handleAddClick}
                        variant="contained"
                        size="large"
                        sx={{m: 3,}}>
                    Добавить новую позицию в меню
                </Button>
            )}

            {menuItems.map(item => (
                <MenuItem
                    key={item.id}
                    item={item}
                />
            ))}


        </div>
    );

}

function MenuItem({item}: { item: MenuEditorType }) {

    const [editing, setEditing] = useState(false);

    const dispatch = useDispatch();

    const handleDeleteMenuItem = useCallback(() => {
        dispatch(deleteMenuItemAC(item.id));

    }, []);

    if (editing) {
        return <EditForm
            item={item}
            onCancel={() => setEditing(false)}
        />
    }

    return (
        <Paper component="div" sx={{p: 2, m: 2}}>
            <Typography>
                <strong>ID:</strong> {item.id}<br />
                <strong>Название:</strong> {item.name}<br />
                <strong>Цена:</strong> {item.price}<br />
                <strong>Описание:</strong> {item.description}<br />
                <strong>Количество:</strong> {item.amount}
            </Typography>
            <Button
                onClick={() => setEditing(true)}
                variant="outlined"
                size="small"
                sx={{m: 1}}
            >
                Изменить
            </Button>
            <Button
                onClick={handleDeleteMenuItem}
                variant="outlined"
                color="warning"
                size="small"
                sx={{m: 1}}
            >
                Удалить
            </Button>
        </Paper>

    );

}

function EditForm({item, onCancel}: {
    item: MenuEditorType,
    onCancel: () => void
}) {

    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [description, setDescription] = useState(item.description);
    const [amount, setAmount] = useState(item.amount);

    const dispatch = useDispatch();

    const handleUpdate = useCallback(() => {
        dispatch(updateMenuItem({...item, name, price, description, amount}));
        onCancel();
    }, [name, price, description, amount]);


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
                size="small"
                variant="standard"
                label="Название"
                sx={{
                    p: 2,
                    m: 2,
                    width: { xs: '90%', md: '30%' }
                }}
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <TextField
                id="standard-multiline-flexible"
                multiline
                maxRows={4}
                size="small"
                variant="standard"
                label="Ингредиенты"
                sx={{
                    p: 2,
                    m: 2,
                    width: { xs: '90%', md: '30%' }
                }}
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />

            <TextField
                size="small"
                variant="standard"
                label="Количество: гр. или шт."
                sx={{
                    p: 2,
                    m: 2,
                    width: { xs: '90%', md: '30%' }
                }}
                type="text"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />

            <TextField
                size="small"
                variant="standard"
                label="Цена"
                sx={{
                    p: 2,
                    m: 2,
                    width: { xs: '90%', md: '30%' }
                }}
                type="number"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
            />

            <Button
                onClick={handleUpdate}
                variant="outlined"
                size="small"
                sx={{
                    p: 2,
                    m: 2,
                    width: { xs: '90%', md: '15%' }
                }}>
                Обновить
            </Button>

            <Button
                onClick={onCancel}
                variant="outlined"
                size="small"
                sx={{
                    p: 2,
                    m: 2,
                    width: { xs: '90%', md: '15%' }
                }}>
                Отмена
            </Button>
        </div>
    );

}

function AddForm({onCancel}: { onCancel: () => void }) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const dispatch = useDispatch();

    const handleAddSubmit = useCallback(() => {
        dispatch(addMenuItem(name, price, description, amount));
        onCancel()
    }, [name, price, description, amount]);

    return (
        <div>
            <TextField size="small"
                       variant="standard"
                       label="Название"
                       sx={{
                           p: 2,
                           m: 2,
                           width: '30%'
                       }}
                       type="text"
                       value={name}
                       onChange={e => setName(e.target.value)}
            />
            <TextField
                id="standard-multiline-flexible"
                multiline
                maxRows={4}
                size="small"
                variant="standard"
                label="Ингредиенты"
                sx={{
                    p: 2,
                    m: 2,
                    width: '30%'
                }}
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <TextField size="small"
                       variant="standard"
                       label="Количество: гр. или шт."
                       sx={{
                           p: 2,
                           m: 2,
                           width: '30%'
                       }}
                       type="text"
                       value={amount}
                       onChange={e => setAmount(e.target.value)}
            />

            <TextField
                size="small"
                variant="standard"
                label="Цена"
                sx={{
                    p: 2,
                    m: 2,
                    width: '30%'
                }}
                type="number"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
            />
            <Button
                variant="outlined"
                size="small"
                sx={{
                    p: 2,
                    m: 2,
                    width: '10%'
                }}
                type="submit"
                onClick={() => {
                    handleAddSubmit();
                }}
            >
                Добавить
            </Button>
            <Button
                variant="outlined"
                size="small"
                sx={{
                    p: 2,
                    m: 2,
                    width: '10%'
                }}
                type="button"
                color="warning"
                onClick={onCancel}>
                Отмена
            </Button>

        </div>
    )

}
