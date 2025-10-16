import { ObjectId } from "mongodb";

const validId = (paramName) => {
  return (req,res,next) => {
    try {
      req[paramName] = new ObjectId(req.params[paramName]);
      return next();
    } catch (error) {
      return res.status(404).json({ error: 'Invalid ID format' });
    }
  }
}

export { validId };