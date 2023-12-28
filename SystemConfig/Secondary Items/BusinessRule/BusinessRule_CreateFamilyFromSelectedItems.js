/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateFamilyFromSelectedItems",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "CreateFamilyFromSelectedItems",
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
    "contract" : "WebUiContextBind",
    "alias" : "web",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "FamilyObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "Family Variant",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "VariantObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Variant",
    "description" : null
  }, {
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
exports.operation0 = function (web,FamilyObjType,VariantObjType,node) {
var selection = web.getSelection();
logger.info("node="+node.getTitle());
logger.info("selection="+selection);

var candidates = new java.util.ArrayList();
for (var i=0; i<selection.size(); i++) {
	var currentNode = selection.get(i);
	logger.info("\ncurrentNode ["+currentNode.getName()+"]");
	if (currentNode.getName()!=null) {
		var nameParts = currentNode.getName().split(" ");
		if (i==0) {
			for (var j=0; j<nameParts.length; j++) {
				candidates.add(nameParts[j].trim());
			}
		}
		else {
			logger.info("candidates="+candidates);
			var curNameParts = new java.util.HashSet();
			for (var j=0; j<nameParts.length; j++) {
				curNameParts.add(nameParts[j].trim());
			}
			logger.info("curNameParts="+curNameParts);
			for (var j=0; j<candidates.size(); j++) {
				if (candidates.get(j)!=null) {
					if (!curNameParts.contains(candidates.get(j))) {
						logger.info("\tremove "+candidates.get(j));
						candidates.set(j, null);
					}
				}
			}
			/*if (familyName.size()==0) {
				for (var j=0; j<nameParts.length; j++) {
					familyName.add(nameParts[j].trim());
				}
				logger.info("Initial familyName="+familyName);
			}
			else {
				logger.info("before checking familyName="+familyName +" with "+n.getName());
	
				var l = new java.util.ArrayList();
				for (var j=0; j<familyName.size(); j++) {
					var checkName = familyName.get(j);
					//var nameParts = n.getName().split(" ");
					logger.info("checkName "+j+" "+checkName+" in "+n.getName() +" partsSize="+nameParts.length);
	
				}
				familyName = l;
				logger.info("after checking familyName="+familyName +" with "+n.getName());
	
			}*/
		}
	}
}

logger.info("final candidates ="+candidates);
var newName = "";
for (var i=0; i<candidates.size(); i++) {
	var s = candidates.get(i);
	if (s!=null && !s.equalsIgnoreCase("size")) {
		newName = newName + s + " ";
	}
}
newName = newName.trim();
logger.info("newName = ["+newName+"]");
if (newName.length>0) {
	logger.info("Create Family");
	var newFamily = node.createProduct(null, "Family");
	newFamily.setName(newName);
	for (var i=0; i<selection.size(); i++) {
		//selection.setParentAndObjectType(node, VariantObjType);
		selection.get(i).setParent(newFamily);
		selection.get(i).setObjectType(VariantObjType);
	}
}
}