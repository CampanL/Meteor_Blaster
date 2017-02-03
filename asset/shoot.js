$("canvas").mousedown(function()
	{
		if (shoot_tab.length<1) 
		{
			shoot_tab.push(shoot(spaceship.position))
		}
	})
function shoot(pos)
{
	var shoot_sound= new Audio('asset/sound/shoot.ogg');
	shoot_sound.play();
	var geometry = new THREE.CylinderGeometry( .5, .5, 6, 16 );
	var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	var cylinder = new THREE.Mesh( geometry, material );
	scene.add( cylinder );
	cylinder.position.x = pos.x+10
	cylinder.position.y = pos.y
	cylinder.position.z = pos.z
	cylinder.rotation.z = Math.PI/2;
	return cylinder;
}