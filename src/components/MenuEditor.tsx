import React, {useCallback, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addMenuItem, updateMenuItem} from "../redux/actions";
import {AppState} from "../redux/reducers";
import {MenuItem} from "./Menu";


export function MenuEditor() {
    const menuItems = useSelector((state: AppState) => state.menuItems);

    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);

    const dispatch = useDispatch();

    const handleEditClick = useCallback((item: MenuItem) => {
        setSelectedItem({
            ...item,
            name,
            price
        });
    }, [name, price]);

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }, []);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(e.target.value));
    }

    const handleUpdateClick = () => {
        const updatedItem = {
            id: selectedItem!.id,
            name,
            price: Number(price)
        }
        dispatch(updateMenuItem(updatedItem));
        setName("")
        setPrice(0)
    }

    const handleAddClick = () => {
        dispatch(addMenuItem(name, price));
        setName("")
        setPrice(0)
    }

    return (
        <div>
            {
                menuItems.map(item => (
                    <div key={item.id}>
      <span>
        {item.name} - {item.price}
      </span>

                        <button onClick={() => handleEditClick(item)}>
                            Edit
                        </button>
                    </div>
                ))
            }

            {selectedItem && (
                <div>
                    <input
                        value={name}
                        onChange={handleNameChange}

                    />

                    <input
                        value={price}
                        onChange={handlePriceChange}

                    />

                    <button onClick={handleUpdateClick}>
                        Update
                    </button>
                </div>
            )}

            <button onClick={handleAddClick}>
                Add Item
            </button>
        </div>
    )
}

