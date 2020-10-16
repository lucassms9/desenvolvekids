import * as yup from 'yup';

const validationSchema = yup.object().shape({
  category: yup.string().required('Campo obrigatório'),
  questionShort: yup.string().required('Campo obrigatório'),
  questionLong: yup.string().required('Campo obrigatório'),
});

export default validationSchema;
