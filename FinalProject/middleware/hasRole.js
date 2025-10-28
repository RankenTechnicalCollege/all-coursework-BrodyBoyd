export const hasRose = (allowedRoles) => {
  return (req,res,next) => {
    const userRoles = req.user.role || [];

    if (!Array.isArray(userRoles) || userRoles.length === 0) {
      return res.status(403).json({error: "This user has no roles"})
    }

    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]

    const hasAllowedRole = userRoles.some(role => rolesArray.includes(role));

    if(!hasAllowedRole) {
      return res.status(403).json({error: `Access denied. Requires role(s) are: ${rolesArray.join(', ')}`})
    }
    next();
  }
}