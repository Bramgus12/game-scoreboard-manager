# Boerenbridge (Oh Hell) Rules in This App

This document explains how Boerenbridge is implemented in this project.

Rule baseline: this implementation is aligned with the general rule flow described on the Dutch Wikipedia page for Boerenbridge/Chinees poepen (snapshot `oldid=63987297`), combined with the scoring model used in this app.

## Naming

- Dutch UI: `Boerenbridge`
- English UI: `Oh Hell`

## Game Setup

When creating a Boerenbridge game, the user configures:

- `pointsPerCorrectGuess` (used as points per won card when the guess is correct)
- `players` (minimum 1, maximum 52)

## Core Playing Rules (Game Table)

These are the table rules the app assumes while tracking rounds and scores.

### Goal

Predict how many tricks/slagen you will win in each round, then try to hit that prediction.

### Bidding order

- Every round, each player submits an expected number of tricks.
- Bidding order starts left of dealer in physical play.
- In this app, dealer position/turn order is not tracked; only valid bids and totals are validated.

### Last-bid restriction

- In classic play, the last bidder may not choose a value that makes total bids equal to the number of tricks in the round.
- In this app, we enforce the equivalent global validation:
    - sum of all expected wins cannot equal `roundNumber`.

### Trick play assumptions

From standard Boerenbridge play, the app assumes:

- players are expected to follow suit when possible;
- if a player cannot follow suit, they are not forced to trump.

Card-by-card trick logic is not simulated in this app; users enter expected and actual results per round.

### Trump

- In many table variants, highest bidder determines trump.
- This app does not track or enforce trump selection; it focuses on round outcomes and scoring.

## Round Structure

Each round has a `roundNumber` equal to the number of cards dealt per player in that round.

### Max round calculation

Max cards per player is based on a 52-card deck:

`maxRound = floor(52 / playerCount)`

Examples:

- 5 players -> maxRound = 10
- 4 players -> maxRound = 13

### Round sequence

Rounds go up to `maxRound`, repeat `maxRound` once, then go down to 1.

Sequence shape:

`1, 2, 3, ..., maxRound, maxRound, ..., 3, 2, 1`

For 5 players:

`1..10..10..1`

The winner is the player with the highest total score after the final round.

## Round Input Flow (Two Steps)

When adding/editing a round, input is split into 2 steps:

1. Expected wins per player (guess)
2. Actual wins per player (result)

## Validation Rules

### Expected wins (step 1)

For each player:

- Must be between `0` and `roundNumber`

For all players combined:

- Sum of expected wins cannot equal `roundNumber`

This models the classic Boerenbridge constraint where total bids cannot match the number of tricks.

### Actual wins (step 2)

For each player:

- Must be between `0` and `roundNumber`

For all players combined:

- Sum of actual wins must equal `roundNumber`

This ensures total won tricks equals the number of tricks available in that round.

### Round state validation

On create:

- Submitted `roundNumber` must match the current computed round state.
- If the game is finished (all turns played), no new round can be added.

## Scoring

For each player per round:

- If `expectedWins === actualWins`: score `10 + (actualWins * pointsPerCorrectGuess)`
- Else: score `-(abs(expectedWins - actualWins) * pointsPerCorrectGuess)`

Totals are the sum of all round scores per player.

## Notes on Variants

Boerenbridge has local variants (for example around trump handling, open/closed one-card rounds, or different per-trick values). This app currently implements one consistent digital ruleset:

- fixed two-step input (expected then actual);
- fixed validation constraints as above;
- fixed scoring formula as above.

## Progress Display

The scoreboard shows:

- Current cards this round (`roundNumber`)
- Max cards (`maxRound`)
- Progress (`completedTurns/totalTurns`)

Where:

- `totalTurns = maxRound * 2`
