var secondes=0;
var death_sound= new Audio('asset/sound/dead.ogg');
var dead=false;
var timer = 0;
var minute = 0;
var limite = 0;
var container;
var shoot_tab =[];
var meteor_tab = [];
var raduis_tab = [];
var speed_tab = [];
var camera, scene, renderer;
var mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var spaceship;
init();
animate();
function init() 
{
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.y = 100;
	// scene
	scene = new THREE.Scene();
	var ambient = new THREE.AmbientLight( 0xffffff, .5 );
	scene.add( ambient );
	var directionalLight = new THREE.DirectionalLight( 0xffffff,0.3 );
	directionalLight.position.set( 0, 50, 0 );
	scene.add( directionalLight );
	// texture
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) 
	{
		console.log( item, loaded, total );
	};
	var texture = new THREE.Texture();
	var onProgress = function ( xhr ) 
	{
		if ( xhr.lengthComputable ) 
		{
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	var onError = function ( xhr ) 
	{
	};
	var loader = new THREE.ImageLoader( manager );
	loader.load( 'asset/textures/spaceship-texture.jpg', function ( image ) 
	{
		texture.image = image;
		texture.needsUpdate = true;
	} );
	// model
	var loader = new THREE.OBJLoader( manager );
	loader.load( 'asset/obj/wipeout-swiftkiller.obj', function ( object ) 
	{
		object.traverse( function ( child ) 
		{
			if ( child instanceof THREE.Mesh ) 
			{
				child.material.map = texture;
			}
		} );
		object.position.x = window.innerWidth/20*-1;
		scene.add( object );
		object.rotation.y = Math.PI/2*3;
		spaceship = object;
		return spaceship;
	}, onProgress, onError );
	//
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	window.addEventListener( 'resize', onWindowResize, false );

	var spriteMap = new THREE.TextureLoader().load( 'asset/img/background.jpg' );

	var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );

	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(1920, 1080, 1)

	scene.add( sprite );
	sprite.position.y = -600;
}
function onWindowResize() 
{
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - windowHalfX ) / 2;
	mouseY = ( event.clientY - windowHalfY ) / 2;
}
//

function animate() 
{
	requestAnimationFrame( animate );
	render();
}
function render() 
{
	camera.lookAt( scene.position );
	if (!dead) 
	{
		if (timer%600==0 && timer>0) 
		{
			meteor_tab.length=0;
			speed_tab.length=0;
			for(k=0;k<10*(minute+1);k++)
				{
					meteor_tab.push(meteor());
					speed_tab.push(random(1,3));
				};
		}


		spaceship.position.z = (mouseY/window.innerHeight)*200;

		for(var i=0;i<shoot_tab.length;i++)
		{
			shoot_tab[i].position.x +=3

			if (shoot_tab[i].position.x >150) 
			{
				scene.remove(shoot_tab[i]);
				shoot_tab.shift()
			}
		}

		for(j=0; j<meteor_tab.length;j++)
		{
			if(!meteor_tab[j].isDestroy)
			{
				meteor_tab[j].position.x-=speed_tab[j];

				if (meteor_tab[j].position.x<-160) 
				{
					scene.remove(meteor_tab[j]);
				}
				if (vecteur(meteor_tab[j], spaceship)<meteor_tab[j].geometry.boundingSphere.radius+4) 
				{
					dead=true;
					death_sound.play();
				}
				for(k=0;k<shoot_tab.length;k++)
				{
					if (vecteur(meteor_tab[j], shoot_tab[k])<meteor_tab[j].geometry.boundingSphere.radius) 
					{
						scene.remove(meteor_tab[j]);
						meteor_tab[j].isDestroy=true;
						scene.remove(shoot_tab[k]);
						shoot_tab.shift();
					}
				}
			}
		}

		timer++
		if (Math.floor(timer/60)==60) {minute++; timer=0}
		document.getElementById("score").innerHTML = "temps: "+minute+" : "+Math.floor(timer/60);
	}
	else{
		document.getElementById("text-death").innerHTML = "Vous avez perdu."
		document.getElementById('restart').innerHTML = "restart"
		document.getElementById('menu').innerHTML = "menu"
	}
	
	renderer.render( scene, camera );
}

function vecteur(a, b)
{
	var vecteur = Math.sqrt(Math.pow(a.position.x-b.position.x, 2)+Math.pow(a.position.z-b.position.z, 2));
	return vecteur;
}