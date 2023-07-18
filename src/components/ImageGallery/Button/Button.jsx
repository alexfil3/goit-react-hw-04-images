import { ButtonWrapper } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return <ButtonWrapper onClick={onClick}>Load more</ButtonWrapper>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
