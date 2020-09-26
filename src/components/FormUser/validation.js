import * as yup from 'yup';
import { validarCPFCnpj } from '~/helpers/validateFunctions';

function equalTo(ref, msg) {
  return this.test({
    name: 'equalTo',
    exclusive: false,
    message: msg || 'As senhas devem ser iguais',
    params: {
      reference: ref.path,
    },
    test: function (value) {
      return value === this.resolve(ref);
    },
  });
}

yup.addMethod(yup.string, 'equalTo', equalTo);

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório'),
  fiscal_number: yup
    .string()
    .required('Campo obrigatório')
    .test('fiscal_number', 'CPF inválido', (value) => {
      let teste = false;
      if (typeof value !== 'undefined') {
        teste = validarCPFCnpj(value);
      }

      return teste;
    }),
  phone: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
  passwordConfirm: yup
    .string()
    .required('Campo obrigatório')
    .equalTo(yup.ref('password')),
});

export default validationSchema;
