import * as yup from 'yup';
import { validarCPFCnpj } from '~/helpers/validateFunctions';

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório'),
  fiscalNumber: yup
    .string()
    .required('Campo obrigatório')
    .test('fiscalNumber', 'CPF inválido', (value) => {
      let teste = false;
      if (typeof value !== 'undefined') {
        teste = validarCPFCnpj(value);
      }

      return teste;
    }),
  phone: yup.string().required('Campo obrigatório'),
  birthDate: yup.string().required('Campo obrigatório'),
});

export default validationSchema;
