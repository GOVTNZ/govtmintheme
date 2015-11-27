<% include Breadcrumbs %>
<% include NoScript %>
<div class="container page-content" id="toplink">
	<div class="row title-row">
		<div class="col-md-6 col-md-offset-1">
			<h1>$Title</h1>
			<% if $Summary %>
				<p class="page-description">$Summary</p>
			<% end_if %>
		</div>
	</div>

	<div class="row summary">
		<div class="col-md-6 col-md-offset-1 main-content ga-content-container">
			$Content

			$Form
		</div>
	</div>
</div>