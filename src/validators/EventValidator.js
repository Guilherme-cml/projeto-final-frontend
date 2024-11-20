import * as Yup from 'yup';

const EventValidator = Yup.object().shape({
    name: Yup.string()  
      .min(3, 'O mínimo de caracteres é 3')
      .required('Campo obrigatório'),
    local: Yup.string()
      .min(4, 'O mínimo de caracteres é 4')
      .required('Campo obrigatório'),
   date: Yup.string()
      .required('Campo obrigatório'),
    
});

export default EventValidator;
