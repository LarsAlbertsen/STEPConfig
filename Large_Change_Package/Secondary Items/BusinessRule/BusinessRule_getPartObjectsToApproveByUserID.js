/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "getPartObjectsToApproveByUserID",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "getPartObjectsToApproveByUserID",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "curNode",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (curNode,logger) {

var result = getPartObjectsToApproveByUserID(curNode.getManager(), curNode, logger, "LAAL");
logger.info("result="+result);

result.forEach(function(x) {
	logger.info(x);
});

/**
 * 
 * @param {Manager} step
 * @param {WorkspaceAwareRevisableNode} node
 * @param {Logger} logger
 * @param {String} userID
 * @returns {HashSet} The Part Objects to Approve for the user
 */
function getPartObjectsToApproveByUserID(step, node, logger, userID)
{
    var setNonApprovedObjects = node.getNonApprovedObjects();
    var setPartobjectsToApprove = new java.util.HashSet();
    var getEditRevision = null;
    try
    {
        getEditRevision = node.getClass().getSuperclass().getSuperclass().getSuperclass().getSuperclass().getDeclaredMethod("getEditRevision", com.stibo.core.domain.partobject.PartObject);
    }
    catch(e)
    {
        logger.warning("Could not found Method getEditRevision(). "+e.toString());
        return setPartobjectsToApprove;
    }
    for(var it = setNonApprovedObjects.iterator(); it.hasNext();)
    {
        var partObject = it.next();
        
        if (partObject instanceof com.stibo.core.domain.partobject.AttributeLinkPartObject ||
           partObject instanceof  com.stibo.core.domain.partobject.datacontainertypelink.DataContainerTypeLinkPartObject ||
           partObject instanceof com.stibo.core.domain.partobject.TablePartObject || 
           partObject instanceof com.stibo.core.domain.partobject.TableTextsPartObject)
        {
            //continue;
        }
         
        var editRevision = getEditRevision.invoke(node, partObject);
        if (editRevision)
        {
            var revisionUserID = editRevision.getUserID();
            logger.info("PartObject "+partObject.toString()+" was edited by user "+revisionUserID);
            if(revisionUserID+"" == userID+"")
            {
                setPartobjectsToApprove.add(partObject);
            }
        }
        
    }
    return setPartobjectsToApprove;
} 
}