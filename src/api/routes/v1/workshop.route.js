const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/workshop.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");
const {
  listWorkshop,
  createWorkshop,
  updateWorkshop,
} = require("../../validations/workshop.validation");

const router = express.Router();

router
  .route("/")
  /**
   * @api {get} v1/workshop List All Workshop
   * @apiDescription Get a list of Workshop
   * @apiVersion 1.0.0
   * @apiName ListUsers
   * @apiGroup Workshop
   * @apiPermission public
   *
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Workshop per page
   * @apiParam  {String}             [name]       Workshop name
   * @apiParam  {String=user,admin}  [role]       User's Coach
   *
   * @apiSuccess {Object[]} List of Workshop.
   *
   */
  .get(validate(listWorkshop), controller.getAll)
  /**
   * @api {post} v1/workshop Create Workshop
   * @apiDescription Create a new Workshop
   * @apiVersion 1.0.0
   * @apiName CreateWorkshop
   * @apiGroup Workshop
   * @apiPermission admin-coach
   *
   * @apiHeader {String} Authorization   User's access token
   *
   *
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(), validate(createWorkshop), controller.create);

router
  .route("/:workshopId")
  /**
   * @api {put} v1/workshop/:id Update Workshop
   * @apiDescription Update Workshop data
   * @apiVersion 1.0.0
   * @apiName UpdateWorkshop
   * @apiGroup Workshop
   * @apiPermission ADMIN-COACH
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(authorize(), validate(updateWorkshop), controller.update)

  /**
   * @api {DELETE} v1/workshop/:id Delete workshop
   * @apiDescription Delete a workshop
   * @apiVersion 1.0.0
   * @apiName DeleteWorkshop
   * @apiGroup Workshop
   * @apiPermission ADMIN-COACH
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
  .delete(authorize(), controller.delete);

module.exports = router;
