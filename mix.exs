defmodule FalconpilotBlog.Mixfile do
  use Mix.Project

  def project do
    [ app: :falconpilot_blog
    , version: "1.0.0"
    , elixir: "~> 1.10"
    , elixirc_paths: elixirc_paths(Mix.env)
    , compilers: Mix.compilers
    , build_embedded: Mix.env == :prod
    ]
  end
end
