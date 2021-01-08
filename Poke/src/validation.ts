export function validation(email: string, password: string) {
  let error;
  switch (true) {
    case email === '':
      error = 'O campo de e-mail deve estar preenchido';
      return error;
    case !email.match(/.+(@{1}.+(.com{1}$|.com.br{1}$))/):
      error = 'O e-mail foi escrito errado';
      return error;
    case password === '':
      error = 'O campo de senha deve estar preenchido';
      return error;
    case password.length < 7:
      error = 'A senha deve ter no mínimo 7 caracteres';
      return error;
    case !password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/):
      error = 'A senha deve ter no mínimo um caracter e um número';
      return error;
    default:
      error = 'Tudo certo';
      return error;
  }
}
