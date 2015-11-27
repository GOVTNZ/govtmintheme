<div class="footer navbar" aria-label="Footer" role="contentinfo">
	<div class="container">
		<div class="row">

		<% with $Footer %>
			<% loop $Columns %>

			<div class="col-md-4">
				<div class="info-section">
					<h2 class="imitate-h3">$Title</h2>
					<ul>

					<% loop $Links %>

						<li><a href="$URL"<% if $ExtraClass %> class="$ExtraClass"<% end_if %>><% if $Icon %>
							<i class="fa $Icon" aria-hidden="true"></i> <% end_if %>
							$Title</a>
						</li>

					<% end_loop %>

					</ul>
				</div>
			</div>

			<% end_loop %>
		<% end_with %>

			<div class="col-md-4">
				<div class="to-top-link">
					<p><a href="#toplink"><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span> Back
						to top</a></p>
				</div>
			</div>
		</div>
		<div class="row footer-push">
			<div class="col-md-3 footer-icons">
				<a href="$HomePageLink" class="ga-track-logo-footer-aog">
					<img src="{$ThemeDir}/images/AoG_logo_footer.png" alt="New Zealand Government" height="20"
						 width="201"/>
					<img class="print hidden" src="{$ThemeDir}/images/newzealand-government-banner.png" alt="New Zealand Government" height="20"
						 width="201"/>
				</a>

				<p class="copyright">Crown Copyright $CurrentYear</p>
			</div>
			<div class="col-md-1 copyright-icons">
				<a href="http://creativecommons.org/licenses/by/3.0/nz/"><img src="{$ThemeDir}/images/cc_icons.png"
																			  alt="Creative Commons Licence 3.0 New Zealand License (External site link)" height="40" width="85" /></a>
			</div>
			<div class="col-md-8 footer-licence">
				<p class="licence">Unless indicated otherwise, all content on <span
					property="http://purl.org/dc/terms/title">Govt.nz</span> is licensed for re-use under a <a
					href="http://creativecommons.org/licenses/by/3.0/nz/">Creative
					Commons Attribution 3.0 New Zealand Licence</a></p>
			</div>
		</div>
	</div>
</div>
