# ===========================================================================
# Project:   Scui-sampleapp/
# Copyright: ©2009 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => :sproutcore

# CORE FRAMEWORKS
config :scui, :required => [:sproutcore, :'scui/drawing', :'scui/linkit']

# SPECIAL FRAMEWORKS AND THEMES
# These do not require any of the built-in SproutCore frameworks
%w(testing debug standard_theme empty_theme).each do |target_name|
  config target_name, 
    :required => [], :test_required => [], :debug_required => []
end

# CONFIGURE THEMES
config :standard_theme, 
  :theme_name => 'linkit-theme',
  :test_required  => ['sproutcore/testing'],
  :debug_required => ['sproutcore/debug']

# This configuration section will be applied to all bundles used by your
# application, even bundles that come from other gems.
config :family_tree do |c|
  c[:required] = [:sproutcore, :scui]
  c[:theme] = :standard_theme
end
