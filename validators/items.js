import * as yup from "yup";

const itemsSchema = yup.object().shape({
  code: yup.number().required(),
  opnDate: yup.string().required(), //FIXME: date needs to be date note string
  name: yup.string().required(),
  type: yup.string().required(),
  qty: yup.number().required(),
  valueRate: yup.number().required(),
  totalAmount: yup.number().required(),
  unit: yup.string().required(),
  status: yup.string().required(),
  group: yup.string().optional().defined(), // can be empty but field name must be same
  image: yup.string().url().optional().defined(), // can be empty but field name must be same
  notes: yup.string().optional().defined(), // can be empty but field name must be same
  warehouse: yup.string().required(),
  shelfLife: yup.string().optional().defined(), //FIXME: shelfLife needs to be number not string
  supplier: yup.string().optional().defined(),
});

export default itemsSchema;
