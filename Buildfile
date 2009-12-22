# ===========================================================================
# Project:   Scui-sampleapp/
# Copyright: ©2009 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => :sproutcore

# CORE FRAMEWORKS
config :scui, :required => [:sproutcore, :'scui/drawing', :'scui/linkit']

# This configuration section will be applied to all bundles used by your
# application, even bundles that come from other gems.
config :family_tree do |c|
  c[:required] = [:sproutcore, :scui]
end
