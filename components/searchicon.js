import { prefix } from '../lib/prefix';
import styles from './Search.module.css';

export default function SearchIcon() {
  const url = `${prefix}/Search_Icon.svg`;
  return <img className={styles.searchsvg} src={url}></img>
}
