class ItemsLedger {
  _id;
  _date;
  _code;
  _type;
  _itemCode;
  _opnRate;
  _opnQty;
  _recRate;
  _recQty;
  _issRate;
  _issQty;
  _warehouseCode;
  _notes;

  constructor({
    date,
    code,
    type,
    itemCode,
    opnRate,
    opnQty,
    recRate,
    recQty,
    issRate,
    issQty,
    warehouseCode,
    notes,
  }) {
    this._date = date;
    this._code = code;
    this._type = type;
    this._itemCode = itemCode;
    this._opnRate = Number(opnRate);
    this._opnQty = Number(opnQty);
    this._recRate = Number(recRate);
    this._recQty = Number(recQty);
    this._issRate = Number(issRate);
    this._issQty = Number(issQty);
    this._warehouseCode = warehouseCode;
    this._notes = notes;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get date() {
    return this._date;
  }
  set date(value) {
    this._date = value;
  }

  get code() {
    return this._code;
  }
  set code(value) {
    this._code = value;
  }

  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value;
  }

  get itemCode() {
    return this._itemCode;
  }
  set itemCode(value) {
    this._itemCode = value;
  }

  get opnRate() {
    return this._opnRate;
  }
  set opnRate(value) {
    this._opnRate = Number(value);
  }

  get opnQty() {
    return this._opnQty;
  }
  set opnQty(value) {
    this._opnQty = Number(value);
  }

  get recRate() {
    return this._recRate;
  }
  set recRate(value) {
    this._recRate = Number(value);
  }

  get recQty() {
    return this._recQty;
  }
  set recQty(value) {
    this._recQty = Number(value);
  }

  get issRate() {
    return this._issRate;
  }
  set issRate(value) {
    this._issRate = Number(value);
  }

  get issQty() {
    return this._issQty;
  }
  set issQty(value) {
    this._issQty = Number(value);
  }

  get warehouseCode() {
    return this._warehouseCode;
  }
  set warehouseCode(value) {
    this._warehouseCode = value;
  }

  get notes() {
    return this._notes;
  }
  set notes(value) {
    this._notes = value;
  }
}
export default ItemsLedger;
