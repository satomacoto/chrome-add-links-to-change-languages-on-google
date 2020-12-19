function replaceUrlParam(url, paramName, paramValue) {
  if (paramValue == null) {
    paramValue = "";
  }
  var pattern = new RegExp("\\b(" + paramName + "=).*?(&|#|$)");
  if (url.search(pattern) >= 0) {
    return url.replace(pattern, "$1" + paramValue + "$2");
  }
  url = url.replace(/[?#]$/, "");
  return (
    url + (url.indexOf("?") > 0 ? "&" : "?") + paramName + "=" + paramValue
  );
}

function addLink() {
  var d = document.querySelector("#hdtbMenus > div");
  for (var key in addLink.LANG) {
    var url = location.href;
    url = replaceUrlParam(url, "lr", "lang_" + key);

    var span = document.createElement("span");
    var a = document.createElement("a");
    a.className = "hdtb-mn-hd";

    a.innerText = addLink.LANG[key];
    a.href = url;

    span.append(a);
    d.append(span);
  }
}

function init() {
  var func = function () {
    setTimeout("addLink()", 10);
  };
  func();
}

chrome.extension.sendRequest(
  {
    method: "getLang",
  },
  function (response) {
    addLink.LANG = response.lang;
    init();
  }
);
