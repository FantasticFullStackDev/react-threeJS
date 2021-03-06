import React , { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import * as THREE from "three";
import './d.css';

function App() {
  //----- classes ------
  const classes = useStyles();

  //----- Lifecycle Events -----
  useEffect(() => {
    //  === THREE.JS CODE START ===
    //  var scene = new THREE.Scene();
    //  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    //  var renderer = new THREE.WebGLRenderer();
    //  renderer.setSize( 300, 300 );
    //  document.getElementById('three').appendChild( renderer.domElement );
    //  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //  var cube = new THREE.Mesh( geometry, material );
    //  scene.add( cube );
    //  camera.position.z = 5;
    //  var animate = function () {
    //    requestAnimationFrame( animate );
    //    cube.rotation.x += 0.01;
    //    cube.rotation.y += 0.01;
    //    renderer.render( scene, camera );
    //  };
    //  animate();

    // function main() {
    //   const canvas = document.querySelector('#c');
    //   const renderer = new THREE.WebGLRenderer({canvas});
    //   renderer.autoClearColor = false;
    
    //   const camera = new THREE.OrthographicCamera(
    //     -1, // left
    //      1, // right
    //      1, // top
    //     -1, // bottom
    //     -1, // near,
    //      1, // far
    //   );
    //   const scene = new THREE.Scene();
    //   const plane = new THREE.PlaneBufferGeometry(2, 2);
    
    //   const fragmentShader = `
    //   #include <common>
    
    //   uniform vec3 iResolution;
    //   uniform float iTime;
    //   uniform sampler2D iChannel0;
    
    //   // By Daedelus: https://www.shadertoy.com/user/Daedelus
    //   // license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
    //   #define TIMESCALE 0.25 
    //   #define TILES 8
    //   #define COLOR 0.7, 1.6, 2.8
    
    //   void mainImage( out vec4 fragColor, in vec2 fragCoord )
    //   {
    //     vec2 uv = fragCoord.xy / iResolution.xy;
    //     uv.x *= iResolution.x / iResolution.y;
        
    //     vec4 noise = texture2D(iChannel0, floor(uv * float(TILES)) / float(TILES));
    //     float p = 1.0 - mod(noise.r + noise.g + noise.b + iTime * float(TIMESCALE), 1.0);
    //     p = min(max(p * 3.0 - 1.8, 0.1), 2.0);
        
    //     vec2 r = mod(uv * float(TILES), 1.0);
    //     r = vec2(pow(r.x - 0.5, 2.0), pow(r.y - 0.5, 2.0));
    //     p *= 1.0 - pow(min(1.0, 12.0 * dot(r, r)), 2.0);
        
    //     fragColor = vec4(COLOR, 1.0) * p;
    //   }
    
    //   void main() {
    //     mainImage(gl_FragColor, gl_FragCoord.xy);
    //   }
    //   `;
    //   const loader = new THREE.TextureLoader();
    //   const texture = loader.load('https://r105.threejsfundamentals.org/threejs/resources/images/bayer.png');
    //   texture.minFilter = THREE.NearestFilter;
    //   texture.magFilter = THREE.NearestFilter;
    //   texture.wrapS = THREE.RepeatWrapping;
    //   texture.wrapT = THREE.RepeatWrapping;
    //   const uniforms = {
    //     iTime: { value: 0 },
    //     iResolution:  { value: new THREE.Vector3() },
    //     iChannel0: { value: texture },
    //   };
    //   const material = new THREE.ShaderMaterial({
    //     fragmentShader,
    //     uniforms,
    //   });
    //   scene.add(new THREE.Mesh(plane, material));
    
    //   function resizeRendererToDisplaySize(renderer) {
    //     const canvas = renderer.domElement;
    //     const width = canvas.clientWidth;
    //     const height = canvas.clientHeight;
    //     const needResize = canvas.width !== width || canvas.height !== height;
    //     if (needResize) {
    //       renderer.setSize(width, height, false);
    //     }
    //     return needResize;
    //   }
    
    //   function render(time) {
    //     time *= 0.001;  // convert to seconds
    
    //     resizeRendererToDisplaySize(renderer);
    
    //     const canvas = renderer.domElement;
    //     uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
    //     uniforms.iTime.value = time;
    
    //     renderer.render(scene, camera);
    
    //     requestAnimationFrame(render);
    //   }
    
    //   requestAnimationFrame(render);
    // }
    // main();

    function main() {
      const canvas = document.querySelector('#d');
      const renderer = new window.THREE.WebGLRenderer({canvas});
    
      const fov = 45;
      const aspect = 2;  // the canvas default
      const near = 0.1;
      const far = 1000;
      const camera = new window.THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 40, 80);
    
      const controls = new window.THREE.OrbitControls(camera, canvas);
      controls.enableKeys = false;
      controls.target.set(0, 5, 0);
      controls.update();
    
      const scene = new window.THREE.Scene();
      scene.background = new window.THREE.Color('white');
    
      function addLight(...pos) {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new window.THREE.DirectionalLight(color, intensity);
        light.position.set(...pos);
        scene.add(light);
        scene.add(light.target);
      }
      addLight(5, 5, 2);
      addLight(-5, 5, 5);
    
      const manager = new window.THREE.LoadingManager();
      manager.onLoad = init;
    
      const progressbarElem = document.querySelector('#progressbar');
      manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        progressbarElem.style.width = `${itemsLoaded / itemsTotal * 100 | 0}%`;
      };
    
      const models = {
        pig:    { url: 'https://r105.threejsfundamentals.org/threejs/resources/models/animals/Pig.gltf' },
        cow:    { url: 'https://r105.threejsfundamentals.org/threejs/resources/models/animals/Cow.gltf' },
        llama:  { url: 'https://r105.threejsfundamentals.org/threejs/resources/models/animals/Llama.gltf' },
        pug:    { url: 'https://r105.threejsfundamentals.org/threejs/resources/models/animals/Pug.gltf' },
        sheep:  { url: 'https://r105.threejsfundamentals.org/threejs/resources/models/animals/Sheep.gltf' },
        zebra:  { url: 'https://r105.threejsfundamentals.org/threejs/resources/models/animals/Zebra.gltf' },
        horse:  { url: 'https://r105.threejsfundamentals.org/threejs/resources/models/animals/Horse.gltf' },
        knight: { url: 'https://r105.threejsfundamentals.org/threejs/resources/models/knight/KnightCharacter.gltf' },
      };
      {
        const gltfLoader = new window.THREE.GLTFLoader(manager);
        for (const model of Object.values(models)) {
          gltfLoader.load(model.url, (gltf) => {
            model.gltf = gltf;
          });
        }
      }
    
      function prepModelsAndAnimations() {
        const box = new window.THREE.Box3();
        const size = new window.THREE.Vector3();
        Object.values(models).forEach(model => {
          box.setFromObject(model.gltf.scene);
          box.getSize(size);
          model.size = size.length();
          const animsByName = {};
          model.gltf.animations.forEach((clip) => {
            animsByName[clip.name] = clip;
            // Should really fix this in .blend file
            if (clip.name === 'Walk') {
              clip.duration /= 2;
            }
          });
          model.animations = animsByName;
        });
      }
    
      // Keeps the state of keys/buttons
      //
      // You can check
      //
      //   inputManager.keys.left.down
      //
      // to see if the left key is currently held down
      // and you can check
      //
      //   inputManager.keys.left.justPressed
      //
      // To see if the left key was pressed this frame
      //
      // Keys are 'left', 'right', 'a', 'b', 'up', 'down'
      class InputManager {
        constructor() {
          this.keys = {};
          const keyMap = new Map();
    
          const setKey = (keyName, pressed) => {
            const keyState = this.keys[keyName];
            keyState.justPressed = pressed && !keyState.down;
            keyState.down = pressed;
          };
    
          const addKey = (keyCode, name) => {
            this.keys[name] = { down: false, justPressed: false };
            keyMap.set(keyCode, name);
          };
    
          const setKeyFromKeyCode = (keyCode, pressed) => {
            const keyName = keyMap.get(keyCode);
            if (!keyName) {
              return;
            }
            setKey(keyName, pressed);
          };
    
          addKey(37, 'left');
          addKey(39, 'right');
          addKey(38, 'up');
          addKey(40, 'down');
          addKey(90, 'a');
          addKey(88, 'b');
    
          window.addEventListener('keydown', (e) => {
            setKeyFromKeyCode(e.keyCode, true);
          });
          window.addEventListener('keyup', (e) => {
            setKeyFromKeyCode(e.keyCode, false);
          });
    
          const sides = [
            { elem: document.querySelector('#left'),  key: 'left'  },
            { elem: document.querySelector('#right'), key: 'right' },
          ];
    
          // note: not a good design?
          // The last direction the user presses should take
          // precedence. Example: User presses L, without letting go of
          // L user presses R. Input should now be R. User lets off R
          // Input should now be L.
          // With this code if user pressed both L and R result is nothing
    
          const clearKeys = () => {
            for (const {key} of sides) {
                setKey(key, false);
            }
          };
    
          const checkSides = (e) => {
            for (const {elem, key} of sides) {
              let pressed = false;
              const rect = elem.getBoundingClientRect();
              for (const touch of e.touches) {
                const x = touch.clientX;
                const y = touch.clientY;
                const inRect = x >= rect.left && x < rect.right &&
                               y >= rect.top && y < rect.bottom;
                if (inRect) {
                  pressed = true;
                }
              }
              setKey(key, pressed);
            }
          };
    
          const uiElem = document.querySelector('#ui');
          uiElem.addEventListener('touchstart', (e) => {
            e.preventDefault();
            checkSides(e);
          }, {passive: false});
          uiElem.addEventListener('touchmove', (e) => {
            e.preventDefault();  // prevent scroll
            checkSides(e);
          }, {passive: false});
          uiElem.addEventListener('touchend', () => {
            clearKeys();
          });
    
          function handleMouseMove(e) {
            e.preventDefault();
            checkSides({
              touches: [e],
            });
          }
    
          function handleMouseUp() {
            clearKeys();
            window.removeEventListener('mousemove', handleMouseMove, {passive: false});
            window.removeEventListener('mouseup', handleMouseUp);
          }
    
          uiElem.addEventListener('mousedown', (e) => {
            // this is needed because we call preventDefault();
            // we also gave the canvas a tabindex so it can
            // become the focus
            canvas.focus();
            handleMouseMove(e);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
          }, {passive: false});
        }
        update() {
          for (const keyState of Object.values(this.keys)) {
            if (keyState.justPressed) {
              keyState.justPressed = false;
            }
          }
        }
      }
    
      function* waitFrames(numFrames) {  // eslint-disable-line no-unused-vars
        while (numFrames > 0) {
          --numFrames;
          yield;
        }
      }
    
      function* waitSeconds(duration) {
        while (duration > 0) {
          duration -= globals.deltaTime;
          yield;
        }
      }
    
      class CoroutineRunner {
        constructor() {
          this.generatorStacks = [];
          this.addQueue = [];
          this.removeQueue = new Set();
        }
        isBusy() {
          return this.addQueue.length + this.generatorStacks.length > 0;
        }
        add(generator, delay = 0) {
          const genStack = [generator];
          if (delay) {
            genStack.push(waitSeconds(delay));
          }
          this.addQueue.push(genStack);
        }
        remove(generator) {
          this.removeQueue.add(generator);
        }
        update() {
          this._addQueued();
          this._removeQueued();
          for (const genStack of this.generatorStacks) {
            const main = genStack[0];
            // Handle if one coroutine removes another
            if (this.removeQueue.has(main)) {
              continue;
            }
            while (genStack.length) {
              const topGen = genStack[genStack.length - 1];
              const {value, done} = topGen.next();
              if (done) {
                if (genStack.length === 1) {
                  this.removeQueue.add(topGen);
                  break;
                }
                genStack.pop();
              } else if (value) {
                genStack.push(value);
              } else {
                break;
              }
            }
          }
          this._removeQueued();
        }
        _addQueued() {
          if (this.addQueue.length) {
            this.generatorStacks.splice(this.generatorStacks.length, 0, ...this.addQueue);
            this.addQueue = [];
          }
        }
        _removeQueued() {
          if (this.removeQueue.size) {
            this.generatorStacks = this.generatorStacks.filter(genStack => !this.removeQueue.has(genStack[0]));
            this.removeQueue.clear();
          }
        }
      }
    
      function removeArrayElement(array, element) {
        const ndx = array.indexOf(element);
        if (ndx >= 0) {
          array.splice(ndx, 1);
        }
      }
    
      class SafeArray {
        constructor() {
          this.array = [];
          this.addQueue = [];
          this.removeQueue = new Set();
        }
        get isEmpty() {
          return this.addQueue.length + this.array.length > 0;
        }
        add(element) {
          this.addQueue.push(element);
        }
        remove(element) {
          this.removeQueue.add(element);
        }
        forEach(fn) {
          this._addQueued();
          this._removeQueued();
          for (const element of this.array) {
            if (this.removeQueue.has(element)) {
              continue;
            }
            fn(element);
          }
          this._removeQueued();
        }
        _addQueued() {
          if (this.addQueue.length) {
            this.array.splice(this.array.length, 0, ...this.addQueue);
            this.addQueue = [];
          }
        }
        _removeQueued() {
          if (this.removeQueue.size) {
            this.array = this.array.filter(element => !this.removeQueue.has(element));
            this.removeQueue.clear();
          }
        }
      }
    
      class GameObjectManager {
        constructor() {
          this.gameObjects = new SafeArray();
        }
        createGameObject(parent, name) {
          const gameObject = new GameObject(parent, name);
          this.gameObjects.add(gameObject);
          return gameObject;
        }
        removeGameObject(gameObject) {
          this.gameObjects.remove(gameObject);
        }
        update() {
          this.gameObjects.forEach(gameObject => gameObject.update());
        }
      }
    
      const kForward = new window.THREE.Vector3(0, 0, 1);
      const globals = {
        camera,
        canvas,
        debug: false,
        time: 0,
        moveSpeed: 16,
        deltaTime: 0,
        player: null,
        congaLine: [],
      };
      const gameObjectManager = new GameObjectManager();
      const inputManager = new InputManager();
    
      class GameObject {
        constructor(parent, name) {
          this.name = name;
          this.components = [];
          this.transform = new window.THREE.Object3D();
          this.transform.name = name;
          parent.add(this.transform);
        }
        addComponent(ComponentType, ...args) {
          const component = new ComponentType(this, ...args);
          this.components.push(component);
          return component;
        }
        removeComponent(component) {
          removeArrayElement(this.components, component);
        }
        getComponent(ComponentType) {
          return this.components.find(c => c instanceof ComponentType);
        }
        update() {
          for (const component of this.components) {
            component.update();
          }
        }
      }
    
      // Base for all components
      class Component {
        constructor(gameObject) {
          this.gameObject = gameObject;
        }
        update() {
        }
      }
    
      class CameraInfo extends Component {
        constructor(gameObject) {
          super(gameObject);
          this.projScreenMatrix = new window.THREE.Matrix4();
          this.frustum = new window.THREE.Frustum();
        }
        update() {
          const {camera} = globals;
          this.projScreenMatrix.multiplyMatrices(
              camera.projectionMatrix,
              camera.matrixWorldInverse);
          this.frustum.setFromMatrix(this.projScreenMatrix);
        }
      }
    
      class SkinInstance extends Component {
        constructor(gameObject, model) {
          super(gameObject);
          this.model = model;
          this.animRoot = window.THREE.SkeletonUtils.clone(this.model.gltf.scene);
          this.mixer = new window.THREE.AnimationMixer(this.animRoot);
          gameObject.transform.add(this.animRoot);
          this.actions = {};
        }
        setAnimation(animName) {
          const clip = this.model.animations[animName];
          // turn off all current actions
          for (const action of Object.values(this.actions)) {
            action.enabled = false;
          }
          // get or create existing action for clip
          const action = this.mixer.clipAction(clip);
          action.enabled = true;
          action.reset();
          action.play();
          this.actions[animName] = action;
        }
        update() {
          this.mixer.update(globals.deltaTime);
        }
      }
    
      class FiniteStateMachine {
        constructor(states, initialState) {
          this.states = states;
          this.transition(initialState);
        }
        get state() {
          return this.currentState;
        }
        transition(state) {
          const oldState = this.states[this.currentState];
          if (oldState && oldState.exit) {
            oldState.exit.call(this);
          }
          this.currentState = state;
          const newState = this.states[state];
          if (newState.enter) {
            newState.enter.call(this);
          }
        }
        update() {
          const state = this.states[this.currentState];
          if (state.update) {
            state.update.call(this);
          }
        }
      }
    
      const gui = new window.dat.GUI();
      gui.add(globals, 'debug').onChange(showHideDebugInfo);
      gui.close();
    
      const labelContainerElem = document.querySelector('#labels');
      function showHideDebugInfo() {
        labelContainerElem.style.display = globals.debug ? '' : 'none';
      }
      showHideDebugInfo();
    
      class StateDisplayHelper extends Component {
        constructor(gameObject, size) {
          super(gameObject);
          this.elem = document.createElement('div');
          labelContainerElem.appendChild(this.elem);
          this.pos = new window.THREE.Vector3();
    
          this.helper = new window.THREE.PolarGridHelper(size / 2, 1, 1, 16);
          gameObject.transform.add(this.helper);
        }
        setState(s) {
          this.elem.textContent = s;
        }
        setColor(cssColor) {
          this.elem.style.color = cssColor;
          this.helper.material.color.set(cssColor);
        }
        update() {
          this.helper.visible = globals.debug;
          if (!globals.debug) {
            return;
          }
          const {pos} = this;
          const {transform} = this.gameObject;
          const {canvas} = globals;
          pos.copy(transform.position);
    
          // get the normalized screen coordinate of that position
          // x and y will be in the -1 to +1 range with x = -1 being
          // on the left and y = -1 being on the bottom
          pos.project(globals.camera);
    
          // convert the normalized position to CSS coordinates
          const x = (pos.x *  .5 + .5) * canvas.clientWidth;
          const y = (pos.y * -.5 + .5) * canvas.clientHeight;
    
          // move the elem to that position
          this.elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
        }
      }
    
      function rand(min, max) {
        if (max === undefined) {
          max = min;
          min = 0;
        }
        return Math.random() * (max - min) + min;
      }
    
      function makeTextTexture(str) {
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.canvas.width = 64;
        ctx.canvas.height = 64;
        ctx.font = '60px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#FFF';
        ctx.fillText(str, ctx.canvas.width / 2, ctx.canvas.height / 2);
        return new window.THREE.CanvasTexture(ctx.canvas);
      }
      const noteTexture = makeTextTexture('???');
    
      class Note extends Component {
        constructor(gameObject) {
          super(gameObject);
          const {transform} = gameObject;
          const noteMaterial = new window.THREE.SpriteMaterial({
            color: new window.THREE.Color().setHSL(rand(1), 1, 0.5),
            map: noteTexture,
            side: window.THREE.DoubleSide,
            transparent: true,
          });
          const note = new window.THREE.Sprite(noteMaterial);
          note.scale.setScalar(3);
          transform.add(note);
          this.runner = new CoroutineRunner();
          const direction = new window.THREE.Vector3(rand(-0.2, 0.2), 1, rand(-0.2, 0.2));
    
          function* moveAndRemove() {
            for (let i = 0; i < 60; ++i) {
              transform.translateOnAxis(direction, globals.deltaTime * 10);
              noteMaterial.opacity = 1 - (i / 60);
              yield;
            }
            transform.parent.remove(transform);
            gameObjectManager.removeGameObject(gameObject);
          }
    
          this.runner.add(moveAndRemove());
        }
        update() {
          this.runner.update();
        }
      }
    
      class Player extends Component {
        constructor(gameObject) {
          super(gameObject);
          const model = models.knight;
          globals.playerRadius = model.size / 2;
          this.text = gameObject.addComponent(StateDisplayHelper, model.size);
          this.skinInstance = gameObject.addComponent(SkinInstance, model);
          this.skinInstance.setAnimation('Run');
          this.turnSpeed = globals.moveSpeed / 4;
          this.offscreenTimer = 0;
          this.maxTimeOffScreen = 3;
          this.runner = new CoroutineRunner();
    
          function* emitNotes() {
            for (;;) {
              yield waitSeconds(rand(0.5, 1));
              const noteGO = gameObjectManager.createGameObject(scene, 'note');
              noteGO.transform.position.copy(gameObject.transform.position);
              noteGO.transform.position.y += 5;
              noteGO.addComponent(Note);
            }
          }
    
          this.runner.add(emitNotes());
        }
        update() {
          this.runner.update();
          const {deltaTime, moveSpeed, cameraInfo} = globals;
          const {transform} = this.gameObject;
          const delta = (inputManager.keys.left.down  ?  1 : 0) +
                        (inputManager.keys.right.down ? -1 : 0);
          transform.rotation.y += this.turnSpeed * delta * deltaTime;
          transform.translateOnAxis(kForward, moveSpeed * deltaTime);
    
          const {frustum} = cameraInfo;
          if (frustum.containsPoint(transform.position)) {
            this.offscreenTimer = 0;
          } else {
            this.offscreenTimer += deltaTime;
            if (this.offscreenTimer >= this.maxTimeOffScreen) {
              transform.position.set(0, 0, 0);
            }
          }
        }
      }
    
      // Returns true of obj1 and obj2 are close
      function isClose(obj1, obj1Radius, obj2, obj2Radius) {
        const minDist = obj1Radius + obj2Radius;
        const dist = obj1.position.distanceTo(obj2.position);
        return dist < minDist;
      }
    
      // keeps v between -min and +min
      function minMagnitude(v, min) {
        return Math.abs(v) > min
            ? min * Math.sign(v)
            : v;
      }
    
      const aimTowardAndGetDistance = function() {
        const delta = new window.THREE.Vector3();
    
        return function aimTowardAndGetDistance(source, targetPos, maxTurn) {
          delta.subVectors(targetPos, source.position);
          // compute the direction we want to be facing
          const targetRot = Math.atan2(delta.x, delta.z) + Math.PI * 1.5;
          // rotate in the shortest direction
          const deltaRot = (targetRot - source.rotation.y + Math.PI * 1.5) % (Math.PI * 2) - Math.PI;
          // make sure we don't turn faster than maxTurn
          const deltaRotation = minMagnitude(deltaRot, maxTurn);
          // keep rotation between 0 and Math.PI * 2
          source.rotation.y = window.THREE.Math.euclideanModulo(
              source.rotation.y + deltaRotation, Math.PI * 2);
          // return the distance to the target
          return delta.length();
        };
      }();
    
      class Animal extends Component {
        constructor(gameObject, model) {
          super(gameObject);
          this.helper = gameObject.addComponent(StateDisplayHelper, model.size);
          const hitRadius = model.size / 2;
          const skinInstance = gameObject.addComponent(SkinInstance, model);
          skinInstance.mixer.timeScale = globals.moveSpeed / 4;
          const transform = gameObject.transform;
          const playerTransform = globals.player.gameObject.transform;
          const maxTurnSpeed = Math.PI * (globals.moveSpeed / 4);
          const targetHistory = [];
          let targetNdx = 0;
    
          function addHistory() {
            const targetGO = globals.congaLine[targetNdx];
            const newTargetPos = new window.THREE.Vector3();
            newTargetPos.copy(targetGO.transform.position);
            targetHistory.push(newTargetPos);
          }
    
          this.fsm = new FiniteStateMachine({
            idle: {
              enter: () => {
                skinInstance.setAnimation('Idle');
              },
              update: () => {
                // check if player is near
                if (isClose(transform, hitRadius, playerTransform, globals.playerRadius)) {
                  this.fsm.transition('waitForEnd');
                }
              },
            },
            waitForEnd: {
              enter: () => {
                skinInstance.setAnimation('Jump');
              },
              update: () => {
                // get the gameObject at the end of the conga line
                const lastGO = globals.congaLine[globals.congaLine.length - 1];
                const deltaTurnSpeed = maxTurnSpeed * globals.deltaTime;
                const targetPos = lastGO.transform.position;
                aimTowardAndGetDistance(transform, targetPos, deltaTurnSpeed);
                // check if last thing in conga line is near
                if (isClose(transform, hitRadius, lastGO.transform, globals.playerRadius)) {
                  this.fsm.transition('goToLast');
                }
              },
            },
            goToLast: {
              enter: () => {
                // remember who we're following
                targetNdx = globals.congaLine.length - 1;
                // add ourselves to the conga line
                globals.congaLine.push(gameObject);
                skinInstance.setAnimation('Walk');
              },
              update: () => {
                addHistory();
                // walk to the oldest point in the history
                const targetPos = targetHistory[0];
                const maxVelocity = globals.moveSpeed * globals.deltaTime;
                const deltaTurnSpeed = maxTurnSpeed * globals.deltaTime;
                const distance = aimTowardAndGetDistance(transform, targetPos, deltaTurnSpeed);
                const velocity = distance;
                transform.translateOnAxis(kForward, Math.min(velocity, maxVelocity));
                if (distance <= maxVelocity) {
                  this.fsm.transition('follow');
                }
              },
            },
            follow: {
              update: () => {
                addHistory();
                // remove the oldest history and just put ourselves there.
                const targetPos = targetHistory.shift();
                transform.position.copy(targetPos);
                const deltaTurnSpeed = maxTurnSpeed * globals.deltaTime;
                aimTowardAndGetDistance(transform, targetHistory[0], deltaTurnSpeed);
              },
            },
          }, 'idle');
        }
        update() {
          this.fsm.update();
          const dir = window.THREE.Math.radToDeg(this.gameObject.transform.rotation.y);
          this.helper.setState(`${this.fsm.state}:${dir.toFixed(0)}`);
        }
      }
    
      function init() {
        // hide the loading bar
        const loadingElem = document.querySelector('#loading');
        loadingElem.style.display = 'none';
    
        prepModelsAndAnimations();
    
        {
          const gameObject = gameObjectManager.createGameObject(camera, 'camera');
          globals.cameraInfo = gameObject.addComponent(CameraInfo);
        }
    
        {
          const gameObject = gameObjectManager.createGameObject(scene, 'player');
          globals.player = gameObject.addComponent(Player);
          globals.congaLine = [gameObject];
        }
    
        const animalModelNames = [
          'pig',
          'cow',
          'llama',
          'pug',
          'sheep',
          'zebra',
          'horse',
        ];
        const base = new window.THREE.Object3D();
        const offset = new window.THREE.Object3D();
        base.add(offset);
    
        // position animals in a spiral.
        const numAnimals = 28;
        const arc = 10;
        const b = 10 / (2 * Math.PI);
        let r = 10;
        let phi = r / b;
        for (let i = 0; i < numAnimals; ++i) {
          const name = animalModelNames[rand(animalModelNames.length) | 0];
          const gameObject = gameObjectManager.createGameObject(scene, name);
          gameObject.addComponent(Animal, models[name]);
          base.rotation.y = phi;
          offset.position.x = r;
          offset.updateWorldMatrix(true, false);
          offset.getWorldPosition(gameObject.transform.position);
          phi += arc / r;
          r = b * phi;
        }
      }
    
      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
    
      let then = 0;
      function render(now) {
        // convert to seconds
        globals.time = now * 0.001;
        // make sure delta time isn't too big.
        globals.deltaTime = Math.min(globals.time - then, 1 / 20);
        then = globals.time;
    
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
    
        gameObjectManager.update();
        inputManager.update();
    
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
      }
    
      requestAnimationFrame(render);
    }
    
    main();
    
  }, []);

  return (
    <div style={{backgroundColor: 'black'}}>
      <h1 className={classes.h1}>Hello</h1>
      {/* <div id='three' className={classes.div}/>
      <canvas id="c" style={{width: '100%'}}></canvas> */}
      <canvas id="d" tabIndex="1" style={{width: '100%'}}></canvas>
      <div id="ui">
        <div id="left"><img src="https://r105.threejsfundamentals.org/threejs/resources/images/left.svg" /></div>
        <div style={{flex: '0 0 40px'}}></div>
        <div id="right"><img src="https://r105.threejsfundamentals.org/threejs/resources/images/right.svg" /></div>
      </div>
      <div id="loading">
        <div>
          <div>...loading...</div>
          <div className="progress"><div id="progressbar"></div></div>
        </div>
      </div>
      <div id="labels"></div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  h1: {
    color: 'blue'
  },
  div: {
    width: 300,
    height: 300,
    marginLeft: 100
  }
}))

export default App;
