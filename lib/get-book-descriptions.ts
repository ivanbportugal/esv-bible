interface AboutBook {
  category: string
  author: string
  date: string
}
interface CategoryMap {
  [key: string]: AboutBook;
}

const bookMap = () => {

  const theMap: CategoryMap = {};

  theMap['Genesis'] = {
    category: 'Pentateuch',
    author: 'Moses',
    date: '1430 BC',
  };
  theMap['Exodus'] = {
    category: 'Pentateuch',
    author: 'Moses',
    date: '1400 BC',
  };
  theMap['Leviticus'] = {
    category: 'Pentateuch',
    author: 'Moses',
    date: '1445 BC',
  };
  theMap['Numbers'] = {
    category: 'Pentateuch',
    author: 'Moses',
    date: '1400 BC',
  };
  theMap['Deuteronomy'] = {
    category: 'Pentateuch',
    author: 'Moses',
    date: '1400 BC',
  };
  theMap['Joshua'] = {
    category: 'History',
    author: 'Joshua',
    date: '1375 BC',
  };
  theMap['Judges'] = {
    category: 'History',
    author: 'Samuel',
    date: '1050 BC',
  };
  theMap['Ruth'] = {
    category: 'History',
    author: 'Samuel',
    date: '1050-1000 BC',
  };
  theMap['1 Samuel'] = {
    category: 'History',
    author: 'Samuel',
    date: '900 BC',
  };
  theMap['2 Samuel'] = {
    category: 'History',
    author: 'Samuel',
    date: '900 BC',
  };
  theMap['1 Kings'] = {
    category: 'History',
    author: 'Uknown',
    date: '550 BC',
  };
  theMap['2 Kings'] = {
    category: 'History',
    author: 'Uknown',
    date: '550 BC',
  };
  theMap['1 Chronicles'] = {
    category: 'History',
    author: 'Unknown',
    date: '450 BC',
  };
  theMap['2 Chronicles'] = {
    category: 'History',
    author: 'Unknown',
    date: '340 BC',
  };
  theMap['Ezra'] = {
    category: 'History',
    author: 'Ezra',
    date: '450 BC',
  };
  theMap['Nehemiah'] = {
    category: 'History',
    author: 'Nehemiah',
    date: '425-400 BC',
  };
  theMap['Esther'] = {
    category: 'History',
    author: 'Unknown',
    date: '450 BC',
  };
  theMap['Job'] = {
    category: 'Poetry',
    author: 'Unknown',
    date: '1900 BC',
  };
  theMap['Psalms'] = {
    category: 'Poetry',
    author: 'Unknown',
    date: '1400-450 BC',
  };
  theMap['Proverbs'] = {
    category: 'Poetry',
    author: 'Solomon',
    date: '970-675 BC',
  };
  theMap['Ecclesiastes'] = {
    category: 'Poetry',
    author: 'Solomon',
    date: '940-931 BC',
  };
  theMap['Song of Solomon'] = {
    category: 'Poetry',
    author: 'Solomon',
    date: '970-950 BC',
  };
  theMap['Isaiah'] = {
    category: 'Major Prophets',
    author: 'Isaiah',
    date: '700-680 BC',
  };
  theMap['Jeremiah'] = {
    category: 'Major Prophets',
    author: 'Jeremiah',
    date: '585-570 BC',
  };
  theMap['Lamentations'] = {
    category: 'Major Prophets',
    author: 'Jeremiah',
    date: '585 BC',
  };
  theMap['Ezekiel'] = {
    category: 'Major Prophets',
    author: 'Ezekiel',
    date: '590-570 BC',
  };
  theMap['Daniel'] = {
    category: 'Major Prophets',
    author: 'Daniel',
    date: '536-530 BC',
  };
  theMap['Hosea'] = {
    category: 'Minor Prophets',
    author: 'Hosea',
    date: '750-710 BC',
  };
  theMap['Joel'] = {
    category: 'Minor Prophets',
    author: 'Joel',
    date: 'Unknown BC',
  };
  theMap['Amos'] = {
    category: 'Minor Prophets',
    author: 'Amos',
    date: '750 BC',
  };
  theMap['Obadiah'] = {
    category: 'Minor Prophets',
    author: 'Obadiah',
    date: 'Unknown BC',
  };
  theMap['Jonah'] = {
    category: 'Minor Prophets',
    author: 'Jonah',
    date: '772-754 BC',
  };
  theMap['Micah'] = {
    category: 'Minor Prophets',
    author: 'Micah',
    date: '735-710 BC',
  };
  theMap['Nahum'] = {
    category: 'Minor Prophets',
    author: 'Nahum',
    date: '650 BC',
  };
  theMap['Habakkuk'] = {
    category: 'Minor Prophets',
    author: 'Habbakuk',
    date: '640 BC',
  };
  theMap['Zephaniah'] = {
    category: 'Minor Prophets',
    author: 'Zephaniah',
    date: '635-625 BC',
  };
  theMap['Haggai'] = {
    category: 'Minor Prophets',
    author: 'Haggai',
    date: '526 BC',
  };
  theMap['Zechariah'] = {
    category: 'Minor Prophets',
    author: 'Zechariah',
    date: '520-484 BC',
  };
  theMap['Malachi'] = {
    category: 'Minor Prophets',
    author: 'Malachi',
    date: '433-424 BC',
  };
  theMap['Matthew'] = {
    category: 'Gospels',
    author: 'Matthew',
    date: '60-65 AD',
  };
  theMap['Mark'] = {
    category: 'Gospels',
    author: 'Mark',
    date: '50-60 AD',
  };
  theMap['Luke'] = {
    category: 'Gospels',
    author: 'Luke',
    date: '60-61 AD',
  };
  theMap['John'] = {
    category: 'Gospels',
    author: 'John',
    date: '80-90 AD',
  };
  theMap['Acts'] = {
    category: 'Acts',
    author: 'Luke',
    date: '62 AD',
  };
  theMap['Romans'] = {
    category: 'Paul\'s Letters',
    author: 'Paul',
    date: '56 AD',
  };
  theMap['1 Corinthians'] = {
    category: 'Paul\'s Letters',
    author: 'Paul',
    date: '55 AD',
  };
  theMap['2 Corinthians'] = {
    category: 'Paul\'s Letters',
    author: 'Paul',
    date: '55-56 AD',
  };
  theMap['Galatians'] = {
    category: 'Paul\'s Letters',
    author: 'Paul',
    date: '49-50 AD',
  };
  theMap['Ephesians'] = {
    category: 'Paul\'s Letters',
    author: 'Paul',
    date: '60-62 AD',
  };
  theMap['Philippians'] = {
    category: 'Paul\'s Letters',
    author: 'Paul',
    date: '60-62 AD',
  };
  theMap['Colossians'] = {
    category: 'Paul\'s Letters',
    author: 'Paul',
    date: '60-62 AD',
  };
  theMap['1 Thessalonians'] = {
    category: 'Paul\'s Letters',
    author: 'Paul',
    date: '51 AD',
  };
  theMap['2 Thessalonians'] = {
    category: 'Paul\'s Letters',
    author: 'Paul',
    date: '51-52 AD',
  };
  theMap['1 Timothy'] = {
    category: 'Paul\'s Letters',
    author: 'Paul',
    date: '62-64 AD',
  };
  theMap['2 Timothy'] = {
    category: 'Paul\'s Letters',
    author: 'Paul',
    date: '66-67 AD',
  };
  theMap['Titus'] = {
    category: 'Paul\'s Letters',
    author: 'Paul',
    date: '63 AD',
  };
  theMap['Philemon'] = {
    category: 'Paul\'s Letters',
    author: 'Paul',
    date: '60 or 61 AD',
  };
  theMap['Hebrews'] = {
    category: 'General Letters',
    author: 'Unknown',
    date: '67-69 AD',
  };
  theMap['James'] = {
    category: 'General Letters',
    author: 'James',
    date: '40-49 AD',
  };
  theMap['1 Peter'] = {
    category: 'General Letters',
    author: 'Peter',
    date: '64 AD',
  };
  theMap['2 Peter'] = {
    category: 'General Letters',
    author: 'Peter',
    date: '67 AD',
  };
  theMap['1 John'] = {
    category: 'General Letters',
    author: 'John',
    date: '90-95 AD',
  };
  theMap['2 John'] = {
    category: 'General Letters',
    author: 'John',
    date: '90-95 AD',
  };
  theMap['3 John'] = {
    category: 'General Letters',
    author: 'John',
    date: '90-95 AD',
  };
  theMap['Jude'] = {
    category: 'General Letters',
    author: 'John',
    date: '75 AD',
  };
  theMap['Revelation'] = {
    category: 'Prophecy',
    author: 'John',
    date: '90-95 AD',
  };
  
  return theMap;
}

const theMap = bookMap();

const getBookMap = (book: string) => {
  return theMap[book];
}

export { getBookMap }
