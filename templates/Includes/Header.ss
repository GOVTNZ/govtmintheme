<div class="navbar navbar-inverse header <% if $ClassName='HomePage' %>home-header<% end_if %>" role="banner">
	<div class="container">
		<div class="headerItem row">
			<div class="col-lg-8 col-xs-7 print-logo">
				<img src="/themes/govtmin/images/print-logo.png" alt="New Zealand Government"/>
			</div>
			<div class="col-lg-8 col-xs-7 logo">
				<a href="$HomePageLink"
				   data-ga-event="click"
				   data-ga-category="Navigation"
				   data-ga-action="Header-logo"
				   data-ga-label="@attr:href"><span
					class="logo-text">New Zealand Government | Te Kawanatanga o Aotearoa</span></a>
			</div>
			<div class="mobile-search">
				<button type="button"
						class="submit btn btn-black square-corners mobile-search-toggle <% if $URLSegment == 'Search_Controller' %>active-perm<% end_if %>
							<% if $URLSegment == 'Search_Controller' %> active<% end_if %>"
						aria-label="<% if $URLSegment == 'Search_Controller' %>Hide<% else %>Show<% end_if %> search"
						aria-controls="header-search">
					<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
				</button>
			</div>
		</div>
		<div id="header-search"
			 class="header-search row mobile-hide<% if $URLSegment == 'Search_Controller' %> active<% end_if %>">
			<div role="search" class="header-search-form <% if $ClassName='HomePage' %>home-page<% end_if %>">
				<form id="search-form" action="{$BaseHref}search" class="form-inline pull-right">
					<div class="form-group">

						<div class="search-controls">
							<input name="q" class="form-control square-corners" id="searchterm"
								   value="<% if $Keyword %>$Keyword<% end_if %>"
								   type="search" autocapitalize="off" autocomplete="off" autocorrect="off"/>
                            <label for="searchterm" class="search-label entered">
                                Search <% if $Results %>results for <span id="overlay-text">$Keyword</span><% else %>
                                govt.nz<% end_if %>
                            </label>
							<button type="submit" class="submit btn btn-orange square-corners"
									aria-label="Search Govt.nz"><span class="glyphicon glyphicon-search"
																	  aria-hidden="true"></span></button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>