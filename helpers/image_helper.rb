module ImageHelper
  def fancybox_image(href, alt)
    %Q{<p><a class="fancybox" rel="group" href="#{href}" title="#{alt}"><img class="post" src="#{href}" alt="#{alt}"/></a></p>}
  end
end