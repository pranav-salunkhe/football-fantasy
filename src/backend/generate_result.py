import json

with open('input/rounds.txt') as fh:
    rounds = int(fh.read().split("\n")[0])

with open('input/teams.txt') as fh:
    teams = fh.read().split("\n")[:-1]

with open('output/players.json') as fh:
    players_json = fh.read()

players = json.loads(players_json)
teams = { 
    f"{team}": { f"Round {r+1}": [] for r in range(rounds) } 

    for team in teams 
}

for r in range(rounds):
    for name, _ in teams.items():
        for player in players:
            try:
                val = int(player['sellingPrice'][name][r])
                if val == 0:
                    continue

                if val > 0:
                    text = f"Bought {player['name']} for {val}"
                elif val < 0:
                    text = f"Sold {player['name']} for {-val}"

                teams[name][f"Round {r+1}"].append(text)
            except KeyError:
                continue
        
record = json.dumps(teams, indent=2)
with open("output/result.json", 'w') as fh:
    fh.write(record)
