import {connect} from "../database.js"
import { ObjectId } from "mongodb";
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
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const userRoles = req.user.role || [];

      if (!Array.isArray(userRoles) || userRoles.length === 0) {
        return res.status(403).json({ error: 'no roles assigned to user' });
      }

      const db = await connect();
      const rolesCollection = db.collection('role');

      const roleDocuments = await rolesCollection
        .find({ role: { $in: userRoles } })
        .toArray();

      const userPermissions = new Set();
      roleDocuments.forEach(roleDoc => {
        if (!roleDoc.permissions) return;
        Object.entries(roleDoc.permissions).forEach(([perm, value]) => {
          if (value === true) {
            userPermissions.add(perm);
          }
        });
      });
      req.user.permissions = Array.from(userPermissions);
      

      const hasRequiredPermission = permissions.some(p =>
        userPermissions.has(p)
      );

      if (!hasRequiredPermission) {
        return res.status(403).json({
          error: `Permission denied. Required permission (any of): ${permissions.join(', ')}`
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({ error: 'Error checking permissions' });
    }
  };
};

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

      // Attach permissions to req.user
      req.user.permissions = Array.from(userPermissions);

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

export const canEditBug = async (req, res, next) => {
  try {
    const db = await connect();
    const bugsCollection = db.collection('bugs');

    const bugId = req.params.bugId;
    const bug = await bugsCollection.findOne({ _id: new ObjectId(bugId) });

    if (!bug) {
      return res.status(404).json({ error: "Bug not found" });
    }

    const user = req.user;
    const userEmail = user.email;
    const userPermissions = user.permissions || []; // however you attach them

    const canEditIfAssignedTo = userPermissions.includes("canEditIfAssignedTo");
    const canEditMyBug = userPermissions.includes("canEditMyBug");
    const canEditAnyBug = userPermissions.includes("canEditAnyBug");

    // 1. Full access
    if (canEditAnyBug) {
      return next();
    }

    // 2. Assigned-to rule
    if (canEditIfAssignedTo && bug.assignedTo === userEmail) {
      return next();
    }

    // 3. Created-by rule
    if (canEditMyBug && bug.createdBy === userEmail) {
      return next();
    }

    return res.status(403).json({
      error: "You do not have permission to edit this bug"
    });

  } catch (err) {
    console.error("Bug edit permission error:", err);
    res.status(500).json({ error: "Server error checking bug permissions" });
  }
};