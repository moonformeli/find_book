import 'antd/dist/antd.css';

import axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import BookForm from './components/Book/BookForm';
import styles from './index.css';

const App: React.FC = () => {
  const [displayItems, setDisplayItems] = useState([]);

  return (
    <section>
      <h1 className={styles.title}>Hello Wepack!</h1>
      <BookForm
        onSearch={async value => {
          const d = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${value}&key=AIzaSyDZ71VzRW5oKBMhvC0UZNr-Q4UfezyeAnA&maxResults=30`
          );
          console.dir(d);
        }}
      />
      <article>
        <ul>
          {/* {displayItems.map(item => {
            return <li key={item.id}></li>
          })} */}
        </ul>
      </article>
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
