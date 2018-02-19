var finalJson = {};

function main() {
	var root = document.querySelector(".mTreeSelection");
	var rootTitle = root.querySelector(".helpTreeHeading").innerText;
	// finalJson[rootTitle] = {
	// 	description: "timepass",
	// 	tree: recur(root)
	// };
	finalJson[rootTitle] = {
		description: "timepass"
	};
	recur(root);
}

function recur(root) {
	// var finalOutput = [];

	var children = root.childNodes;
	for (var i = 0; i < children.length; i++) {
		if (children[i].nodeType != 3 && children[i].classList.contains("setupFolder")) {
			var childTitle = children[i].querySelector(".setupSection").innerText;
			var childURL = children[i].querySelector(".setupSection").getAttribute("href");
			var desc = ajaxCall(childURL.match(/.*id=(.*)&type=.*/)[1]);
			var tempJson = {};
			// tempJson[childTitle] = {
			// 	url: childURL,
			// 	description: desc,
			// 	tree: recur(children[i].querySelector(".treeIndent"))
			// }
			// finalOutput.push(tempJson);

			finalJson[childTitle] = {
				url: childURL,
				description: desc,
			}
			recur(children[i].querySelector(".treeIndent"));


		} else if (children[i].nodeType != 3 && children[i].classList.contains("setupLeaf")) {
			var childTitle = children[i].querySelector("a").innerText;
			var childURL = children[i].querySelector("a").getAttribute("href");
			var desc = ajaxCall(childURL.match(/.*id=(.*)&type=.*/)[1]);
			var tempJson = {};
			// tempJson[childTitle] = {
			// 	url: childURL,
			// 	description: desc,
			// 	tree: null
			// };
			// finalOutput.push(tempJson);

			finalJson[childTitle] = {
				url: childURL,
				description: desc,
			}

		}
	}
	// return finalOutput;
}

function ajaxCall(url) {
	var request = {"action":"Help_HomeController","method":"getArticleData","data":[{"urlName":url,"language":"en_US","type":"HelpDocs","release":"210.17.0"}],"type":"rpc","tid":44,"ctx":{"csrf":"VmpFPSxNakF4T0Mwd01TMHhNMVF4TnpvMU9Eb3pNaTR4T0ROYSxUNDh2ZURITXpITTBZRU52UzlBNkg0LE9EVTFZVFJs","vid":"06630000001hrjK","ns":"","ver":35}};

	var oReq = new XMLHttpRequest();
	oReq.open("POST", "https://help.salesforce.com/apexremote", false);
	oReq.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	oReq.setRequestHeader("X-User-Agent", "Visualforce-Remoting");
	oReq.setRequestHeader("Content-Type", "application/json");

	var output;
	oReq.onreadystatechange = function () {
		if (oReq.status == 200 && oReq.readyState == 4) {
			output = JSON.parse(oReq.responseText)[0].result.description;
		}
	}
	oReq.send(JSON.stringify(request));
	return output;
}
