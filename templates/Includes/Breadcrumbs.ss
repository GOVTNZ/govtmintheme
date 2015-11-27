<% if $ClassName == "HomePage" %>
	<%-- No header on these pages --%>
<% else %>
	<% if $Pages %>
		<div class="banner-link breadcrumbs <% if $URLSegment == 'Search_Controller' %>show-search<% end_if %>">
			<div class="container">
				<nav role="navigation" class="nav-breadcrumbs inline-details" aria-label="Breadcrumbs">
					<ol>
						<% loop $Pages %>
							<% if not $First && $Last %>
								<li>$MenuTitle</li>
							<% else %>
								<li>
									<a href="$Link">$MenuTitle</a>
									<span aria-hidden="true">/</span>
								</li>
							<% end_if %>
						<% end_loop %>
					</ol>
				</nav>
			</div>
		</div>
	<% end_if %>
<% end_if %>