/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "AutoUpdateEP",
  "type" : "BusinessAction",
  "setupGroups" : [ "TrackChanges" ],
  "name" : "Auto Update ChangePackage",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
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
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
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
exports.operation0 = function (node,logger,manager) {
logger.info("AutoUpdateEP " + node)


if (node != null) {
	logger.info("AutoUpdateEP " + node.getID());

	/** @type{ChangePackageHome} */
	var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome)
	var cp = cpHome.getChangePackageByID("AutoUpdated")

	if (!isOpen(cp)) {
		log.info("AddToChangePackage Reopen")
		cp.reOpen()
	}

	cp.addItem(node)

	/*
	if (node.getManager().getCurrentWorkspace().getID().equals("Approved")) {
		logger.info("Creating main node");
		var mainManager = node.getManager();
		
		mainManager.executeInWorkspace("Main", function (mainManager) {
			mainManager.
			var mainNode = mainManager.getObjectFromOtherManager(node);
			handleNode(mainNode);
			return;
		});
	}
	else {
		handleNode(node);
	}*/
}


/** @type{ChangePackageHome} 

var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome)
var cp = cpHome.getChangePackageByID("modified-laal-vm")

if (!isOpen(cp)) {
	log.info("AddToChangePackage Reopen")
	cp.reOpen()
	log.info("AddToChangePackage reopen done")
}

removeDeletedItems(cp)


var currentItems = getCurrentItems(cp)

var didAdd = false;
var it = batch.getEvents().iterator()
while (it.hasNext()) {
	var e = it.next()
	var n = e.getNode()

	if (!currentItems.contains(n.getURL())) {
		logger.info("AddToChangePackage adding new item " + n.getURL());
		cp.addItem(n)
		currentItems.add(n.getURL())
		didAdd = true
	}
}

if (isOpen(cp)) {
	logger.info("AddToChangePackage after " + getCurrentItems(cp))
	log.info("AddToChangePackage going to seal")
	cp.sealPackage("Auto Seal")
	log.info("AddToChangePackage seal done")
}*/

/**
 * 
 * @param {ChangePackage} pCP 
 */
function removeDeletedItems(pCP) {
	var allItems = pCP.getPrimaryItems();
	allItems.toArray().forEach(function (item) {
		if (item != null) {
			var n = pCP.getManager().getNodeFromURL(item);
			if (n == null) {
				logger.info("AddToChangePackage.removeDeletedItems item in package is deleted " + item)
				pCP.removeItem(item)
			}
		}
	})
}


/**
 * 
 * @param {ChangePackage} pCP 
 * @returns {JavaUtilSet}
 */
function getCurrentItems(pCP) {
	var result = new java.util.HashSet()
	var allItems = pCP.getPrimaryItems();

	allItems.toArray().forEach(function (item) {
		if (item != null) {
			var n = pCP.getManager().getNodeFromURL(item);
			if (n != null) {
				//logger.info("AddToChangePackage adding "+n.getID())
				result.add(n.getURL())
			}
			else {
				logger.info("AddToChangePackage item in package is still deleted " + item)
			}
		}
	})
	return result
}

/**
 * 
 * @param {ChangePackage} pCP 
 * @returns {boolean}
 */
function isOpen(pCP) {
	var state = pCP.getValue("ChangePackageState").getSimpleValue()
	logger.info("AddToChangePackage state = " + state)
	if ("Change Package (Sealed)".equals(state)) {
		logger.info("isOpen(" + pCP.getName() + " false")
		return false
	}
	logger.info("isOpen(" + pCP.getName() + " true")
	return true;
}




/**
 * @param {StiboNode} pNode 
 */
function handleNode(pNode) {
	if (pNode != null) {
		var url = pNode.getURL();
		logger.info("SystemChangeGenerateEvent Type=" + pNode.getClass().getName() + " URL=" + url);
		var type = pNode.getClass().getSimpleName().replace("Front", "").replace("Impl", "");
		var id = pNode.getID();
		var user = pNode.getManager().getCurrentUser();
		var configRoot = pNode.getManager().getClassificationHome().getClassificationByID("SystemChangesRoot");

		var now = new java.util.Date();

		var userDateClassification = getUserClassification2(configRoot, user, now)

		var changeName = type + " ID=" + id;
		var existingChanges = userDateClassification.getChildren();
		for (var i = 0; i < existingChanges.size(); i++) {
			if (changeName.equals(existingChanges.get(i).getName())) {
				logger.info("Found existing change for " + existingChanges.get(i).getTitle());
				return;
			}
		}
		var c = userDateClassification.createClassification("", SystemChangeObjType.getID());
		c.setName(changeName);
	}
	else {
		logger.info("SystemChangeGenerateEvent No Node");
	}
}

/**
 * get or create classification for the give user on the given date organized in data hierarchy
 * 
 * @param {Classification} pConfigRoot 
 * @param {User} pUser 
 * @param {JavaLangString} pNow 
 * @returns {Classification} Classification
 */
function getUserClassification2(pConfigRoot, pUser, pNow) {
	var formatter = new java.text.SimpleDateFormat("yyyy/MM/dd");
	var dateString = formatter.format(pNow);

	var id = "SystemChange " + dateString + "/" + pUser.getID();
	var userCls = pConfigRoot.getManager().getClassificationHome().getClassificationByID(id);
	if (userCls == null) {
		//logger.info("Did not userCls ["+id+"]");
		var dateCls = getDateClassification2(pConfigRoot, pNow);
		userCls = dateCls.createClassification(id, SystemChangeUserObjType.getID());
		userCls.setName(pUser.getTitle());
	}
	return userCls;
}

/**
 * 
 * @param {Classification} pConfigRoot 
 * @param {JavaLangString} pNow 
 * @returns {Classification} Classification
 */
function getDateClassification2(pConfigRoot, pNow) {
	//var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
	var formatter = new java.text.SimpleDateFormat("yyyy/MM/dd");
	var dateString = formatter.format(pNow);

	var id = "SystemChange " + dateString;
	var dateCls = pConfigRoot.getManager().getClassificationHome().getClassificationByID(id);
	logger.info("Found date " + dateCls);
	if (dateCls == null) {
		logger.info("Create date [" + id + "]");
		var monthCls = getMonthClassification2(pConfigRoot, pNow);
		dateCls = monthCls.createClassification(id, SystemChangeDateObjType.getID());
		dateCls.setName(dateString);
		logger.info("Created day");
	}
	return dateCls;
}

/**
 * 
 * @param {CLassification} pConfigRoot 
 * @param {JavaLangString} pNow 
 * @returns {Classification} 
 */
function getMonthClassification2(pConfigRoot, pNow) {
	var formatter = new java.text.SimpleDateFormat("yyyy/MM");
	var dateString = formatter.format(pNow);

	var id = "SystemChange " + dateString;
	var monthCls = pConfigRoot.getManager().getClassificationHome().getClassificationByID(id);
	logger.info("Found month " + monthCls);
	if (monthCls == null) {
		logger.info("Create month [" + id + "]");
		var yearCls = getYearClassification2(pConfigRoot, pNow);
		logger.info("Got year - creating [" + id + "]");
		monthCls = yearCls.createClassification(id, SystemChangeMonthObjType.getID());
		monthCls.setName(dateString);
		logger.info("Create month");
	}
	return monthCls;
}

/**
 * 
 * @param {Classification} pConfigRoot 
 * @param {JavaLangString} pNow 
 * @returns {Classification} 
 */
function getYearClassification2(pConfigRoot, pNow) {
	//var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
	var formatter = new java.text.SimpleDateFormat("yyyy");
	var dateString = formatter.format(pNow);

	var id = "SystemChange " + dateString;
	logger.info("Look for [" + id + "]");
	var yearCls = pConfigRoot.getManager().getClassificationHome().getClassificationByID(id);
	logger.info("Found " + yearCls);
	if (yearCls == null) {
		logger.info("Create year [" + id + "] below [" + SystemChangesRoot.getID() + "]");
		yearCls = pConfigRoot.createClassification(id, SystemChangeYearObjType.getID());
		yearCls.setName(dateString);
		logger.info("Created year");
	}
	return yearCls;
}
}