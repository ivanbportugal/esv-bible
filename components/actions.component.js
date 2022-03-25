import React from 'react';
import Link from 'next/link';
import { IconButton, StylesProvider, useColorMode } from '@chakra-ui/react';
import { MoonIcon, Search2Icon, SunIcon } from '@chakra-ui/icons';
import HomeIcon from './homeicon';
import styles from './Actions.module.css';

export default function ActionsComponent() {

  const { colorMode, toggleColorMode } = useColorMode();

  const colorIcon = (colorMode === 'light') 
    ? <IconButton size='sm' aria-label='Toggle Dark Mode' icon={<SunIcon />} onClick={toggleColorMode} />
    : <IconButton size='sm' aria-label='Toggle Dark Mode' icon={<MoonIcon />} onClick={toggleColorMode} />

  return (
    <div className={styles.actionswrapper}>
      <Link href='/'>
        <a>
          <IconButton size='sm' className={styles.homeiconbutton} aria-label='Home' icon={<HomeIcon />} />
        </a>
      </Link>
      <Link href='/search'>
        <a>
          <IconButton size='sm' aria-label='Search' icon={<Search2Icon />} />
        </a>
      </Link>
      {colorIcon}
    </div>
  )
}
