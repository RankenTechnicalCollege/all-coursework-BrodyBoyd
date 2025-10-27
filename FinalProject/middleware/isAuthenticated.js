import { auth } from '../auth.js'

export async function isAuthenticated(req,res,next) {
  try{ 
    const session = await auth.api.getSession({headers: req.headers})

    if (!session) {
      return res.status(401).json({
        error:"Unathourized",
        message: "You must be signed in to be able to access this route"
      })
    }
    req.user = session.user;
    req.session = session.session;
    next();
  } catch(err) {
    return res.status(401).json({
      error: "unauthorized",
      message:"Invalid or expired session"
    })
  }
}