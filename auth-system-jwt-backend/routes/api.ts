import { Router } from "express";

import isAdmin from "../middleware/isAdmin";
import apiController from "../controllers/apiController";
import isAuthenticated from "../middleware/isAuthenticated";

const router: Router = Router();

/**
 * Get session token.
 * @route GET /session
 * @group Authentication - Operations for user authentication
 * @returns {object} 200 - Session token
 * @returns {object} 404 - User not found
 */
router.get("/session", isAuthenticated, apiController.Token);

/**
 * Get admin session token.
 * @route GET /admin-session
 * @group Authentication - Operations for user authentication
 * @returns {object} 200 - Admin session token
 * @returns {object} 404 - User not found
 */
router.get("/admin-session", isAdmin, apiController.AdminToken);

/**
 * Get user list.
 * @route GET /user-list
 * @group User - Operations related to users
 * @returns {object[]} 200 - List of users
 */
router.get("/user-list", isAuthenticated, apiController.UserList);

/**
 * Delete account.
 * @route DELETE /delete-account
 * @group Account - Operations related to user accounts
 * @returns {string} 404 - Account not found
 */
router.delete("/delete-account", isAuthenticated, apiController.DeleteAccount);

/**
 * Edit account email.
 * @route PUT /edit-account-email
 * @group Account - Operations related to user accounts
 * @param {string} newEmail.body.required - New email address
 * @returns {string} 400 - Missing required fields
 */
router.put(
  "/edit-account-email",
  isAuthenticated,
  apiController.EditAccountEmail
);

export default router;
