import {connect} from "../database.js"

export const hasPermission = (permission) => {
  return async (req,res,next) => {
    try {
      const userRoles = req.user.role || [];

      if (!Array.isArray(userRoles) || userRoles.length === 0) {
        return res.status(403).json({ error: "No roles assigned to user" })
      }
      const db = await connect()

      const roleDocuments = await db.collection('role').find({ role: { $in: userRoles }}).toArray()

      const hasRequiredPermission = roleDocuments.some(roleDoc => { return roleDoc.permissions && roleDoc.permission[permission] === true})
      if (!hasRequiredPermission) {
        return res.status(403).json({error: `Permission denied.  Requires permission: ${permission}`})
      }
      next();
    } catch(err){
      return res.status(500).json({ error: 'Error checking permissions' });
    }
  }
}

export const hasAnyPermissions = (permissions) => {
  return async (req,res,next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const userRoles = req.user.role || [];

      if (!Array.isArray(userRoles) || userRoles.length === 0) {
        return res.status(403).json({ error: 'no roles assigned to user' })
      }

      const db = await connect();
      const rolesCollection = db.collection('role');

      const roleDocuments = await rolesCollection.find({ role: { $in: userRoles }}).toArray();

      const hasRequiredPermission = roleDocuments.some(roleDoc => { if (!roleDoc.permissions) return false
        return permissions.some(permission => roleDoc.permissions[permission] === true)
      });

      if (!hasRequiredPermission) {
        return res.status(403).json({error: `Permission denied. Required permission (any of): ${permissions.join(', ')}`})
      }
      next();
    } catch(err) {
      return res.status(500).json({ error: 'Error checking permissions' })
    }
  }
}

export const hasAllPermissions = (permissions) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const userRoles = req.user.role || [];
      
      if (!Array.isArray(userRoles) || userRoles.length === 0) {
        return res.status(403).json({ error: 'No roles assigned to user' });
      }

      const db = await connect();
      const rolesCollection = db.collection('role');

      const roleDocuments = await rolesCollection
        .find({ role: { $in: userRoles } })
        .toArray();

      const userPermissions = new Set();
      roleDocuments.forEach(roleDoc => {
        if (roleDoc.permissions) {
          Object.entries(roleDoc.permissions).forEach(([permission, value]) => {
            if (value === true) {
              userPermissions.add(permission);
            }
          });
        }
      });

      const hasAllRequired = permissions.every(permission => 
        userPermissions.has(permission)
      );

      if (!hasAllRequired) {
        const missingPermissions = permissions.filter(p => !userPermissions.has(p));
        return res.status(403).json({ 
          error: `Permission denied. Missing permissions: ${missingPermissions.join(', ')}` 
        });
      }

      next();
    } catch (error) {
      console.error('Permission check error:', error);
      return res.status(500).json({ error: 'Error checking permissions' });
    }
  };
};