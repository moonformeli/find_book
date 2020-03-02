import { Input } from 'antd';
import React from 'react';

const { Search } = Input;

interface IBookFormProps {
  onSearch?: (value: string) => void;
}

const BookForm: React.FC<IBookFormProps> = ({ onSearch = () => {} }) => {
  return (
    <Search placeholder="input search text" onSearch={onSearch} enterButton />
  );
};

export default BookForm;
