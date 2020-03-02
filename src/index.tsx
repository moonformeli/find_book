import 'antd/dist/antd.css';

import axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import BookForm from './components/Book/BookForm';
import BookList from './components/Book/BookList';
import styles from './index.scss';
import { IBook } from './models/Book/interfaces/IBook';

const App: React.FC = () => {
  const [displayItems, setDisplayItems] = useState<IBook>(null!);

  return (
    <section>
      <h1 className={styles.title}>Hello Wepack!</h1>
      <BookForm
        onSearch={async value => {
          const d = await axios.get<IBook>(
            `https://www.googleapis.com/books/v1/volumes?q=${value}&key=AIzaSyDZ71VzRW5oKBMhvC0UZNr-Q4UfezyeAnA&maxResults=30`
          );
          console.dir(d);

          setDisplayItems(d.data);
        }}
      />
      <article>
        <BookList books={displayItems?.items} />
      </article>
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
