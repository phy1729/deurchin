"use strict";

chrome.webRequest.onBeforeRequest.addListener(
	(details) => {
		const isUrchin = (param) => param.startsWith("utm_");
		const [base, rest] = details.url.split("?");

		if (!rest)
			return;

		const [query, fragment] = rest.split("#");
		const params = query.split("&");

		if (params.some(isUrchin))
			return {"redirectUrl": `${base}?${params.filter(p => !isUrchin(p)).join("&")}${fragment ? `#${fragment}` : ""}`};

	},
	{"urls": ["<all_urls>"]},
	["blocking"]
	);
