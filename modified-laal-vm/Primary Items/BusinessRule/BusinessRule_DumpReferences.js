/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "DumpReferences",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "DumpReferences",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
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
exports.operation0 = function (node) {


logger.info('\ngetReferences')
node.getReferences().asList().forEach(function (/** @type{Reference}*/ r) {
    logger.info("aRef Type: " + r.getLinkType() + " Target: " + r.getTarget().getID() + ' sourceID=' + r.getSource().getID() + ' isDimensionPointInherited=' + r.isDimensionPointInherited())
})

logger.info('\ngetLocalReferences')
node.getLocalReferences().asList().forEach(function (r) {
    //logger.info(r.getClass().getName())
    logger.info("lRef Type: " + r.getLinkType() + " Target: " + r.getTarget().getID() + ' sourceID=' + r.getSource().getID() + ' isDimensionPointInherited=' + r.isDimensionPointInherited())
})

logger.info('\nqueryReferences')
var refType = node.getManager().getReferenceTypeHome().getReferenceTypeByID("LanguageDependantRef")
node.queryReferences(refType).forEach(function (r) {
    //logger.info('qType: ' + r.getClass().getName())
    logger.info("qRef Type: " + r.getLinkType() + " Target: " + r.getTarget().getID() + ' sourceID=' + r.getSource().getID() + ' isDimensionPointInherited=' + r.isDimensionPointInherited())
    return true
})
}