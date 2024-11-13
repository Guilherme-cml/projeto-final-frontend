import * as Yup from 'yup';
const CadastroValidator = Yup.object().shape({
    nome: Yup.string()
      .min(3, 'O mímino de caracteres é 3')
      .required('Campo obrigatório'),
    password: Yup.string()
      .min(8, 'O mímino de caracteres é 8')
      .required('Campo obrigatório'),
    confirmPassword: Yup.string()
      .min(8, 'O mímino de caracteres é 8')
      .required('Campo obrigatório'),
    email: Yup.string()
    .email('Email inválido')
    .required('Campo obrigatório'),
    username: Yup.string()
    .min(3, 'O mínimo de caracteres é 3')
    .required('Campo obrigatório'),
    birdthdate: Yup.string()
    .min(8)
    .required('Campo obrigatório'),
    cpf: Yup.string()
    .min(11, 'Coloque os 11 digitos do CPF')
    .required('Campo obrigatório'),
    
  });
  
  export default CadastroValidator