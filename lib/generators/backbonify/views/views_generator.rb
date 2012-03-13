require 'generators/backbonify/resource_helpers'

module Backbonify
  module Generators
    class ViewsGenerator < Rails::Generators::NamedBase
      include Backbonify::Generators::ResourceHelpers

      source_root File.expand_path("../templates", __FILE__)
      desc "This generator creates a set of REST views for a model"


      def create_views
        %w(page filter index show new edit).each do |view|
          template "#{view}_view.js", File.join(backbone_path, "views", plural_name, "#{view}_view.js")
        end
      end


    end
  end
end
