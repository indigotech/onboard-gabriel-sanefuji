import React from 'react';
import {ButtonStyled, ButtonTextStyled} from '../styles';

interface SubmitButtonProps {
  text: string;
  onTap: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return (
    <ButtonStyled onPress={props.onTap}>
      <ButtonTextStyled>{props.text}</ButtonTextStyled>
    </ButtonStyled>
  );
};
