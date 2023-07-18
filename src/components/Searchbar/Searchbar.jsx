import { Wrapper } from './Searchbar.styled';
import { SearchForm } from './SearchForm/SearchForm';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  return (
    <Wrapper>
      <SearchForm onSubmit={onSubmit} />
    </Wrapper>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
