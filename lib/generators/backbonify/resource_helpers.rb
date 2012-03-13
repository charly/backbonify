module Backbonify
  module Generators
    module ResourceHelpers

      def backbone_path
        "app/assets/javascripts"
      end

      # => Perf.Models.Performance
      def model_namespace
        [js_app_name, "Models", class_name].join(".")
      end

      # => performance
      def singular_model_name
        uncapitalize singular_name.camelize
      end

      # => performances
      def plural_model_name
        uncapitalize(plural_name.camelize)
      end

      # => Perf.Collections.Performances
      def collection_namespace
        [js_app_name, "Collections", plural_name.camelize].join(".")
      end

      # => Perf.Views.Performances
      def view_namespace
        [js_app_name, "Views", plural_name.camelize].join(".")
      end

      # => Perf.Routers.Performances
      def router_namespace
        [js_app_name, "Routers", plural_name.camelize].join(".")
      end

      def jst(action)
        "templates/#{plural_name}/#{action}"
      end

      def js_app_name
        application_name.camelize
      end

      # TODO : Add an option so "App" is default
      def application_name
        if defined?(Rails) && Rails.application
          Rails.application.class.name.split('::').first
        else
          "application"
        end
      end

      # uncapitalize("ABC") => aBC
      def uncapitalize(str)
        str[0, 1].downcase << str[1..-1]
      end

    end
  end
end
