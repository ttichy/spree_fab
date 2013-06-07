Spree::HomeController.class_eval do

  def index
  	@searcher = Spree::Config.searcher_class.new(params)  
    @products = @searcher.retrieve_products.page(1).per(6)

    slider = Spree::Taxon.where(:name => 'Slider').first
    @slider_products = slider.products.active if slider

    featured = Spree::Taxon.where(:name => 'Featured').first
    @featured_products = featured.products.active if featured

    latest = Spree::Taxon.where(:name => 'Latest').first
    @latest_products = latest.products.active if latest

    respond_with(@products)
  end

  def find_more_products
    @searcher = Spree::Config.searcher_class.new(params)  
    @products = @searcher.retrieve_products.page(params[:page]).per(3)    
    render :layout => false
  end

end