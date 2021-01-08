export function Validation(email: string, password: string) {
  var error;
  if(email===''){ 
    error = 'O campo de e-mail deve estar preenchido';
    return error;
  }
  else if(!(email.match(/.+(@{1}.+.com{1}$)/))){
    error = 'O e-mail foi escrito errado';
    return error;
  }
  else if(password===''){
    error = 'O campo de senha deve estar preenchido';
    return error;
  }
  else if(password.length < 7){
    error = 'A senha deve ter no mínimo 7 caracteres';
    return error;
  }
  else if(!(password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/))){
    error = 'A senha deve ter no mínimo um caracter e um número';
    return error;
  }
  else{
    error = 'Tudo certo';
    return error;
  }
}