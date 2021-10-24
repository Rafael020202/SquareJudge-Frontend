import React from 'react';

import styles from './styles.module.scss';

const Input = (props: React.HTMLProps<HTMLInputElement>) => {
  return(
    <div className={styles.container}>
      <input {...props}/>
    </div>
  );
}

export default Input;