
Haml::TempleEngine.disable_option_validator!

Time.zone = "Europe/Oslo"

activate :blog do |blog|
  # blog.prefix = "blog"
  # blog.permalink = ":year/:month/:day/:title.html"
  blog.sources = "blog/:year/:month/:day-:title.html"
  # blog.taglink = "tags/:tag.html"
  # blog.layout = "layout"
  blog.summary_separator = /READMORE/
  blog.summary_length = 500
  # blog.year_link = ":year.html"
  # blog.month_link = ":year/:month.html"
  # blog.day_link = ":year/:month/:day.html"
  blog.default_extension = ".md.erb"

  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  blog.paginate = true
  blog.per_page = 10
  # blog.page_link = "page/:num"
end

activate :ogp do |ogp|
  ogp.namespaces = {
    fb: data.ogp.fb,
    # from data/ogp/fb.yml
    og: data.ogp.og
    # from data/ogp/og.yml
  }
  ogp.base_url = 'https://www.chrissearle.org/'
  ogp.blog = true
end

page "/feed.xml", :layout => false
page "blog/*", :layout => :article_layout

activate :directory_indexes

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :build_dir, 'build/site'

set :images_dir, 'images'

set :markdown_engine, :redcarpet

activate :syntax

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css
  
  # Minify Javascript on build
  activate :minify_javascript
  
  # Enable cache buster
  # activate :cache_buster
  
  # Use relative URLs
  # activate :relative_assets
  
  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher
  
  # Or use a different image path
  # set :http_path, "/Content/images/"
end
