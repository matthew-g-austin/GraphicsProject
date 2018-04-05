"use strict";

var canvas;
var engine;
var scene;

document.addEventListener("DOMContentLoaded", startBabylonJs, false);

function startBabylonJs(){
    
    

    if(BABYLON.Engine.isSupported()){
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);
    
        window.addEventListener("resize", function(){
            engine.resize();
        });

        scene = new BABYLON.Scene(engine);
        
        //var cam  = new BABYLON.FreeCamera("freecam", new BABYLON.Vector3(0,2, -10), scene);
        
        var cam = new BABYLON.ArcRotateCamera("arcCam", 1, 0.8, 50, new BABYLON.Vector3(0,0,0), scene);
        cam.attachControl(canvas);
        cam.checkCollisions = true;
        //cam.applyGravity = true;

        // var assetManager = new BABYLON.AssetsManager(scene);
        // var knucklesTask = assetManager.addMeshTask("knucklesTask", "", "./", "Knuckles.obj");
        
        // knucklesTask.onSuccess = function(task){
        //     task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
        // }

        // knucklesTask.onError = function (task, message, exception){
        //     console.log(message, exception);
        // }
        
        // var simpleMesh = new BABYLON.Mesh("myMesh", scene);
        
        // var plane = BABYLON.MeshBuilder.CreatePlane("plane", {}, scene);
        // plane.applyToMesh(simpleMesh);

	var base = BABYLON.Mesh.CreateSphere("sphere", 16, 12, scene);

	base.position.y += 6;
	base.position.x -= 50;
	base.position.z += 50;

	var numCube = 10;
	
	var cubes = [];
	for(var i = 0; i < numCube; i++){
            var cube = BABYLON.Mesh.CreateBox("cube", 2, scene);
	
            cube.position.y += 2;
	    cube.position.x += 50;
	    cube.position.z -= 50;
	    cubes.push(cube);
	}
	
	var makeCtr = 0;
	var makeID = setInterval(function (){
	    move(cubes[makeCtr]);
	    makeCtr++;
	    console.log('counter', makeCtr);
	    if(makeCtr === numCube)
		clearInterval(makeID);
	}, 1500);


	function move (cube){
	    var moveCtr = 0;
	    var moveid = setInterval(function(){
		cube.position.x -= 1;
		cube.position.z += 1;
		moveCtr++;
		if(moveCtr === 100){
		    clearInterval(moveid);
		}
	    }, 300);
	}
	
	
	
        //cube.position.y += 5;
        cube.checkCollisions = true;
        
        var light = new BABYLON.PointLight("pLight", new BABYLON.Vector3(5, 10, -5));
        light.diffuse = BABYLON.Color3.White();
        
        var hemi = new BABYLON.HemisphericLight("hLight", BABYLON.Vector3.Zero(), scene);
        var ground = BABYLON.Mesh.CreateGround("floor", 100, 100, 100, scene);
        ground.checkCollisions = true;
        
        engine.runRenderLoop(function(){
        //    cube.rotation.x += 0.01;
          //  cube.rotation.y += 0.01;
            
            scene.render();
        });
        
    }
    
}

function CreatePlace(size){
    var indices = [];
    var positions= [];
    var normals = [];
    var uvs = [];
    
    size = size || 1;
    
    //Vertices
    var halfSize = size / 2.0;
    positions.push(-halfSize, -halfSize, 0);
    normals.push(0, 0, -1.0);
    uvs.push(0.0, 0.0);
    
    
    positions.push(halfSize, -halfSize, 0);
    normals.push(0, 0, -1.0);
    uvs.push(1.0, 0.0);
    
    positions.push(halfSize, halfSize, 0);
    normals.push(0,0, -1.0);
    uvs.push(1.0, 1.0);
    
    
    //Indicies
    indices.push(0);
    indices.push(1);
    indices.push(2);
    
    indices.push(0);
    indices.push(2);
    indices.push(3);
    
    var vertexData = new BABYLON.VertexData();
    
    vertexData.indices = indices;
    vertexData.positions = positions;
    vertexData.normals = normals;
    vertexData.uvs = uvs;
    
    return vertexData;
    
    
}


// var createScene = function (){
//     //Creates basic scene
//     var scene = new BABYLON.Scene(engine);


//     var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);


//     camera.setTarger(new BABYLON.Vector3.Zero());

//     camera.attachControl(canvas, false);

//     var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

//     light.intensity = 0.7;

//     var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

//     sphere.position.y = 1;

//     var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

//     return scene;


// }
