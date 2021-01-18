import React from 'react';
import {LabelStyled, TextFieldStyled, ViewInputStyled} from '../styles';

interface InputProps {
  name: string;
  text: string;
  isPassword?: boolean;
  onTextChange: (text: string) => void;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <ViewInputStyled>
      <LabelStyled>{props.name}</LabelStyled>
      <TextFieldStyled value={props.text} onChangeText={props.onTextChange} secureTextEntry={props.isPassword} />
    </ViewInputStyled>
  );
};

Input.defaultProps = {
  isPassword: false,
};
