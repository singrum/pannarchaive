let camera, scene, renderer, controls;
window.addEventListener("resize", onResize, false);
function onResize(){
    camera.aspect = window.innerWidth / (window.innerHeight);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function init(){

    /////////////////swife detector////////////////////////////////////////
    let curr_direction = 0
    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null;                                                        
    let yDown = null;

    function getTouches(evt) {
    return evt.touches ||             
            evt.originalEvent.touches; 
    }                                                     
                                                                            
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                
                                                                            
    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        let xUp = evt.touches[0].clientX;                                    
        let yUp = evt.touches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                curr_direction = 3;
            } else {
                curr_direction = 2;
            }                       
        } else {
            if ( yDiff > 0 ) {
                curr_direction = 0;
            } else { 
                curr_direction = 1;
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };
    ////////////////////////////////////////////////////////////////


    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(-200,200,50);
    camera.lookAt(scene.position);


    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 70);
    // spotLight.castShadow = true;
    scene.add(spotLight);
    


    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100,100,1,1),
        new THREE.MeshLambertMaterial({color: 0xffffff})
        );
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0,0,0);
    // plane.receiveShadow = true;
    scene.add(plane);

    const radius = 2;
    let apple = new THREE.Mesh(
        new THREE.SphereGeometry( radius, 32, 16 ),
        new THREE.MeshLambertMaterial({color: 0xffff00})
    );
    appleCoordinate = {x:0, z: 0};
    scene.add(apple);
    
    const xLength = 5;
    const yLength = 10;
    const zLength = 15;
    let cube = new THREE.Mesh(
        new THREE.BoxGeometry(xLength,yLength,zLength),
        new THREE.MeshLambertMaterial({color: 0x00ffff})
    );
    cube.matrixAutoUpdate = false;
    // cube.castShadow = true;
    scene.add(cube);

    let i = 0;
    const increment = 10;
    let start = true
    let worldX = xLength, worldY = yLength, worldZ = zLength;
    let length = {x : xLength, y : yLength, z : zLength};
    let coordinate = {x : 0, z : 0};
    let indicator = {x : 0, y : 1, z : 2};
    let direction = 0;
    let staticMatrix = new THREE.Matrix4();
    function renderScene(){
        
        camera.lookAt(scene.position);
        if(start){
            i += 0.05;
            //x+
            if(direction === 0){
                cube.matrix = new THREE.Matrix4().makeTranslation(worldX/2 + coordinate.x,0,coordinate.z).multiply(
                    new THREE.Matrix4().makeRotationZ(-i).multiply(
                    new THREE.Matrix4().makeTranslation(-worldX/2,worldY/2,0).multiply(
                        staticMatrix
                    )))
                if (i >= Math.PI/2){
                    start = false
                    coordinate.x += worldX/2 + worldY/2;
                    staticMatrix = new THREE.Matrix4().makeRotationZ(Math.PI / 2).multiply(staticMatrix);
                    [worldX, worldY] = [worldY, worldX];
                    [indicator.x, indicator.y] = [indicator.y, indicator.x]
                }
            }            
            //x-
            else if(direction === 1){
                cube.matrix = new THREE.Matrix4().makeTranslation(-worldX/2 + coordinate.x,0,coordinate.z).multiply(
                    new THREE.Matrix4().makeRotationZ(i).multiply(
                    new THREE.Matrix4().makeTranslation(worldX/2,worldY/2,0).multiply(
                        staticMatrix
                    )))
                if (i >= Math.PI/2){
                    start = false
                    coordinate.x -= worldX/2 + worldY/2;
                    staticMatrix = new THREE.Matrix4().makeRotationZ(Math.PI / 2).multiply(staticMatrix);
                    [worldX, worldY] = [worldY, worldX];
                    [indicator.x, indicator.y] = [indicator.y, indicator.x]
                }                
            }            
            //z+
            else if(direction === 2){
                cube.matrix = new THREE.Matrix4().makeTranslation(coordinate.x,0,worldZ/2 + coordinate.z).multiply(
                    new THREE.Matrix4().makeRotationX(i).multiply(
                    new THREE.Matrix4().makeTranslation(0,worldY/2, -worldZ/2).multiply(
                        staticMatrix
                    )))
                if (i >= Math.PI/2){
                    start = false
                    coordinate.z += worldZ/2 + worldY/2;
                    staticMatrix = new THREE.Matrix4().makeRotationX(Math.PI / 2).multiply(staticMatrix);
                    [worldZ, worldY] = [worldY, worldZ];
                    [indicator.z, indicator.y] = [indicator.y, indicator.z]
                }
            }
            //z-
            else if(direction === 3){
                cube.matrix = new THREE.Matrix4().makeTranslation(coordinate.x,0,-worldZ/2 + coordinate.z).multiply(
                    new THREE.Matrix4().makeRotationX(-i).multiply(
                    new THREE.Matrix4().makeTranslation(0,worldY/2, worldZ/2).multiply(
                        staticMatrix
                    )))
                if (i >= Math.PI/2){
                    start = false
                    coordinate.z -= worldZ/2 + worldY/2;
                    staticMatrix = new THREE.Matrix4().makeRotationX(Math.PI / 2).multiply(staticMatrix);
                    [worldZ, worldY] = [worldY, worldZ];
                    [indicator.z, indicator.y] = [indicator.y, indicator.z]
                }
            }


            
        }
        else{
            if ((Math.abs(appleCoordinate.x - coordinate.x) <= worldX/2 + radius) && 
            (Math.abs(appleCoordinate.z - coordinate.z) <= worldZ/2 + radius)){
                if(indicator.y === 0){
                    staticMatrix = new THREE.Matrix4().makeScale(x = (length.x + increment) / length.x, y = 1, z = 1).multiply(staticMatrix);
                    length.x += increment;
                }
                else if(indicator.y === 1){
                    staticMatrix = new THREE.Matrix4().makeScale(x = 1, y = (length.y + increment) / length.y, z = 1).multiply(staticMatrix);
                    length.y += increment;
                }
                else if(indicator.y === 2){
                    staticMatrix = new THREE.Matrix4().makeScale(x = 1, y = 1, z = (length.z + increment) / length.z).multiply(staticMatrix);
                    length.z += increment;
                }
                console.log(indicator)
                worldY += increment;
            }
            direction = curr_direction;
            i = 0;
            start = true;
        }
        // controls.update();
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    
    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    // controls = new THREE.OrbitControls( camera, renderer.domElement );
    renderScene();
}
window.onload = init;