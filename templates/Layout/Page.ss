<% include Breadcrumbs %>
<div class="feature-image <% if $URLSegment == 'home' %>home<% end_if %>">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
				<% if $URLSegment == 'home' %>
                    <h1 class="feature-text">
                        Kia ora. Govt.nz is your guide to finding and using government services.
                    </h1>
				<% end_if %>
            </div>
        </div>
    </div>
</div>

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