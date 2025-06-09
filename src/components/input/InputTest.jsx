import React from 'react';
import { Input } from './Input';
import { Button } from '../button/Button';

export const InputTest = (props) => {
  const { value, onChange, onSubmit } = props;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <div className="flex-row">
        <Input size="small" label="Number" primary disabled value={value} onChange={(e) => onChange(e.target.value)} />
        <Button size="small" label="Add" type="submit" />
      </div>
    </form>
  );
};
