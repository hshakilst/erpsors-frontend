export default class StoreRequisitions {
  _id;
  _date;
  _code;
  _item;
  _reqQty;
  _warehouse;
  _notes;
  _reqDate;
  _isApproved;

  constructor({ date, code, item, reqQty, warehouse, notes, reqDate }) {
    this._date = date;
    this._code = code;
    this._item = item;
    this._reqQty = reqQty;
    this._warehouse = warehouse;
    this._notes = notes;
    this._reqDate = reqDate;
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

  get item() {
    return this._item;
  }
  set item(value) {
    this._item = value;
  }

  get reqQty() {
    return this._reqQty;
  }
  set reqQty(value) {
    this._reqQty = value;
  }

  get warehouse() {
    return this._warehouse;
  }
  set warehouse(value) {
    this._warehouse = value;
  }

  get notes() {
    return this._notes;
  }

  set notes(value) {
    this._notes = value;
  }

  get reqDate() {
    return this._reqDate;
  }
  set reqDate(value) {
    this._reqDate = value;
  }

  get isApproved() {
    return this._isApproved;
  }
  set isApproved(value) {
    this._isApproved = value;
  }
}
