from __future__ import annotations

import dash
import httpx
import uuid
import random
from dash import html
from dash.dependencies import Input, Output, State
from pymatgen.core import Lattice, Structure

import crystal_toolkit.components as ctc
from crystal_toolkit.settings import SETTINGS
from optimade.adapters.structures import Structure as OptimadeStructure

app = dash.Dash(
    assets_folder=str(SETTINGS.ASSETS_PATH),
)


# create the Structure object
structure = None
Structure(
    lattice=Lattice.cubic(4.2),
    species=["H", "O"],
    coords=[[0, 0, 0], [0.5, 0.5, 0.5]],
)

# create the Crystal Toolkit component
structure_component = ctc.StructureMoleculeComponent(structure, id="my_structure")

# example layout to demonstrate capabilities of component
layout = html.Div(
    [
        html.H2("Does this material exist?"),
        structure_component.title_layout(),
        html.A(None, id="link"),
        structure_component.layout(),
        html.Div([
            html.H3("What's your likelihood that this material is synthesizable?"),
            dash.dcc.Slider(
                0, 100, 10,
                value=50,
                marks={0: "0%", 50: "50%", 100: "100%"},
                id="slider"
            ),
            html.Button("Submit", id="submit", n_clicks=0, style={"margin": "10px"}),
            html.P("Scores will be recorded anonymously and shared publicly if they prove interesting!"),
            ], style={"width": "350px", "padding": "20px", "align": "center", "text-align": "center"}),
        html.Footer(
            [
                html.Div(
                    [
                        html.A(
                            "Powered by OPTIMADE",
                            href="https://www.optimade.org",
                            style={"padding": "20px"},
                        ),
                        html.A(
                            "and Crystal Toolkit",
                            href="https://docs.crystaltoolkit.org",
                            style={"padding": "20px"},
                        ),
                        html.A(
                            "using the GNome dataset",
                            href="https://github.com/google-deepmind/materials_discovery",
                            style={"padding": "20px"},
                        ),
                        html.A(
                            "developed on GitHub",
                            href="https://github.com/ml-evs/this-material-does-not-exist",
                            style={"padding": "20px"},
                        ),
                    ],
                ),
            ]
    ),
    ],
    style=dict(
        margin="2em auto", display="grid", placeContent="center", placeItems="center"
    ),

)

# tell crystal toolkit about your app and layout
ctc.register_crystal_toolkit(app, layout=layout)

# random string per user session
session_id = str(uuid.uuid4())
shuffled_entries = random.sample(range(0, 384938), 1000)

@app.callback(
    Output(structure_component.id(), "data"),
    Output("link", "href"),
    Output("link", "children"),
    Input("submit", "n_clicks"),
    State("slider", "value"),
    Input(structure_component.id(), "data"),
)
def get_structure(value: str, n_clicks: int, data: dict):
    if data:
        with open("results.csv", "a") as f:
            f.write(f'{session_id},{data["properties"]["optimade_id"].split()[1]},{value}\n')

    ind = shuffled_entries[n_clicks]
    base_url = "https://optimade-gnome.odbx.science/v1/structures"
    response = httpx.get(f"{base_url}?page_limit=1&page_offset={ind}").json()
    optimade_structure = response["data"][0]
    pmg_structure = OptimadeStructure(optimade_structure).as_pymatgen
    optimade_id = "GNome "+ optimade_structure["id"].split("/")[-1].split(".")[0]
    optimade_url = base_url + "/" + optimade_structure["id"]
    pmg_structure.properties["optimade_id"] = optimade_id
    return pmg_structure, optimade_url, optimade_id


# run this app with "python path/to/this/file.py"
# in production, deploy behind gunicorn or similar
# see Dash docs for more info
if __name__ == "__main__":
    app.run(debug=True, port=8050)
