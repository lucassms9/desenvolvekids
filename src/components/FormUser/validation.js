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
  password: yup.string().required('Campo obrigatório'),
  passwordConfirm: yup
    .string()
    .required('Campo obrigatório')
    .equalTo(yup.ref('password')),

  parent: yup.string().required('Campo obrigatório'),
  parentOther: yup.string().notRequired()
  .when('parentLabel', {
  is: (val) => String(val).toLowerCase() === 'outros',
    then: yup.string().required('Campo obrigatório'),
    otherwise: yup.string().notRequired()
  }),

  zipCode: yup.string().required('Campo obrigatório'),
  nameAddress: yup.string().required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
  number: yup.string().required('Campo obrigatório'),
  neighborhood: yup.string().required('Campo obrigatório'),
  city: yup.string().required('Campo obrigatório'),
  state: yup.string().required('Campo obrigatório'),

});

export default validationSchema;
