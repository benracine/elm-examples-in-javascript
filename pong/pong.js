var game_width = 600;
var game_height = 400;
var half_width = game_width / 2;
var half_height = game_height / 2;

var deepEqual = chai.assert.deepEqual;
var isNumber = chai.assert.isNumber;
var isBool = chai.assert.isBool;

// Model
function Ball(x, y, vx, vy) {
  deepEqual(arguments.length, 4);
  _.each(arguments, isNumber);
  return Immutable.Map({'type': 'Ball', 'x': x, 'y': y, 'vx': vx, 'vy': vy});
}
var ball = Ball(0, 0, 200, 200);

function Player(x, y, vx, vy, score) {
  deepEqual(arguments.length, 5);
  _.each(arguments, isNumber);
  return Immutable.Map({'type': 'Player', 'x': x, 'y': y, 'vx': vx, 'vy': vy, 'score': score});
}
var player1 = Player(20 - half_width, 0, 0, 0, 0);
var player2 = Player(half_width - 20, 0, 0, 0, 0);

function State(state) {
  chai.assert.ok(_.contains(['Play', 'Pause'], state));
  return Immutable.Map({'type': 'State', 'state': state});
}
var state = State('Play');  // Pause

function Game(state, ball, player1, player2) {
  deepEqual(arguments.length, 4);
  deepEqual(state.get('type'), 'State');
  deepEqual(ball.get('type'), 'Ball');
  deepEqual(player1.get('type'), 'Player');
  deepEqual(player2.get('type'), 'Player');
  return Immutable.Map({'type': 'Game', 'state': state, 'player1': player1, 'player2': player2});
}

var game = Game(state, ball, player1, player2);

function Input(space, dir1, dir2, delta) {
  deepEqual(arguments.length, 4);
  isBool(space);
  isNumber(dir1);
  isNumber(dir2);
  isNumber(delta);
  return Immutable.Map({'type': 'Input', 'dir1': dir1, 'dir2': dir2, 'delta': time});
}

function update(input, game) {
  var ball = ball.get('ball');
  if (ball.get('x') > half_width)
  return updated_game;
}

var test_input = Input(false, 

// Should update the ball

// Should update player 1

// Should update player2

/*

-- UPDATE

update : Input -> Game -> Game
update {space,dir1,dir2,delta} ({state,ball,player1,player2} as game) =
  let
    score1 =
      if ball.x > halfWidth then 1 else 0

    score2 =
      if ball.x < -halfWidth then 1 else 0

    newState =
      if  | space ->
              Play

          | score1 /= score2 ->
              Pause

          | otherwise ->
              state

    newBall =
      if state == Pause then
        ball
      else
        updateBall delta ball player1 player2
  in
    { game |
        state <- newState,
        ball <- newBall,
        player1 <- updatePlayer delta dir1 score1 player1,
        player2 <- updatePlayer delta dir2 score2 player2
    }


updateBall : Time -> Ball -> Player -> Player -> Ball
updateBall t ({x,y,vx,vy} as ball) p1 p2 =
  if not (ball.x |> near 0 halfWidth) then
    { ball | x <- 0, y <- 0 }
  else
    physicsUpdate t
      { ball |
          vx <- stepV vx (ball `within` p1) (ball `within` p2),
          vy <- stepV vy (y < 7-halfHeight) (y > halfHeight-7)
      }


updatePlayer : Time -> Int -> Int -> Player -> Player
updatePlayer t dir points player =
  let
    player1 =
      physicsUpdate  t { player | vy <- toFloat dir * 200 }
  in
    { player1 |
        y <- clamp (22-halfHeight) (halfHeight-22) player1.y,
        score <- player.score + points
    }


physicsUpdate t ({x,y,vx,vy} as obj) =
  { obj |
      x <- x + vx * t,
      y <- y + vy * t
  }


near k c n =
  n >= k-c && n <= k+c

within ball paddle =
  near paddle.x 8 ball.x && near paddle.y 20 ball.y


stepV v lowerCollision upperCollision =
  if  | lowerCollision ->
          abs v
      | upperCollision ->
          -(abs v)
      | otherwise ->
          v


-- VIEW

view : (Int,Int) -> Game -> Element
view (w,h) {state,ball,player1,player2} =
  let
    scores =
      txt (Text.height 50) (toString player1.score ++ "  " ++ toString player2.score)
  in
    container w h middle <|
    collage gameWidth gameHeight
      [ rect gameWidth gameHeight
          |> filled pongGreen
      , oval 15 15
          |> make ball
      , rect 10 40
          |> make player1
      , rect 10 40
          |> make player2
      , toForm scores
          |> move (0, gameHeight/2 - 40)
      , toForm (if state == Play then spacer 1 1 else txt identity msg)
          |> move (0, 40 - gameHeight/2)
      ]
*/

function view(window_size, game) {
  return
}

/*
pongGreen =
  rgb 60 100 60


textGreen =
  rgb 160 200 160


txt f string =
  Text.fromString string
    |> Text.color textGreen
    |> Text.monospace
    |> f
    |> leftAligned


msg = "SPACE to start, WS and &uarr;&darr; to move"

make obj shape =
  shape
    |> filled white
    |> move (obj.x,obj.y)


-- SIGNALS

main =
  Signal.map2 view Window.dimensions gameState


gameState : Signal Game
gameState =
  Signal.foldp update defaultGame input


delta =
  Signal.map inSeconds (fps 35)


input : Signal Input
input =
  Signal.sampleOn delta <|
    Signal.map4 Input
      Keyboard.space
      (Signal.map .y Keyboard.wasd)
      (Signal.map .y Keyboard.arrows)
      delta

*/