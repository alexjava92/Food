import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addMenuItem, updateMenuItem} from '../redux/actions';
import {AppState} from '../redux/reducers';
import {Button, Input, Paper, TextField} from "@mui/material";

interface MenuItem {
    id: number;
    name: string;
    price: number;
}

export function MenuEditor() {

    const menuItems = useSelector<AppState, MenuItem[]>(
        (state) => state.menuItems
    );



    const [addingItem, setAddingItem] = useState(false);


    const handleAddClick = () => {
        setAddingItem(true);
    }


    return (
        <div>
            {menuItems.map(item => (
                <MenuItem
                    key={item.id}
                    item={item}
                />
            ))}

            {addingItem ? (
                <AddForm

                    onCancel={() => setAddingItem(false)}
                />
            ) : (
                <button onClick={handleAddClick}>
                    Add Item
                </button>
            )}
        </div>
    );

}

function MenuItem({item}: { item: MenuItem }) {

    const [editing, setEditing] = useState(false);

    if (editing) {
        return <EditForm
            item={item}
            onCancel={() => setEditing(false)}
        />
    }

    return (
        <Paper
            component="div"
            onDoubleClick={() => setEditing(true)}
            sx={{
                p: 2,
                m: 2,
                cursor: 'pointer'
            }}
        >
            {item.name} - {item.price}
        </Paper>
    );

}

function EditForm({item, onCancel}: {
    item: MenuItem,
    onCancel: () => void
}) {

    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);

    const dispatch = useDispatch();

    const handleUpdate = useCallback(() => {
        dispatch(updateMenuItem({...item, name, price}));
        onCancel();
    }, [name, price]);


    return (
        <div>
            <TextField
                size="small"
                variant="standard"
                label="Название"
                sx={{
                    p: 2,
                    m: 2,
                    width: '30%'
                }}
                value={name}
                onChange={e => setName(e.target.value)}
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

            <Button onClick={handleUpdate}>
                Update
            </Button>

            <Button onClick={onCancel}>
                Cancel
            </Button>
        </div>
    );

}

function AddForm({onCancel }: { onCancel: () => void }) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const dispatch = useDispatch();

    const handleAddSubmit = useCallback(() => {
        dispatch(addMenuItem(name, price));
        setName('');
        setPrice(0);
        onCancel()
    }, [name, price]);

    return (
        <div>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <input
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
            />

            <button type="button" onClick={onCancel}>
                Cancel
            </button>

            <button
                type="submit"
                onClick={() => {
                    handleAddSubmit();
                }}
            >
                Add
            </button>
        </div>
    )

}
