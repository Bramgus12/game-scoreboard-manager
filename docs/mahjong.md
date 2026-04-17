# Mahjong (NTS) Rules in This App

This document explains how Mahjong is implemented in this project.

Rule baseline: Nederlandse Toernooi Spelregels (version 2002, edition 2019) by the Nederlandse Mahjong Bond.

## Scope in App (MVP)

This app tracks Mahjong at **hand settlement level**. It does not validate tile-by-tile legality.

The app records:

- hand outcome (`self_draw`, `discard`, `remise`)
- winner and optional discarder
- winning points (capped by game limit)
- optional limit-hand flag

The app calculates:

- per-player hand deltas
- running totals
- wind rotation per hand

## Rule Profile Versioning

Each Mahjong game stores a ruleset profile:

- `nts_2002_2019_v1`

This enables future changes without altering old scoreboards.

## Game Setup

When creating a Mahjong game, the user configures:

- `players`: exactly 4 players
- `handLimit`: number of tracked hands (default 16)
- `pointsLimit`: cap on winner points per hand (default 2000)
- `ruleProfile`: `nts_2002_2019_v1`

## Winds and Rotation

Players are assigned seat order at creation time.

At hand 1:

- seat 0 = East
- seat 1 = South
- seat 2 = West
- seat 3 = North

After each hand, winds rotate according to NTS flow:

- East -> North
- South -> East
- West -> South
- North -> West

Prevailing wind rotates every 4 hands:

- hands 1-4: East
- hands 5-8: South
- hands 9-12: West
- hands 13-16: North

## Hand Input Rules

### Remise

- winner must be empty
- discarder must be empty
- winner points must be `0`

### Mahjong from wall (`self_draw`)

- winner is required
- discarder must be empty

### Mahjong from discard (`discard`)

- winner is required
- discarder is required
- winner and discarder must be different players

### Points

- winner points must be `>= 0`
- winner points must be `<= pointsLimit`

## Settlement Model in App

For non-remise hands:

- winner receives payment from each other player
- payment is `winnerPoints`
- if winner or payer is East in that hand, payment is doubled

For remise:

- all deltas are `0`

All hand settlements sum to zero.

## Out of Scope (Current Version)

- tile-by-tile validation (chow/pung/kong legality)
- claim priority resolution
- automatic detection of limit or irregular limit hands
- full dead-hand enforcement
- scoring decomposition from meld-level input
