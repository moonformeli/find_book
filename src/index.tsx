import 'antd/dist/antd.css';

import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import BookForm from './components/Book/BookForm';
import BookList from './components/Book/BookList';
import styles from './index.scss';
import { IBook } from './models/Book/interfaces/IBook';
import BookStore, { BookStoreCtx } from './stores/BookStore';

const App: React.FC = observer(() => {
  const store = useRef(new BookStore()).current;
  const [displayItems, setDisplayItems] = useState<IBook>(store.Book);

  return (
    <BookStoreCtx.Provider value={store}>
      <section>
        <h1 className={styles.title}>Hello Wepack!</h1>
        <BookForm
          onSearch={() => {
            setDisplayItems(store.Book);
          }}
        />
        <article>
          <BookList books={displayItems.items} />
        </article>
      </section>
    </BookStoreCtx.Provider>
  );
});

ReactDOM.render(<App />, document.getElementById('root'));
