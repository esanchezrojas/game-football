var backgroud;
var soundBall;
var soundReferee;
var soundEnviroment;
var scoreText;
var currentScore = 9;
var twent2;
var colisionGoalkeper = false;
var x, y;
var goles = 0;
var isGoal = false;
var finalScore;
var style = {
  font: "70px calculator",
fill: "#ffb500",
  align: "center",
};

class Game extends Phaser.Scene {
  
 

  constructor() {
    super();
  }

  init() {
    console.log("esta iniciando el juego");
    currentScore = 3;
  }

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

    this.load.audio('sound1', './assets/sounds/football.mp3');
    this.load.audio('sound2', './assets/sounds/referee.mp3');
    this.load.audio('sound3', './assets/sounds/ambiente.mp3');

    
  }

  create() {

     soundBall = this.sound.add('sound1');
     soundReferee = this.sound.add('sound2');
     soundEnviroment = this.sound.add('sound3');
     soundEnviroment.volume = 0.5; // Volumen a la mitad
     soundEnviroment.loop = true; // Repetir el sonido
     soundEnviroment.play();
     
    //game screen collision
    this.physics.world.setBoundsCollision(false, false, false, true);
    backgroud = this.add.image(360, 290, "background");
    this.goal = this.add.image(360, 100, "goal");

    this.goal.setVisible(false);

    scoreText = this.add.text(49, 460, currentScore, style);
   // scoreText.text = currentScore;

   finalScore = this.add.text(500, 70,"Goles "+ goles, {
    font: "40px Arial",
    fill: "#ffb500",
    align: "center",
  });
   finalScore.setVisible(false);
    

    this.goalkeeper = this.physics.add
      .sprite(220, 334, "sprite")
      .setImmovable();
    this.goalkeeper.body.allowGravity = false;

    this.ballSmall = this.physics.add.image(372, 510, "ballSmall");
    //this.ballSmall.setScale(2);
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
      this.ejecutar,
      null,
      this
    );

    

    let tween = this.tweens.add({
      targets: this.goalkeeper,
      //duration: 2000,
      props: {
        x: {
          value: 505,
          duration: 1400,
        },
      },
      repeat: -1,
      yoyo: true,
      onStart: () => {
        console.log("inicio");

        this.goalkeeper.anims.play("left", true);
      },
      // onYoyo: () => console.log("yoyo"),
      // onComplete: () => console.log("complete"),
      // onRepeat: () => console.log("repeat"),
    });

    this.input.on("pointerdown", this.animarObjeto, this);
  }

  update() {
    this.point.x = this.input.mousePointer.x;
    this.point.y = this.input.mousePointer.y;
  }

  ejecutar() {
    //console.log("colicionando con el arquero");
    colisionGoalkeper = true;
    
  }

  animarObjeto(pointer) {
   

    let tween1 = this.tweens.add({
      targets: this.ballSmall,
      //duration: 2000,

      props: {
      //  scaleX: { value: this.bx, duration: 500, ease: 'Power2' },
      // scaleY:{ value: this.by, duration: 500, ease: 'Power2' },
       
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
      // repeat: -1,
      // yoyo: true,
      // ease: 'Power2',
      hold: 2000,
      onStart: () => {
        soundBall.play();
      
      },
      onYoyo: () => console.log("yoyo"),
      onUpdate: () => {
        this.ballSmall.angle +=1;//Girar balon
       // console.log("point X " + pointer.x);
       // console.log("point Y " + pointer.y);
        
      // console.log("update");

         //velocity goalkeeper to ball
         if (this.ballSmall.x > 365) {
          // console.log("balll + " + this.ballSmall.x);
          this.ballSmall.setVelocityX(200);
          this.ballSmall.setVelocityY(-100);
       
        } else {
          // console.log("balll -  " + this.ballSmall.x);
          this.ballSmall.setVelocityX(-200);
          this.ballSmall.setVelocityY(-100);
          
        }
        
     

        if (
          pointer.x > 150 &&
          pointer.x < 550 &&
          pointer.y > 220 &&
          pointer.y < 430
        ) {

          if (
            this.ballSmall.x > 150 &&
            this.ballSmall.x < 550 &&
            this.ballSmall.y > 220 &&
            this.ballSmall.y < 430
          ) {
            if(colisionGoalkeper){
              console.log('lo tapo el arquero');
             }else{
              console.log('gool');
              isGoal = true;
             
              this.goal.setVisible(true);
          }

          // console.log("zona de arco");

          if (this.ballSmall.x > 360) {
            //  console.log("Disparo a el arco hacia la derecha "+" x "+this.ballSmall.x+" Y "+this.ballSmall.y);
              
            } else {
           //   console.log("Disparo a el arco hacia la izquierda "+" X "+this.ballSmall.x+" Y "+this.ballSmall.y);
            }

         
           
          }
         
        } else {
          console.log("salio el balon");
        //  console.log("salio el balon"+" X "+this.ballSmall.x+" Y "+this.ballSmall.y);
        }
      },
      onComplete: () => {
       // console.log("ball x " + this.ballSmall.x);
       // console.log("ball y " + this.ballSmall.y);
        
        this.ballSmall.setVelocityX(0);
        //this.scene.restart();
        console.log("complete");
        this.ballSmall.x = 365;
        this.ballSmall.y = 510;
        this.ballSmall.setVelocityY(0);
        currentScore--;
        scoreText.text = currentScore;
        this.goal.setVisible(false);
        colisionGoalkeper = false;
        this.ballSmall.angle = 0;
        if(currentScore <= 0){
          console.log('terminó el juego')

          backgroud.alpha = 0.5;
          this.scene.pause();
          finalScore.setVisible(true);
          soundEnviroment.pause();
        }else{
          console.log('no ha terminado')
          soundReferee.play();
        }

        if(isGoal){
          goles ++;
          
        }
        isGoal = false;
        
        finalScore.text = "Goles "+goles;
        console.log('cant goles '+goles)
        
      },
      onRepeat: () => console.log("repeat"),
    });

    console.log(tween1);

    // ejecuta el tween
    tween1.play();
  }

  myCallback() {
    this.scene.pause();
    this.scene.restart();
  }

  goles(){
  return  goles= goles +1;
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-game",
  width: 720,
  height: 580,
  dom: {
    createContainer: true
  },
  font: {
    family: 'calculator',
   // size: '24px',
   // color: '#000000'
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
