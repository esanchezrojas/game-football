var backgroud;

//sounds
var soundBall;
var soundReferee;
var soundEnviroment;
var soundWin;
var soundPositive;

var scoreText;
var currentScore = 3;
var colisionGoalkeper = false;
var tweenGoalkeeper;
var x, y;
var bx, by;
var goles = 0;
var isGoal = false;
var isShot = false;
var finalScore;
var tryAgain;
var promo;
var isRunning = true;


var style = {
  font: "70px calculator",
  fill: "#ffb500",
  align: "center",
};

class Game extends Phaser.Scene {
  constructor() {
    super();
  }

  init() {}

  preload() {
    //resource preloading
    this.load.image("background", "assets/football-mini-game.png");
    this.load.image("goal", "assets/goal.png");
    this.load.image("point", "assets/point.png");
    this.load.image("ballSmall", "assets/ball-small.png");
    this.load.spritesheet("sprite", "assets/sprite.png", {
      frameWidth: 170,
      frameHeight: 163,
    });

    this.load.audio("sound1", "./assets/sounds/football.mp3");
    this.load.audio("sound2", "./assets/sounds/referee.mp3");
    this.load.audio("sound3", "./assets/sounds/ambiente.mp3");
    this.load.audio(
      "soundWin",
      "//static.wplay.co/offers/ofertas/assets/sounds/win_all_rows.mp3"
    );
    this.load.audio(
      "soundPositive",
      "//static.wplay.co/offers/ofertas/assets/sounds/positive.mp3"
    );
  }

  create() {
    soundWin = this.sound.add("soundWin");
    soundPositive = this.sound.add("soundPositive");
    soundBall = this.sound.add("sound1");
    soundReferee = this.sound.add("sound2");
    soundEnviroment = this.sound.add("sound3");
    soundEnviroment.volume = 0.5;
    soundEnviroment.loop = true;

    tryAgain = this.add.dom(300, 300, "button", "", "Nuevo Intento!");
    tryAgain.addListener("click");
    tryAgain.on("click", () => {
      window.location.reload();
    });

    tryAgain.node.id = "tryAgain";
    tryAgain.setVisible(false);

    promo = this.add.dom(0, 0, "button", "", "");
    promo.addListener("click");
    promo.on("click", () => {
      window.open("https://www.wplay.co/registro-casino", "_blank");
    });

    promo.node.id = "promo";
    promo.node.classList.add("promo");
    promo.node.classList.add("tada");
    promo.node.classList.add("animated");
    promo.setVisible(false);

    //game screen collision
    this.physics.world.setBoundsCollision(false, false, false, true);
    backgroud = this.add.image(360, 290, "background");

    this.goal = this.add.image(110, 150, "goal");
    this.goal.setScale(0.5);
    this.goal.angle = -30;
    this.goal.setVisible(false);

    scoreText = this.add.text(49, 460, currentScore, style);

    finalScore = this.add.text(500, 70, "Goles " + goles, {
      font: "40px Arial",
      fill: "#ffb500",
      align: "center",
    });
    finalScore.setVisible(false);

    this.goalkeeper = this.physics.add
      .sprite(220, 334, "sprite")
      .setImmovable()
      .setScale(1.1);

    this.goalkeeper.body.allowGravity = false;

    this.ballSmall = this.physics.add.image(372, 510, "ballSmall");
    this.ballSmall.setBounce(0.5);
    this.ballSmall.setCollideWorldBounds(true);

    this.point = this.add.image(400, 300, "point");

    //goalkeeper animation sprite
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("sprite", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(
      this.ballSmall,
      this.goalkeeper,
      this.runCollision,
      null,
      this
    );

    tweenGoalkeeper = this.tweens.add({
      targets: this.goalkeeper,
      props: {
        x: {
          value: 505,
          duration: 1300,
        },
      },
      repeat: -1,
      yoyo: true,
      onStart: () => {
        soundEnviroment.play();
        this.goalkeeper.anims.play("left", true);
      },
      onUpdate: () => {
        if (isShot) {
          if (currentScore == 3 || currentScore == 2) {
            this.goalkeeper.x = this.ballSmall.x;
            if (this.goalkeeper.x < 190) {
              this.goalkeeper.x = 190;
            } else if (this.goalkeeper.x > 530) {
              this.goalkeeper.x = 530;
            }
          }
        }
      },
    });
    
    this.input.on("pointerdown", this.animateObject, this);
    
  }

  update() {
    this.point.x = this.input.mousePointer.x;
    this.point.y = this.input.mousePointer.y;
  }

  runCollision() {
    colisionGoalkeper = true;
  }

  animateObject(pointer) {
  
    isShot = true;

    bx = 0.7;
    by = 0.7;
    let tween1 = this.tweens.add({

      targets: this.ballSmall,
      props: {
        scaleX: { value: bx },
        scaleY: { value: by },
        y: {
          value: pointer.y,
          duration: 800,
        },
        x: {
          value: pointer.x,
          duration: 800,
        },
      },
      paused: true,
      hold: 2000,
      onStart: () => {
        soundBall.play();
        isRunning = false;
        
      },
      onUpdate: () => {
        
        //this.input.mouse.disableContextMenu();
        this.ballSmall.angle += 1; //Girar balon

        if (this.ballSmall.x > 365) {
          this.ballSmall.setVelocityX(200);
          this.ballSmall.setVelocityY(-100);
        } else {
          this.ballSmall.setVelocityX(-200);
          this.ballSmall.setVelocityY(-100);
        }

        if (
          pointer.x > 150 &&
          pointer.x < 560 &&
          pointer.y > 220 &&
          pointer.y < 410
        ) {
          if (
            this.ballSmall.x > 150 &&
            this.ballSmall.x < 560 &&
            this.ballSmall.y > 220 &&
            this.ballSmall.y < 410
          ) {
            if (colisionGoalkeper) {
        
            } else {
              isGoal = true;
              this.goal.setVisible(true);
            }
          }
        } else {
        }
      },
      onComplete: () => {
        isRunning = true;
        this.ballSmall.setVelocityX(0);
        this.ballSmall.x = 365;
        this.ballSmall.y = 510;
        this.ballSmall.setVelocityY(0);
        currentScore--;
        scoreText.text = currentScore;
        this.goal.setVisible(false);
        colisionGoalkeper = false;
        this.ballSmall.angle = 0;

        if (currentScore <= 0 && isGoal) {
          tween1.pause();
          this.ballSmall.setVisible(false);
          tweenGoalkeeper.pause();
          this.goalkeeper.anims.pause();
          backgroud.alpha = 0.2;
          scoreText.alpha = 0.2;
          this.scene.pause();
          //finalScore.setVisible(true);
          soundEnviroment.pause();
          promo.setVisible(true);
          soundWin.play();
          soundPositive.play();

        } else if (currentScore <= 0 && !isGoal) {
          tween1.pause();
          tweenGoalkeeper.pause();
          this.goalkeeper.anims.pause();
          backgroud.alpha = 0.2;
          scoreText.alpha = 0.2;
          this.scene.pause();

          tryAgain.setVisible(true);

          soundEnviroment.pause();
        } else {
          soundReferee.play();
        }

        if (isGoal) {
          goles++;
        }
        isGoal = false;

        finalScore.text = "Goles " + goles;
        this.ballSmall.setScale(1);
        isShot = false;
      },
    });

    // tween
    console.log(isRunning)
    if(isRunning){
    tween1.play();
    }
   
  }


  goles() {
    return (goles = goles + 1);
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-game",
  width: 720,
  height: 580,
  dom: {
    createContainer: true,
  },
  font: {
    family: "calculator",
  },
  scale: {
    parent: "phaser-game",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 720,
    height: 580,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  scene: [Game],
};

const game = new Phaser.Game(config);
