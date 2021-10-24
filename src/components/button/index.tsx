import React from 'react';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode,
  type: 'button' | 'submit';
}

const Button: React.FC<Props> = ({ type,children }) => {
  return (
    <button type={type} className={styles.button}>{children}</button>
  )
}

export default Button;