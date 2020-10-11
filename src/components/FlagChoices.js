import React from 'react';
import StyledButton from './StyledButton';
import './FlagChoices.css';

const FlagChoices = ({handleChange, handleSubmit, options} ) => {
  // const options = props.options || [];
  // const { handleChange, handleSubmit } = props;
  const inputs = options.map(opt => (
    <label key={opt.id}>
      <input
        type='radio'
        value={opt.id}
        checked={opt.checked}
        onChange={handleChange}
        name='flag-choice'
      />
      {opt.name}
    </label>
  ));

  return (
    <form className='flag-form' onSubmit={handleSubmit}>
      {inputs}
      <StyledButton text='GUESS' type='submit' />
    </form>
  );
};

export default FlagChoices;
