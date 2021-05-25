import yup from "yup";

const schema = yup.object().shape({
  code: yup.string().required(),
  name: yup.string().required(),
  type: yup.string().required(),
  qty: yup.number().required().positive(),
  valueRate: yup.number().required().positive(),
  unit: yup.string().required(),
  status: yup.string().required(),
  group: yup.string().notRequired().ensure(),
  image: yup.string().url().notRequired().ensure(),
  notes: yup.string().notRequired().ensure(),
});
