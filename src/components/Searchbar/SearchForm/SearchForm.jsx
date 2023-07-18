import { Component } from 'react';
import { Form, Button, Label, Input } from './SearchForm.styled';
import PropTypes from 'prop-types';

export class SearchForm extends Component {
  state = {
    value: '',
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ value: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.value);
  };

  render() {
    const {
      handleSubmit,
      onChange,
      state: { value },
    } = this;
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
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
