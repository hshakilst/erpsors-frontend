import * as yup from "yup";

const itemsSchema = yup.object().shape({
  code: yup.string().required(),
  name: yup.string().required(),
  type: yup.string().required(),
  qty: yup.number().required().positive(),
  valueRate: yup.number().required().positive(),
  unit: yup.string().required(),
  status: yup.string().required(),
  group: yup.string().optional().defined(), // can be empty but field name must be same
  image: yup.string().url().optional().defined(), // can be empty but field name must be same
  notes: yup.string().optional().defined(), // can be empty but field name must be same
});

export default itemsSchema;
