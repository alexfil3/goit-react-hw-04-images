import { useState } from 'react';
import { Form, Button, Label, Input } from './SearchForm.styled';
import PropTypes from 'prop-types';

export function SearchForm({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      return;
    }

    onSubmit(value);
  };

  const onChange = e => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setValue(value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Button type="submit">
        <Label>Search</Label>
      </Button>

      <Input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={onChange}
        value={value}
      />
    </Form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
