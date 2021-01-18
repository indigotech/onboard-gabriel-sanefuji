import styled from 'styled-components/native';

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: black;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ButtonStyled = styled.TouchableOpacity`
  background-color: #1a348a;
  padding-top: 11px;
  padding-bottom: 11px;
  border-radius: 40px;
  margin: 20px 30px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ButtonTextStyled = styled.Text`
  color: white;
  flex: 1;
  font-size: 16px;
  font-weight: normal;
`;

export const LabelStyled = styled.Text`
  font-size: 12px;
  font-weight: normal;
  color: gray;
  margin-bottom: 12px;
`;

export const TextFieldStyled = styled.TextInput`
  padding: 10px;
  border: 1px;
  color: gray;
  border-radius: 10px;
`;

export const ViewInputStyled = styled.View`
  margin: 0px 20px 20px;
`;

export const ScrollStyled = styled.ScrollView`
  background-color: gray;
`;

export const BackgroungStyled = styled.View`
  background-color: white;
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const DetailsNameStyled = styled.Text`
  font-size: 25px;
  font-weight: bold;
  align-self: center;
  padding: 15px;
`;

export const SeparatorLineStyled = styled.View`
  border-bottom-color: #c8cbce;
  border-bottom-width: 1px;
  margin: 10px;
  margin-left: 30px;
  margin-right: 30px;
`;

export const ListBackgroundStyled = styled.SafeAreaView`
  flex: 1;
  background-color: #e6eaee;
`;

export const ListUsernameStyled = styled.Text`
  padding: 5px;
  font-weight: bold;
`;

export const ListEmailStyled = styled.Text`
  align-items: flex-end;
  left: 5px;
`;

export const ListBoxStyled = styled.View`
  border-radius: 22px;
  color: #000000;
  background-color: #ffffff;
  border-width: 0.5px;
  padding: 10px;
  margin: 5px;
  margin-top: 10px;
  flex-direction: column;
  box-shadow: 0px 2px 2px grey;
`;

export const AddButtonStyled = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #1a348a;
  position: absolute;
  bottom: 40px;
  right: 15px;
`;

export const ButtonPlusSign = styled.Text`
  align-self: center;
  color: #ffffff;
  font-size: 30px;
`;
