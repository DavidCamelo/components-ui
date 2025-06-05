import React from 'react';
import { Input } from './Input';
import { Button } from '../button/Button';

import alertService from '@jetbrains/ring-ui-built/components/alert-service/alert-service';
import ButtonJetbrains from '@jetbrains/ring-ui-built/components/button/button';

import '@jetbrains/ring-ui-built/components/style.css';

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
        <ButtonJetbrains onClick={() => alertService.successMessage('Hello world')}>Click me</ButtonJetbrains>
        <Input size="small" label="Number" primary disabled value={value} onChange={(e) => onChange(e.target.value)} />
        <Button size="small" label="Add" type="submit" />
      </div>
    </form>
  );
};
