<!DOCTYPE html>
<html class="no-js" lang="en-NZ">
<head>
    <meta charset="utf-8"/>
    <title>$Title | NZ Government</title>
	<% if $MetaDescription %>
        <meta name="description" content="$MetaDescription">
	<% end_if %>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<% base_tag %>

	<% include TouchIcons %>

</head>

<body class="$CSSClasses" data-pagetype="$ClassName">
	<% include Header %>

	<div class="content <% if $ClassName='HomePage' %>home-content<% end_if %>" role="main">
		$Layout
	</div>

	<% include FooterStatic %>
</body>

</html>
