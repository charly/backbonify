require 'generators/backbonify/resource_helpers'

module Backbonify
  module Generators
    class HbsGenerator < Rails::Generators::NamedBase
      include Backbonify::Generators::ResourceHelpers

      source_root File.expand_path("../templates", __FILE__)
      desc "This generator creates a set of Handlebars templates for a model"

      argument :attributes, :type => :array, :default => [], :banner => "field:type field:type"


      def create_templates
        %w(page index show new edit).each do |view|
          template "#{view}.haml", File.join(backbone_path, "templates", plural_name, "#{view}.jst.hbs.haml")
        end
      end

      def create_partials
        %w(_row _form).each do |view|
          template "#{view}.haml", File.join(backbone_path, "templates", plural_name, "_#{singular_name}#{view}.jst.hbs.haml")
        end
      end


    end
  end
end
