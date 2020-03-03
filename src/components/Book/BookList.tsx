import React from 'react';

import { IBookItem } from '../../models/Book/interfaces/IBookInterface';
import styles from './BookList.scss';

interface IBookListProps {
  books: IBookItem[] | undefined;
}

const BookList: React.FC<IBookListProps> = ({ books }) => {
  if (!books) {
    return null;
  }

  return (
    <ul className={styles.container}>
      {books.map((item, i) => {
        return (
          <li key={i}>
            <a
              className={styles.anchor}
              href={item.volumeInfo.previewLink}
              target={'_blank'}
            >
              <div>
                <img
                  className={styles.thumbnail}
                  src={item.volumeInfo.imageLinks?.thumbnail}
                />
              </div>
              <div className={styles.aboutBook}>
                <h3 className={styles.title}>{item.volumeInfo.title}</h3>
                {!!item.volumeInfo.authors && (
                  <h4>by {item.volumeInfo.authors[0]}</h4>
                )}
                {!!item.volumeInfo.publishedDate && (
                  <h4>Published {item.volumeInfo.publishedDate}</h4>
                )}
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default BookList;
