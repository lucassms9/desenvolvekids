import * as yup from 'yup';



const validationSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  fiscalNumber: yup.string().required('Campo obrigatório'),
  birthDate: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório'),
  phone: yup.string().required('Campo obrigatório'),
  parent: yup.string().required('Campo obrigatório'),
  parentOther: yup.string().notRequired()
  .when('parentLabel', {
  is: (val) => String(val).toLowerCase() === 'outros',
    then: yup.string().required('Campo obrigatório'),
    otherwise: yup.string().notRequired()
  })
});

export default validationSchema;
