import React, { useState } from 'react';
import Link from 'next/link';
import { IconButton, useColorMode, useToast, SlideFade } from '@chakra-ui/react';
import { MoonIcon, Search2Icon, SunIcon, CopyIcon, HamburgerIcon } from '@chakra-ui/icons';
import HomeIcon from './homeicon';
import styles from './Actions.module.css';

export default function ActionsComponent() {

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const [isOpen, setOpen] = useState(false);

  const colorIcon = (colorMode === 'light') 
    ? <IconButton className={styles.actionswrapperitem} size='sm' aria-label='Toggle Dark Mode' icon={<SunIcon />} onClick={toggleColorMode} />
    : <IconButton className={styles.actionswrapperitem} size='sm' aria-label='Toggle Dark Mode' icon={<MoonIcon />} onClick={toggleColorMode} />

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
        toast({
          title: 'Copied URL.',
          description: '',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
      } else {
        console.log('Couldn\'t share the url');
        toast({
          title: 'Could not grab URL.',
          description: 'There was an error trying to get the URL on your clipboard. Please try again later...',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
    } catch (e) {
      console.log('Couldn\'t share the url (you may have cancelled the operation).', e);
    }
  }

  const renderMenu = () => {
    return (<>
      <SlideFade in={isOpen} className={styles.actionswrapperitemsparent}>
        <Link href='/' passHref>
            <IconButton className={`${styles.actionswrapperitem} ${styles.homeiconbutton}`} size='sm' aria-label='Home' icon={<HomeIcon />} />
        </Link>
        <Link href='/search' passHref>
            <IconButton className={styles.actionswrapperitem} size='sm' aria-label='Search' icon={<Search2Icon />} />
        </Link>
        {colorIcon}
        <IconButton className={styles.actionswrapperitem} size='sm' aria-label='Copy URL' onClick={onCopyClicked} icon={<CopyIcon />} />
      </SlideFade>
    </>)
  }

  return (
    <div className={styles.actionswrapper} >
      <IconButton className={styles.actionswrapperitem} size='sm' aria-label='Hamburger' icon={<HamburgerIcon />} onClick={() => setOpen(!isOpen)} />
      {renderMenu()}
    </div>
  );
}
