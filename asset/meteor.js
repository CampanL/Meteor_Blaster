function random(min, max)
{
	return Math.random()*(max-min)+min;
}

function meteor()
{
	var geometry = new THREE.SphereGeometry( random(5,10), 32, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xA59A90} );
	var sphere = new THREE.Mesh( geometry, material );
	scene.add( sphere );
	sphere.position.x= random(150, 200);
	sphere.position.z= random(-50,50);
	sphere.isDestroy=false;
	return sphere;
}