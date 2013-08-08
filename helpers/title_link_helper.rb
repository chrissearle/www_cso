module TitleLinkHelper
  def short_title(title)
    return title if title.length <= 40
    
    title[0..40].gsub(/\s\w+$/, '...')
  end
end