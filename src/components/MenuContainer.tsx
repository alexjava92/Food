import React, { useState } from 'react';
import Menu, { MenuItem, MenuProps } from './Menu';
import {SearchInput} from "./SearchInput";
import {addItem} from "../redux/actions";
import {useDispatch} from "react-redux";

type MenuContainerProps = {
    items: MenuItem[];
};

export const MenuContainer: React.FC<MenuContainerProps> = ({ items }) => {
    const [filteredMenuItems, setFilteredMenuItems] = useState(items);
    const dispatch = useDispatch();
    const handleItemSelect = (item: MenuItem) => {

            dispatch(addItem(item));

    };

    const handleSearch = (query: string) => {
        const filteredItems = items.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredMenuItems(filteredItems);
    };

    return (
        <div>
            <SearchInput items={items} onItemSelect={handleItemSelect} onSearch={handleSearch} />
            <Menu items={filteredMenuItems} onItemSelect={handleItemSelect} />
        </div>
    );
};


