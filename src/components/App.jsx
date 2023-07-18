import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppWrapper } from './App.styled';
import './App.css';

export function App() {
  const [name, setName] = useState('');

  return (
    <AppWrapper>
      <Searchbar onSubmit={setName} />
      <ImageGallery imageName={name} />
    </AppWrapper>
  );
}
