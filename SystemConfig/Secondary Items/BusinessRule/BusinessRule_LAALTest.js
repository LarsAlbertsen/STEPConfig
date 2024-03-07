/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "LAALTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "LAALTest",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager) {
// How to use Intellisense


/// STEP Intellisense
/// <reference path="/Users/laal/.step/jsdoc.js" />
/** @type {Manager} */
var manager = manager;
/// STEP Intellisense


var curUser = manager.getCurrentUser();


var method =curUser.getClass().getMethod("getObjectType");
logger.info("Got Method");

var oo = method.invoke(curUser);
logger.info("Back with"+oo);
//logger.info(method.invoke(null, "test"));
//logger.info(method.invoke(null, ""));

//logger.info("ObjType="+curUser.getObjectType());
logger.info("curUser="+curUser.getName());
// How dow this workmsklajls

}
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation1 = function (node) {
var name = node.getName();

}