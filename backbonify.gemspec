$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "backbonify/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "backbonify"
  s.version     = Backbonify::VERSION
  s.authors     = ["Charles Sistovaris"]
  s.email       = ["charlysisto@gmail.com"]
  s.homepage    = "https://github.com/charly/backbonify"
  s.summary     = "Backbone Generator for Rails >= 3.1"
  s.description = "A generator for Backbone in Rails >= 3.1. The Language is javascript (no coffee) and the template engine is (only) handlebars wrapped in haml! However this generator takes advantage of hooks (brought by yehuda in rails 3) so it is easy to add other template engines and so on...."

  s.files = Dir["{lib}/**/*"] + ["LICENSE", "Rakefile", "README.md"]
  # s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 3.1"
  # s.add_dependency "jquery-rails"

  # s.add_development_dependency "sqlite3"
end
