var config = {
  type: Phaser.AUTO,
  backgroundColor: "#1B3EA4",
  scale: {
    parent: "phaser-example",
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
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var platforms;
var gameOver = false;

var ballSmall;

var cursors;
var scoreText;
var goalkeeper;
var point;
var valueX, valueY;
var currentScore = 10;
var btn;

var twent2;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("background", "assets/football-mini-game.png");
  this.load.image("ground", "assets/platform.png");
  this.load.image("point", "assets/point.png");
  this.load.image("ballSmall", "assets/ball-small.png");
  this.load.image("goalkeeper", "assets/goalkeeper.png");
  this.load.image("pause", "assets/pause.png");
  this.load.spritesheet("sprite", "assets/sprite.png", {
    frameWidth: 150,
    frameHeight: 180,
  });

  //this.load.image('bomb', 'assets/bomb.png');
  //this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
  //game screen collision
  this.physics.world.setBoundsCollision(false, false, false, true);

  this.add.image(360, 290, "background");
  point = this.add.image(400, 300, "point");

  // platforms = this.physics.add.staticGroup();
  // platforms.create(400, 590, "ground").setScale(2, 1).refreshBody();

  goalkeeper = this.physics.add.sprite(206, 338, "sprite").setImmovable();
  //Remove gravity goalkeeper
  goalkeeper.body.allowGravity = false;
  ballSmall = this.physics.add.image(372, 550, "ballSmall");

  ballSmall.setBounce(0.3);
  ballSmall.setCollideWorldBounds(true);
  // ballSmall.body.allowGravity = false;

  // btn = this.add.button(100, 100, 'pause', handleClick, this, 1, 0, 2);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("sprite", { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1,
  });

  // this.physics.add.collider(ballSmall, platforms);
  //this.physics.add.collider(ballSmall, goalkeeper);
  this.physics.add.collider(ballSmall, goalkeeper, ejecutar, null, this);

  cursors = this.input.keyboard.createCursorKeys();

  let tween = this.tweens.add({
    targets: goalkeeper,
    //duration: 2000,
    props: {
      x: {
        value: 505,
        duration: 2000,
      },
    },
    repeat: -1,
    yoyo: true,
    // ease: 'Power1',
    onStart: () => console.log("inicia"),
    onYoyo: () => console.log("yoyo"),
    onComplete: () => console.log("complete"),
    onRepeat: () => console.log("repeat"),
  });

  twent2 = this.tweens.add({
    targets: ballSmall,
    //duration: 2000,
    props: {
      y: {
        value: 100,
        duration: 1000,
      },
      x: {
        value: 400,
        duration: 1000,
      },
    },
    paused: true,
    // repeat: -1,
    // yoyo: true,
    // ease: 'Power1',
    onStart: () => console.log("inicia"),
    onYoyo: () => console.log("yoyo"),
    onComplete: () => console.log("complete"),
    onRepeat: () => console.log("repeat"),
  });

  console.log(twent2);

 

  var style = {
    font: "bold 30pt Arial",
    fill: "#FFFFFF",
    align: "center",
  };

  scoreText = this.add.text(54, 475, "", style);

  scoreText.text = currentScore;

  this.input.on("pointerdown", function (pointer) {
    twent2.resume();
    currentScore = currentScore - 1;
    scoreText.text = currentScore;

    if (
      pointer.x > 198 &&
      pointer.x < 604 &&
      pointer.y > 213 &&
      pointer.y < 404
    ) {
      console.log("zona de arco");

      if (pointer.x > 400) {
        console.log("Disparo a el arco hacia la derecha");
      } else {
        console.log("Disparo a el arco hacia la izquierda");
      }
    }
    //cambiarPosicion(twent2, pointer.x, pointer.y);

    ballMovement(pointer.x, pointer.y);
  });
}

function update() {
  
    if (cursors.left.isDown)
    {
        goalkeeper.setVelocityX(-160);

        goalkeeper.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        goalkeeper.setVelocityX(160);

        goalkeeper.anims.play('left', true);
    }
    else
    {
        goalkeeper.setVelocityX(0);

        goalkeeper.anims.play('turn');
    }

    if (cursors.up.isDown && goalkeeper.body.touching.down)
    {
        goalkeeper.setVelocityY(-330);
    }
  goalkeeper.anims.play("left", true);
  point.x = this.input.mousePointer.x;
  point.y = this.input.mousePointer.y;
}

function ballMovement(pointerx, pointery) {
  console.log("Clic en ballMovement (" + pointerx + ", " + pointery + ")");
}

function cambiarPosicion(twent2, nuevaX, nuevaY) {
  twent2.props.x = nuevaX;
  twent2.props.y = nuevaY;
}

function ejecutar() {
  console.log("Lo tapo el arquero");
}

function handleClick(){
    console.log('haciendo clic');
}
