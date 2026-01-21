const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 
 asyncHandler ✅
↓
error middleware ✅
↓
custom Error class ✅
↓
response format ✅
↓
controller/service split
↓
auth & validation

 
 */