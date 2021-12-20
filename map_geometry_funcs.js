'use strict';




// Return the absolute x coordinate of the centre of the hex of coordinate unitX, unitY
function xMapCoordFromUnitCoord (unitX, unitY)
{
  if ((unitY % 2) == 0)
    return Math.floor ((unitX + 0.5) * hexWidth);  // Add half hex wodth so that we return the center of the hex
  else
    return (1 + unitX) * hexWidth;                 // On an odd row, add also another half hex width as the hexes are shifted half width right
}

// Return the absolute y coordinate of the centre of the hex of coordinate unitX, unitY
function yMapCoordFromUnitCoord (unitX, unitY)
{
  return 0.75 * hexY * 2 * unitY + hexHalfY;
}

function xUnitCoordFromMapCoord (mapX, mapY)
{
  const y = yUnitCoordFromMapCoord (mapX, mapY);

//  console.log (mapX, mapY, y);

  if ((y % 2) == 0)
    return Math.floor (mapX / hexWidth);
  else
    return Math.floor ((mapX - hexHalfX) / hexWidth);
}

function yUnitCoordFromMapCoord (mapX, mapY)
{
  const offsetToRemove = hexHalfY;
  const y1 = mapY - offsetToRemove;
  
  if (y1 < 0)
  {
    return 0;
  }

  const result = Math.floor (y1 / (hexHalfY + hexY));
  if (isNaN (result))
    console.log (mapX, mapY, y1, result)
  
  return result; 
}


function sixHexesAround (centerHex) {
  let result = [];
  const isOddRow = centerHex.y % 2;
  
  for (let i=0; i < hexAround.length; i++) {
    let newHexCoords = { x:centerHex.x, y:centerHex.y};
     
    newHexCoords.x += hexAround[i].offset[isOddRow].x; 
    newHexCoords.y += hexAround[i].offset[isOddRow].y; 
    result.push (newHexCoords); 
  }
  return result;
}


// Return the set of hexes surrounding the given hex within radius. 
// Center hex is not returned
// The resulting set doesn't contain duplicates
//

function hexSetAround (centerHex, radius) {
  return _hexSetAroundIterative (centerHex, radius, []);
}


function _hexSetAroundIterative (centerHex, radius, dummy) {
  let result = [centerHex];
  let i = 0;

  while (i < result.length) {
    var temp = sixHexesAround (result[i]);

    // Termination clause: the distance from the sixHexAround[0] and centerHex > radius
    if (temp[0].x - centerHex.x > radius) {
      break;
    } 
    
    for (let j=0; j < temp.length; j++) {
      if (!isInSet (temp[j], result)) {
        result.push (temp[j]);      
      }    
    }
               
    i++;
  }

  return result;
}


function _hexSetAroundRecursive (centerHex, radius, result) {
  let t1 = [];
  
  if (radius == 0)
    return [];
    
  if (radius == 1) {
    t1 = sixHexesAround (centerHex);
      
    const newSet = addElemToArrayWODuplicates (t1, result);

    return newSet;
  }
  else {      // Radius >= 2
    t1 = sixHexesAround (centerHex);
    
    let newSet = addElemToArrayWODuplicates (t1, result);

    for (var i=0; i < t1.length; i++) {
      t1 = _hexSetAroundRecursive (t1[i], radius - 1, result);       
      addElemToArrayWODuplicates (t1, result);
    }
    
    return result;
  }
}

// TODO: verify if we can use OOB function. We need to check whether { x1, y1 } == { x2, y2 } works
function isInSet (elem, set) {
  for (let i=0; i<set.length; i++)
    if (elem.x == set[i].x && elem.y == set[i].y)
      return true;
      
  return false;
}


// Add a set of hexes (newSet) to result, avoiding duplicates 
function addElemToArrayWODuplicates (newSet, result) {
  for (let i=0; i < newSet.length; i++)
    if (!isInSet (newSet[i], result))
      result.push (newSet[i]);
      
  return result;
}



