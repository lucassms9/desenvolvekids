import * as yup from 'yup';
const validationSchema = yup.object().shape({
  zipCode: yup.string().required('Campo obrigatório'),
  nameAddress: yup.string().required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
  number: yup.string().required('Campo obrigatório'),
  neighborhood: yup.string().required('Campo obrigatório'),
  city: yup.string().required('Campo obrigatório'),
  state: yup.string().required('Campo obrigatório'),
});

export default validationSchema;
