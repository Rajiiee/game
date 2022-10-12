        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const cwidth = canvas.width;
        const cheight = canvas.height;

        function randHoleX() {
          return Math.floor(Math.random() * 270);
        }

        let ball = { x: 300, y: 0, r: 9 };
        let Platforms = [
          { x: 0, y: cheight, w: cwidth, h: 10, holeX: randHoleX(), holeW: 40 },
          {
            x: 0,
            y: cheight + 50,
            w: cwidth,
            h: 10,
            holeX: randHoleX(),
            holeW: 40,
          },
        ];
        let leftpressed = false;
        let rightpressed = false;
        let interval = (scoreInterval = null);
        let score = 0;
        let gravity = 0.5;
        let dropSpeed = 0;
var over;
var settle;

settle = new Audio("bricktouch.wav");
        over = new Audio("gameover.wav");

        scoreInterval = setInterval(() => {
          score++;
        }, 1000);

        drawBall();
        drawPlatforms();
        movePlatforms();

        function movePlatforms() {
          let count = 0;
          setInterval(() => {
            if (count == Math.floor(50)) {
              if (Platforms.length > 10) {
                Platforms.splice(0, 1);
              }
              Platforms.push({
                x: 0,
                y: cheight + 50,
                w: cwidth,
                h: 10,
                holeX: randHoleX(),
                holeW: 40,
              });
              count = 0;
            }
            Platforms.forEach((pl) => {
              pl.y = pl.y - 1.5;
            });

            const closest = Platforms.find(
              (pl) => ball.y < pl.y + 10 && ball.y > pl.y - ball.r
            );

            if (closest) {
              holdAndDrop(closest);
            } else {
              dropSpeed += gravity;
              ball.y += 5;
            }

            ctx.clearRect(0, 0, cwidth, cheight);
            drawPlatforms();
            drawBall();
            checkGameOver();
            drawScore();
            count++;
          }, 20);
        }

        function checkGameOver() {
            if (ball.y < 0) {
                gameover();
          }
        }

function gameover() {
            over.play();
            alert("Game Over!! \nBetter Luck Next Time");
            alert("Score:" + score);;
        }

        function holdAndDrop(closest) {
          if (ball.y > closest.y - ball.r) {
            if (
              ball.x > closest.holeX &&
              ball.x < closest.holeX + closest.holeW
            ) {
                settle.play();
              ball.y += 1;
            } else {
              ball.y = closest.y - ball.r;
            }
          }
        }

        function drawBall() {
          if (leftpressed && ball.x - ball.r > 0) {
            ball.x -= 2;
          }
          if (rightpressed && ball.x + ball.r < cwidth) {
            ball.x += 2;
          }
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
          ctx.fillStyle = "brown";
          ctx.stroke = "2px solid black";
          ctx.fill();
          ctx.closePath();
        }

        function drawScore() {
          ctx.beginPath();
          ctx.fillStyle = "black";
          ctx.fill();
          ctx.font = "30px Chopsic";
          ctx.fillText("Score:" + score, 20, 30);
          ctx.closePath();
        }

        function drawPlatforms() {
          Platforms.forEach((pl) => {
            createPl(pl);
            createHole(pl);
            navigationBall();
            drawScore();
          });

          function createHole(pl) {
            ctx.beginPath();
            ctx.rect(pl.holeX, pl.y, pl.holeW, pl.h);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
          }

          function createPl(pl) {
            ctx.beginPath();
            ctx.rect(pl.x, pl.y, pl.w, pl.h);
            ctx.fillStyle = "grey";
            ctx.fill();
            ctx.closePath();
          }
        }
        function navigationBall() {
          document.onkeydown = function (e) {
            switch (e.keyCode) {
              case 37:
                console.log("Left Key pressed!");
                leftpressed = true;
                console.log(leftpressed);
                break;
              case 39:
                rightpressed = true;
                console.log(rightpressed);
                break;
            }
          };
          document.onkeyup = function (e) {
            switch (e.keyCode) {
              case 37:
                leftpressed = false;
                console.log(leftpressed);
                break;
              case 39:
                rightpressed = false;
                console.log(rightpressed);
                break;
            }
          };
        }