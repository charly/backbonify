# Backbonify
A generator for Backbone in Rails >= 3.1. The Language is javascript (no coffee)
and the template engine is (only) handlebars wraped in haml! However this generator takes advantage of hooks (brought by yehuda in rails 3) so it is easy to add other template
engines and so on...

## Warning
This is not a general purpose generator. I made it to fit my needs. And its quit beta.
But hey it's just generators, not code...

## Install with Rails 3.1
In your Gemfile
    gem "backbonify", :git => "http://github.com/charly/backbonify"

## Usage
In your console
    rails g backbonify:install
    rails g backbonify:scaffold Model field:type field:type

## More Usage
backbonify:scaffold hooks on those (sub) generators. You can also cherry pick them!
  rails g backbonify:model Model field:type ...
  rails g backbonify:router Model
  rails g backbonify:view Model
  rails g backbonify:template Model field:type ...

## TODO
test!!! options & more doc on what files it generates....

## Dependencies for haml and handlebars
Include them in your Gemfile
    gem 'handlebars_assets'
    gem 'haml_assets', :git => "http://github.com/infbio/haml_assets"


## Thanks to
Originally I wanted to fork [backbone-rails][1] to add javascript version
(instead of cofeescript only). But it was too far a part.

## License
This project rocks and uses MIT-LICENSE.

[1]: https://github.com/codebrew/backbone-rails