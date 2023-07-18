import { useState, Component, useEffect } from 'react';
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
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

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
          console.log('1');
          return;
        }

        if (page === 1) {
          setImages(images.hits);
          setStatus('resolved');
          console.log(page);
          console.log('2');

          return;
        }

        if (page > 1) {
          setImages(state => [...state, ...images.hits]);
          setStatus('resolved');
          console.log('3');

          return;
        }

        // if (prevProps.imageName === this.props.imageName) {
        //   this.setState(
        //     {
        //       images: [...prevState.images, ...images.hits],
        //       status: 'resolved',
        //     },
        //     () => {
        //       window.scrollTo({
        //         top: window.scrollY + 500,
        //         behavior: 'smooth',
        //       });
        //     }
        //   );

        //   return;
        // }
      })
      .catch(error => this.setState({ page: 1, error, status: 'rejected' }));
  }, [imageName, page]);

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

// export class ImageGallery extends Component {
//   state = {
//     images: [],
//     error: null,
//     showModal: false,
//     id: '',
//     status: 'idle',
//     page: 1,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevProps.imageName !== this.props.imageName ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({ status: 'pending' });
//       const page = this.state.page;

//       fetchImages(this.props.imageName, page)
//         .then(images => {
//           if (images.total === 0) {
//             return this.setState({ page: 1, status: 'rejected' });
//           }

//           if (
//             prevProps.imageName !== this.props.imageName ||
//             (prevProps.imageName === this.props.imageName &&
//               this.state.page === 1)
//           ) {
//             this.setState({
//               images: images.hits,
//               status: 'resolved',
//               page: 1,
//             });

//             return;
//           }

//           if (prevProps.imageName === this.props.imageName) {
//             this.setState(
//               {
//                 images: [...prevState.images, ...images.hits],
//                 status: 'resolved',
//               },
//               () => {
//                 window.scrollTo({
//                   top: window.scrollY + 500,
//                   behavior: 'smooth',
//                 });
//               }
//             );

//             return;
//           }
//         })
//         .catch(error => this.setState({ page: 1, error, status: 'rejected' }));
//     }
//   }

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   handleClick = e => {
//     this.setState({ id: Number(e.currentTarget.id) });
//     this.toggleModal();
//   };

//   compareHandle = () => {
//     const image = this.state.images.find(
//       hit => hit.id === Number(this.state.id)
//     );
//     return image.largeImageURL;
//   };

//   loadMoreHandler = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const {
//       state: { status, images, showModal, page },
//       props: { imageName },
//       handleClick,
//       loadMoreHandler,
//       toggleModal,
//       compareHandle,
//     } = this;

//     if (status === 'resolved' || page > 1) {
//       return (
//         <div>
//           <List>
//             {images &&
//               images.map(image => {
//                 return (
//                   <ImageGalleryItem
//                     key={image.id}
//                     image={image}
//                     onClick={handleClick}
//                   />
//                 );
//               })}
//           </List>
//           {status === 'pending' && <Loader />}
//           {images.length % 12 === 0 && <Button onClick={loadMoreHandler} />}
//           {showModal && <Modal onClose={toggleModal} image={compareHandle} />}
//         </div>
//       );
//     }

//     if (status === 'pending') {
//       return <Loader />;
//     }

//     if (status === 'rejected') {
//       return (
//         <ErrorWrapper role="alert">
//           <Message>
//             There are no images like a <Span>{imageName}</Span>
//           </Message>
//           <img src={errorImage} width="240" alt="sadcat" />
//         </ErrorWrapper>
//       );
//     }
//   }
// }

ImageGallery.propTypes = {
  onSubmit: PropTypes.func,
};
