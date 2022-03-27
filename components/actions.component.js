import React from 'react';
import Link from 'next/link';
import { IconButton, useColorMode, useToast } from '@chakra-ui/react';
import { MoonIcon, Search2Icon, SunIcon, CopyIcon } from '@chakra-ui/icons';
import HomeIcon from './homeicon';
import styles from './Actions.module.css';

export default function ActionsComponent() {

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const colorIcon = (colorMode === 'light') 
    ? <IconButton size='sm' aria-label='Toggle Dark Mode' icon={<SunIcon />} onClick={toggleColorMode} />
    : <IconButton size='sm' aria-label='Toggle Dark Mode' icon={<MoonIcon />} onClick={toggleColorMode} />

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
      console.log('Couldn\'t share the url', e);
      toast({
        title: 'Could not grab URL to share',
        description: 'There was an error trying to share or get the URL to your clipboard (you may have cancelled the operation).',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  }

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
      <IconButton size='sm' aria-label='Copy URL' onClick={onCopyClicked} icon={<CopyIcon />} />
    </div>
  )
}
