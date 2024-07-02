/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "EventsInMainCondition",
  "type" : "BusinessCondition",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "EventsInMainCondition",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
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
exports.operation0 = function (node) {
log("on "+node.getID());
/** @type{Product} */
var p = node;

var nonApproved = p.getNonApprovedObjects();
nonApproved.forEach(element => {
    log(p.getID()+"\t"+element)
});


function log(s) {
    logger.info("EventsInMainCondition "+s);
}


}