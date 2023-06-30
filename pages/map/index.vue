<template>
  <div>
    <Navbar :active-index="'5'"/>
    <div id="hehe" class="layout"/>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar/Navbar.vue';
import * as THREE from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export default {
  components:{
    Navbar
  },
  data(){
    return{

    }
  },
  mounted(){
    let mixer;

    const clock = new THREE.Clock();
    const container = document.getElementById( 'hehe' );


    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbfe3dd );
    scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.set( 0, 0, 5);

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 0.5, 0 );
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( 'jsm/libs/draco/gltf/' );

    const loader = new GLTFLoader();
    loader.setDRACOLoader( dracoLoader );
    loader.load( '10chains.gltf', function ( gltf ) {

      const model = gltf.scene;
      model.position.set( 0, 0, 0 );
      model.scale.set( 0.5, 0.5, 0.5 );
      scene.add( model );

      mixer = new THREE.AnimationMixer( model );
      for(let index = 0; index < gltf.animations.length; index++){
        mixer.clipAction( gltf.animations[ index ] ).play();
      }

      animate();

    }, undefined, function ( e ) {
      console.error( e );
    } );


    window.onresize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    };


    function animate() {
      requestAnimationFrame( animate );
      const delta = clock.getDelta();
      mixer.update( delta );
      controls.update();
      renderer.render( scene, camera );
    }
  }
}
</script>

<style scoped>

</style>