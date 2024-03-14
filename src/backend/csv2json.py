import numpy as np
import pandas as pd
import copy
import json
import random
import time

with open('input/rounds.txt') as fh:
    rounds = int(fh.read().split("\n")[0])

with open('input/teams.txt') as fh:
    teams = fh.read().split("\n")[:-1]

player_template = {
    "name": "",
    "nationality": "",
    "club": "",
    "position": "",
    "overall": "",
    "pace": "",
    "shooting": "",
    "passing": "",
    "defence": "",
    "dribbling": "",
    "physical": "",
    "displayPrice": [ "0" for _ in range(rounds) ],
    "sellingPrice": { t: [ "0" for _ in range(rounds) ] for t in teams },
    "image": "",
    "teams": teams,
    "disabled": False,
}

players_df = pd.read_csv('input/players.csv')
players = []

for i in range(len(players_df)):
    temp_player = copy.deepcopy(player_template)
    for k in player_template.keys():
        if k == "displayPrice":
            for r in range(rounds):
                random.seed(time.time())
                temp_player[k][r] = f"{random.randint(-100, 100)}"
            continue

        if k == "sellingPrice":
            for team in teams:
                for r in range(rounds):
                    random.seed(time.time())
                    temp_player[k][team][r] = f"{random.randint(-100, 100)}"
            continue

        try:
            temp_player[k] = f"{players_df[k.capitalize()][i]}"
            if temp_player[k] == "nan":
                temp_player[k] = ""
        except KeyError:
            continue

    players.append(temp_player)

players_json = json.dumps(players, indent=2)

with open('output/players.json', 'w') as fh:
    fh.write(players_json)
