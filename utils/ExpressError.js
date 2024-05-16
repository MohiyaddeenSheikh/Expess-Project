class ExpressError extends Error{
  constructor(_status,_message){
    super();
    this.statusCode = _status;
    this.message=_message;
  }
}

module.exports = ExpressError;