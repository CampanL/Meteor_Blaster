var	nb_click=0
$("canvas").mousedown(function()
	{
		if (shoot_tab.length<3) 
		{
			shoot_tab.push(shoot(spaceship.position))
		}
	})

function shoot(pos)
{
	var geometry = new THREE.CylinderGeometry( .5, .5, 6, 16 );
	var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	var cylinder = new THREE.Mesh( geometry, material );
	scene.add( cylinder );
	cylinder.rotation.z = Math.PI/2;
	cylinder.position.x = pos.x+10
	cylinder.position.y = pos.y
	cylinder.position.z = pos.z
	return cylinder;
}