require 'generators/backbonify/resource_helpers'

module Backbonify
  module Generators
    class ScaffoldGenerator < Rails::Generators::NamedBase
      include Backbonify::Generators::ResourceHelpers

      source_root File.expand_path("../templates", __FILE__)
      desc "This generator creates the client side crud scaffolding"


      class_option :model, :default => true, :type => :string
      hook_for :model

      class_option :router, :default => true, :type => :string
      hook_for :router

      class_option :views, :default => true, :type => :string
      hook_for :views

      class_option :js_template, :default => "hbs", :type => :string
      hook_for :js_template

    end
  end
end