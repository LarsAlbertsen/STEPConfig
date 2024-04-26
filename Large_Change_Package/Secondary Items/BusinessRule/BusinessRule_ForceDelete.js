/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ForceDelete",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "ForceDelete",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item", "Tree" ],
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
var allSource = new Array();
node.getReferencedByProducts().forEach(function(r) {
    logger.info("r="+r)
    var source = r.getSource()
    allSource.push(source);
    r.delete()
});


logger.info("allSource+"+allSource)
allSource.forEach(function(p){
    p.approve();
})

node.forceDelete()

}