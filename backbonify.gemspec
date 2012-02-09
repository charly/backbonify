$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "backbonify/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "backbonify"
  s.version     = Backbonify::VERSION
  s.authors     = ["Charles Sistovaris"]
  s.email       = ["TODO: Your email"]
  s.homepage    = "http://ruby.simapse.com/"
  s.summary     = "Backbone Generator for Rails >= 3.1"
  s.description = "TODO: Description of Backbonify."

  s.files = Dir["{lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 3.1"
  # s.add_dependency "jquery-rails"

  s.add_development_dependency "sqlite3"
end
