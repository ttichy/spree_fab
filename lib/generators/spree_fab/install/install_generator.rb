module SpreeFab
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path('../../../../..', __FILE__)

=begin
      def add_javascripts
        append_file 'app/assets/javascripts/store/all.js', "//= require store/spree_fab\n"
        append_file 'app/assets/javascripts/admin/all.js', "//= require admin/spree_fab\n"
        append_file 'app/assets/javascripts/store/all.js', "//= require store/custom_style.js\n"
        append_file 'app/assets/javascripts/store/all.js', "//= require store/magiczoom.js\n"
      end


      def add_routes
        route "match '/spree/home/find_more_products' => 'spree/home#find_more_products'\n"
      end


      def add_directory
        directory 'app', 'app'
      end

      def add_stylesheets
        inject_into_file 'app/assets/stylesheets/store/all.css', " *= require store/spree_fab\n", :before => /\*\//, :verbose => true
        inject_into_file 'app/assets/stylesheets/store/all.css', " *= require store/custom_style\n", :before => /\*\//, :verbose => true
        inject_into_file 'app/assets/stylesheets/store/all.css', " *= require store/magiczoom\n", :before => /\*\//, :verbose => true
        inject_into_file 'app/assets/stylesheets/admin/all.css', " *= require admin/spree_fab\n", :before => /\*\//, :verbose => true
      end

      def add_migrations
        run 'bundle exec rake railties:install:migrations FROM=spree_fab'
      end
=end

=begin
      def run_migrations
         res = ask 'Would you like to run the migrations now? [Y/n]'
         if res == '' || res.downcase == 'y'
           run 'bundle exec rake db:migrate'
         else
           puts 'Skipping rake db:migrate, don\'t forget to run it!'
         end
      end
=end

    end
  end
end