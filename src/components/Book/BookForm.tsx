import { Input } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import BookStore, { BookStoreCtx } from '../../stores/BookStore';

const { Search } = Input;

interface IBookFormProps {
  onSearch?: () => void;
}

const BookForm: React.FC<IBookFormProps> = ({ onSearch = () => {} }) => {
  const store = useContext<BookStore>(BookStoreCtx);

  const onSearchBook = async (title: string): Promise<void> => {
    store.resetParams();
    store.Title = title;
    await store.onLoadBook();
    onSearch?.();
  };

  return (
    <div>
      검색어:{' '}
      <Search
        placeholder="input search text"
        onSearch={onSearchBook}
        enterButton
      />
      <div>
        <Input
          placeholder="Author"
          onChange={e => (store.Author = e.target.value)}
        />
      </div>
      <div>
        <Input
          placeholder="Publisher"
          onChange={e => (store.Publisher = e.target.value)}
        />
      </div>
      <div>
        <Input
          placeholder="ISBN"
          onChange={e => (store.ISBN = e.target.value)}
        />
      </div>
    </div>
  );
};

export default observer(BookForm);
