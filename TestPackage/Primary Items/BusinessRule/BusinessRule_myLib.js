/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "myLib",
  "type" : "BusinessLibrary",
  "setupGroups" : [ "Libraries" ],
  "name" : "myLib",
  "description" : null,
  "scope" : null,
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : null,
  "dependencies" : [ {
    "libraryId" : "secondLibrary",
    "libraryAlias" : "lib"
  } ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessLibrary",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
function test() {
	var x = 2;
	return x;
}

/**
 * 
 * @param {Product} myNode 
 * @param {string} myAttrID 
 * @returns {string}
 */
function getMyValue(myNode, myAttrID) {
	return "a value"
}
/*===== business library exports - this part will not be imported to STEP =====*/
exports.test = test
exports.getMyValue = getMyValue