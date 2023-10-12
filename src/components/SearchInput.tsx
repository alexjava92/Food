import React from 'react';
import { MenuItem, MenuProps } from './Menu';
import {TextField} from "@mui/material";

type SearchInputProps = {
    items: MenuProps['items'];
    onItemSelect: (item: MenuItem) => void;
    onSearch: (query: string) => void; // Добавляем новую функцию для поиска
};

export const SearchInput: React.FC<SearchInputProps> = ({ items, onItemSelect, onSearch }) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        onSearch(query); // Вызываем функцию для поиска из родительского компонента
    };

    return (
        <div>
            <TextField
                size="medium"
                variant="outlined"
                label="Поиск..."
                sx={{
                    p: 2,
                    m: 2,
                    width: '80%'
                }}
                type="text"
                onChange={handleSearch}
            />
            {/* В этом компоненте не нужно отображать отфильтрованные элементы */}
        </div>
    );
};
