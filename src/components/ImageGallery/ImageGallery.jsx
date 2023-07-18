import { useState, useEffect } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { List, Message, ErrorWrapper, Span } from './ImageGallery.styled';
import { Loader } from './Loader/Loader';
import errorImage from './error.jpg';
import { fetchImages } from 'components/services/pixabay-api';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import PropTypes from 'prop-types';

export function ImageGallery({ imageName }) {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [imageName]);

  useEffect(() => {
    if (!imageName) {
      return;
    }

    setStatus('pending');

    fetchImages(imageName, page)
      .then(images => {
        if (images.total === 0) {
          setPage(1);
          setStatus('rejected');

          return;
        }

        if (page === 1) {
          setImages(images.hits);
          setStatus('resolved');

          return;
        }

        if (page > 1) {
          setImages(state => [...state, ...images.hits]);
          setStatus('resolved');

          window.scrollTo({
            top: window.scrollY + 200,
            behavior: 'smooth',
          });

          return;
        }
      })
      .catch(error => {
        setPage(1);
        setStatus('rejected');
      });
  }, [imageName, page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: window.scrollY + 600,
        behavior: 'smooth',
      });
    }
  }, [images, page]);

  const handleClick = e => {
    setId(Number(e.currentTarget.id));
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const loadMoreHandler = () => {
    setPage(state => state + 1);
  };

  const compareHandle = () => {
    const image = images.find(hit => hit.id === Number(id));
    return image.largeImageURL;
  };

  if (status === 'resolved' || page > 1) {
    return (
      <div>
        <List>
          {images &&
            images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  onClick={handleClick}
                />
              );
            })}
        </List>
        {status === 'pending' && <Loader />}
        {images.length % 12 === 0 && <Button onClick={loadMoreHandler} />}
        {showModal && <Modal onClose={toggleModal} image={compareHandle} />}
      </div>
    );
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return (
      <ErrorWrapper role="alert">
        <Message>
          There are no images like a <Span>{imageName}</Span>
        </Message>
        <img src={errorImage} width="240" alt="sadcat" />
      </ErrorWrapper>
    );
  }
}

ImageGallery.propTypes = {
  onSubmit: PropTypes.func,
};
