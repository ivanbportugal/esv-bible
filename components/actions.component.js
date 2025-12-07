import React, { useState } from 'react';
import Link from 'next/link';
import { IconButton, createToaster } from '@chakra-ui/react';
import { MoonIcon, Search2Icon, SunIcon, CopyIcon, HamburgerIcon } from '@chakra-ui/icons';
import HomeIcon from './homeicon';
import styles from './Actions.module.css';

// Create toaster instance
const toaster = createToaster({
  placement: 'bottom',
  duration: 5000,
});

export default function ActionsComponent() {

  const [isOpen, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleColorMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const colorIcon = isDark
    ? <IconButton className={styles.actionswrapperitem} size='sm' aria-label='Toggle Dark Mode' onClick={toggleColorMode}><MoonIcon /></IconButton>
    : <IconButton className={styles.actionswrapperitem} size='sm' aria-label='Toggle Dark Mode' onClick={toggleColorMode}><SunIcon /></IconButton>

  const onCopyClicked = async () => {

    const url = window.location.href

    try {
      if (navigator.share) {
        await navigator.share({
          title: url,
          text: 'Read the swrd.org',
          url: url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        toaster.create({
          title: 'Copied URL.',
          description: '',
          type: 'success',
          duration: 5000,
        });
      } else {
        console.log('Couldn\'t share the url');
        toaster.create({
          title: 'Could not grab URL.',
          description: 'There was an error trying to get the URL on your clipboard. Please try again later...',
          type: 'error',
          duration: 5000,
        });
      }
    } catch (e) {
      console.log('Couldn\'t share the url (you may have cancelled the operation).', e);
    }
  }

  const renderMenu = () => {
    return (<>
      <div className={`${styles.actionswrapperitemsparent} ${isOpen ? styles.open : ''}`}>
        <Link href='/' passHref>
            <IconButton className={`${styles.actionswrapperitem} ${styles.homeiconbutton}`} size='sm' aria-label='Home'><HomeIcon /></IconButton>
        </Link>
        <Link href='/search' passHref>
            <IconButton className={styles.actionswrapperitem} size='sm' aria-label='Search'><Search2Icon /></IconButton>
        </Link>
        {colorIcon}
        <IconButton className={styles.actionswrapperitem} size='sm' aria-label='Copy URL' onClick={onCopyClicked}><CopyIcon /></IconButton>
      </div>
    </>)
  }

  return (
    <div className={styles.actionswrapper} >
      <IconButton className={styles.actionswrapperitem} size='sm' aria-label='Hamburger' onClick={() => setOpen(!isOpen)}><HamburgerIcon /></IconButton>
      {renderMenu()}
    </div>
  );
}
