class Items {
  _id;
  _opnDate;
  _code;
  _name;
  _type;
  _qty;
  _totalAmount;
  _valueRate;
  _unit;
  _status;
  _shelfLife;
  _group;
  _image;
  _notes;
  _warehouse;
  _supplier;

  constructor({
    opnDate,
    code,
    name,
    type,
    qty,
    totalAmount,
    valueRate,
    unit,
    status,
    shelfLife,
    group,
    image,
    notes,
    warehouse,
    supplier,
  }) {
    this._opnDate = opnDate;
    this._code = code;
    this._name = name;
    this._type = type;
    this._qty = qty;
    this._totalAmount = totalAmount;
    this._valueRate = valueRate;
    this._unit = unit;
    this._status = status;
    this._shelfLife = shelfLife;
    this._group = group;
    this._image = image;
    this._notes = notes;
    this._warehouse = warehouse;
    this._supplier = supplier;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get opnDate() {
    return this._opnDate;
  }
  set opnDate(value) {
    this._opnDate = value;
  }

  get code() {
    return this._code;
  }
  set code(value) {
    this._code = value;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value;
  }

  get qty() {
    return this._qty;
  }
  set qty(value) {
    this._qty = value;
  }

  get totalAmount() {
    return this._totalAmount;
  }
  set totalAmount(value) {
    this._totalAmount = value;
  }

  get valueRate() {
    return this._valueRate;
  }
  set valueRate(value) {
    this._valueRate = value;
  }

  get unit() {
    return this._unit;
  }
  set unit(value) {
    this._unit = value;
  }

  get status() {
    return this._status;
  }
  set status(value) {
    this._status = value;
  }

  get shelfLife() {
    return this._shelfLife;
  }
  set shelfLife(value) {
    this._shelfLife = value;
  }

  get group() {
    return this._group;
  }
  set group(value) {
    this._group = value;
  }

  get image() {
    return this._image;
  }
  set image(value) {
    this._image = value;
  }

  get notes() {
    return this._notes;
  }
  set notes(value) {
    this._notes = value;
  }

  get warehouse() {
    return this._warehouse;
  }
  set warehouse(value) {
    this._warehouse = value;
  }

  get supplier() {
    return this._supplier;
  }
  set supplier(value) {
    this._supplier = value;
  }
}

export default Items;
