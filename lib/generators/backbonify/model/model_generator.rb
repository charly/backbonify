require 'generators/backbonify/resource_helpers'

module Backbonify
  module Generators
    class ModelGenerator < Rails::Generators::NamedBase
      include Backbonify::Generators::ResourceHelpers

      source_root File.expand_path("../templates", __FILE__)
      desc "This generator creates a backbone model"

      argument :attributes, :type => :array, :default => [], :banner => "field:type field:type"

      def create_backbone_model
        template "model.js", "#{backbone_path}/models/#{file_name}.js"
      end


    end
  end
end