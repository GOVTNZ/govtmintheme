var div = document.createElement("div");
div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
if (isIeLessThan9 = (div.getElementsByTagName("i").length == 1)) {
	var src = [
		'themes/govtmin/javascript/html5shiv.min.js',
		'themes/govtmin/javascript/respond.min.js'
	];
	for (var ipos = 0; ipos < src.length; ipos++) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = src[ipos];
		head.appendChild(script);
	}
	var nav = document.createElement('nav');
}