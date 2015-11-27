<li class="searchresult-item">
	<h2><a href="$Link">$Title</a></h2>

	<p class="inline-details"><% loop Pages(0) %><%if First %><span class="visuallyhidden">Found in </span><% else %>
		<span class="icon-right-open-mini"></span><span
		class="visuallyhidden"> / </span><% end_if %>$MenuTitle<% end_loop %></p>

	<p class="ga-content-container">
		<% if $Summary %>
			$Summary
		<% else_if $MetaDescription %>
			$MetaDescription
		<% else %>
			$Content.BigSummary(20)
		<% end_if %>
	</p>
</li>
