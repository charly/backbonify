require 'generators/backbonify/resource_helpers'

module Backbonify
  module Generators
    class InstallGenerator < Rails::Generators::Base
      include Backbonify::Generators::ResourceHelpers

      source_root File.expand_path("../templates", __FILE__)
      desc "This generator installs backbone.js with a default folder layout in app/assets/javascripts/backbone"
      class_option :skip_git, :type => :boolean, :aliases => "-G", :default => true,
                   :desc => "Skip Git ignores and keeps"
      class_option :skip_require, :type => :boolean, :aliases => "-R", :default => true,
                   :desc => "Skip injection of requires in app.js (-U), usefeul for updates"

      def copy_javascripts_libs_to_vendor
        directory("../../../../../lib/assets/javascripts/", "vendor/assets/javascripts/", :recursive => true)
      end


      def inject_backbone
        return if options[:skip_requires]
        inject_into_file "app/assets/javascripts/application.js", :before => "//= require_tree" do
a = %{
//= require json2
//= require jquery
//= require jquery-ui
//= require jquery.notice
//= require handlebars.runtime
//= require underscore
//= require backbone
//= require backbone_rails_sync
//= require backbone_datalink
//= require backbone.grid
//= require #{application_name.underscore}

$(function(){
  window.app = new #{application_name}.init()
});

}
        end
      end

      def create_dir_layout
        %W{routers models views templates}.each do |dir|
          empty_directory "app/assets/javascripts/#{dir}"
          create_file "app/assets/javascripts/#{dir}/.gitkeep" unless options[:skip_git]
        end
      end

      def create_app_file
        template "app.js", "app/assets/javascripts/#{application_name.underscore}.js"
      end

    end
  end
end