class PurchaseOrders {
  _id;
  _code;
  _reqCode;
  _item;
  _rate;
  _appQty;
  _supplier;
  _purMode;
  _creDays;
  _purBy;
  _notes;
  _totalAmount;
  _date;
  _isReceived;

  constructor({
    code,
    reqCode,
    item,
    rate,
    appQty,
    supplier,
    purMode,
    creDays,
    purBy,
    notes,
    totalAmount,
    date,
  }) {
    this._code = code;
    this._reqCode = reqCode;
    this._item = item;
    this._rate = rate;
    this._appQty = appQty;
    this._supplier = supplier;
    this._purMode = purMode;
    this._creDays = creDays;
    this._purBy = purBy;
    this._notes = notes;
    this._totalAmount = totalAmount;
    this._date = date;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get code() {
    return this._code;
  }
  set code(value) {
    this._code = value;
  }
  get reqCode() {
    return this._reqCode;
  }
  set reqCode(value) {
    this._reqCode = value;
  }
  get item() {
    return this._item;
  }
  set item(value) {
    this._item = value;
  }
  get rate() {
    return this._rate;
  }
  set rate(value) {
    this._rate = value;
  }
  get appQty() {
    return this._appQty;
  }
  set appQty(value) {
    this._appQty = value;
  }
  get supplier() {
    return this._supplier;
  }
  set supplier(value) {
    this._supplier = value;
  }
  get purMode() {
    return this._purMode;
  }
  set purMode(value) {
    this._purMode = value;
  }
  get creDays() {
    return this._creDays;
  }
  set creDays(value) {
    this._creDays = value;
  }
  get purBy() {
    return this._purBy;
  }
  set purBy(value) {
    this._purBy = value;
  }
  get notes() {
    return this._notes;
  }
  set notes(value) {
    this._notes = value;
  }
  get totalAmount() {
    return this._totalAmount;
  }
  set totalAmount(value) {
    this._totalAmount = value;
  }
  get date() {
    return this._date;
  }
  set date(value) {
    this._date = value;
  }
  get isReceived() {
    return this._isReceived;
  }
  set isReceived(value) {
    this._isReceived = value;
  }
}

export default PurchaseOrders;
