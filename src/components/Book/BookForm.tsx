import { Input } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';

import BookStore, { BookStoreCtx } from '../../stores/BookStore';

const { Search } = Input;

interface IBookFormProps {
  onSearch?: () => void;
}

const BookForm: React.FC<IBookFormProps> = ({ onSearch = () => {} }) => {
  const store = useContext<BookStore>(BookStoreCtx);
  const [inauthor, setInauthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [inpublisher, setInpublisher] = useState('');

  const onSearchBook = async (title: string): Promise<void> => {
    store.resetParams();
    await store.onLoadBook({
      title,
      ...(inauthor && { inauthor }),
      ...(isbn && { isbn }),
      ...(inpublisher && { inpublisher })
    });
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
          onChange={e => setInauthor(e.target.value)}
        />
      </div>
      <div>
        <Input
          placeholder="Publisher"
          onChange={e => setInpublisher(e.target.value)}
        />
      </div>
      <div>
        <Input placeholder="ISBN" onChange={e => setIsbn(e.target.value)} />
      </div>
    </div>
  );
};

export default observer(BookForm);
