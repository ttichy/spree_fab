SpreeFab
==========

SpreeFab also use SpreeFancy features in it.

To install it first we need the basic spree app to be installed.

Installation for Spree
======================

Put these gems to your basic rails app:

```
$ gem 'spree', '1.3.2'
$ gem 'spree_gateway', :github => 'spree/spree_gateway', :branch => '1-3-stable'
$ gem 'spree_auth_devise', :github => 'spree/spree_auth_devise', :branch => '1-3-stable'
```

Once you've done that, then you can install these gems using this command:

```
$ bundle install
```

Use the install generator to set up Spree:

```
$ rails g spree:install
```

At this point, if you are using spree_auth_devise you will need to change this line in config/initializers/spree.rb:

```
$ Spree.user_class = "Spree::LegacyUser"
```

To this:

```
$ Spree.user_class = "Spree::User"
```

You can always perform the steps later by using these commands.

```
$ bundle exec rake db:migrate
$ bundle exec rake db:seed
$ bundle exec rake spree_sample:load
```


Installation for SpreeFab
=========================

Put this gem in your gem file:

```
$ gem 'spree_fab', :github => 'deepaktyagi3i36/spree_fab'
```

Then install the gem via Bundler:

```
$ bundle install
```

Finally, you need to run spree_fab's installer:

```
$ bundle exec rails g spree_fab:install
```


This copies over the migrations from the extension into your application, and sets up asset pipeline require statements for `spree_fab`.

Usage
=====

This theme alters the look and feel of the spree frontend, using the [bxSlider](http://bxslider.com/) jQuery plugin to present products on the front page. Products can appear in any of the 3 sliders: "Slider", "Featured" and "Latest". The plugin adds 3 taxonomies to control which products appear in the sliders. To try these out, sign in to the backend and try adding/removing the taxonomies to/from products and refresh the store front page to see how this affects the sliders.

This is achieved by overriding the index action in the Spree::HomeController using a Decorator. Have a look at the [Decorators Guide](http://guides.spreecommerce.com/developer/tutorials/decorators/) for more information about using decorators to customize your application's logic.

Creating Your Own Extensions
============================

To learn more about creating your own extensions, have a look in the [Spree extensions tutorial](http://guides.spreecommerce.com/developer/extensions.html)

Copyright (c) 2012-2013 Spree Commerce Inc., released under the New BSD License
