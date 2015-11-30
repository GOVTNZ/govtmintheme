#How to use

Place these files into a folder in the theme directory (*your-site/themes/govtmin/*)

**Page.php**

Add the following to the *Page_Controller*

````
init() {

		// theme path
		$themePath = 'themes/' . Config::inst()->get('SSViewer', 'theme');
		
		// js
		Requirements::javascript($themePath . '/thirdparty/jquery-2.1.4.min.js');
		Requirements::javascript($themePath . '/javascript/searchbar.js');
		
		// css
		Requirements::css($themePath . '/css/bootstrap.min.css');
		Requirements::css($themePath . '/css/screen.css');
}

// used in footer
public function CurrentYear() {
	return date('Y');
}
````

If you change the name of the theme, perform a global replace on 'govtmin' within the theme directory.
