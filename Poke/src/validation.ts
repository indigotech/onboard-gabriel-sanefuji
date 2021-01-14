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
      error = null;
      return error;
  }
}

export function addUserValidation(email: string, name: string, phone: string, date: string) {
  let error;
  const today = new Date();
  const year = today.getFullYear();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const birthDate = date.split('-');
  const birthYear = parseInt(birthDate[0]);
  const birthMonth = parseInt(birthDate[1]);
  const birthDay = parseInt(birthDate[2]);
  switch (true) {
    case name === '':
      error = 'O campo de Nome deve estar preenchido';
      return error;
    case email === '':
      error = 'O campo de e-mail deve estar preenchido';
      return error;
    case !email.match(/.+(@{1}.+(.com{1}$|.com.br{1}$))/):
      error = 'O e-mail foi escrito errado';
      return error;
    case phone === '':
      error = 'O campo do celular deve estar preenchido';
      return error;
    case phone.length < 11:
      error = 'O número do celular deve ter no mínimo 11 dígitos';
      return error;
    case date === '':
      error = 'O campo de data de nascimento deve estar preenchido';
      return error;
    case !date.match(/^\d{4}[-]\d{2}[-]\d{2}/):
      error = 'A data de nascimento deve possuir o formato AAAA-MM-DD';
      return error;
    case birthYear > year || birthMonth > 12 || birthDay > 31:
      error = 'A data de nascimento possui valores inválidos';
      return error;
    case birthYear === year && (birthMonth > month || (birthMonth === month && birthDay > day)):
      error = 'A data de nascimento possui valores inválidos';
      return error;
    default:
      error = null;
      return error;
  }
}
