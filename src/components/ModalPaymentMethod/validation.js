import * as yup from 'yup';
import { testarCC } from '~/helpers/validateFunctions';

const validationSchema = yup.object().shape({
  cardName: yup.string().required('Campo obrigatório'),
  cardNumber: yup
    .string()
    .required('Campo obrigatório')
    .test('cardNumber', 'Número do Cartão inválido', testarCC),
  cardValid: yup.string().required('Campo obrigatório'),
  cardCode: yup.string().required('Campo obrigatório'),
});

export default validationSchema;
