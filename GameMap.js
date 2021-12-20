let data = [];
let loadComplete = false;

class GameMap
{
  constructor (sizeX, sizeY, hexEdgeSize, canvas)
  {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.canvas = canvas;
   
    this.hexHalfX = hexEdgeSize * 0.866025404;
    this.hexX     = this.hexHalfX * 2;
    this.hexWidth = this.hexX;
  
    this.hexHalfY  = hexEdgeSize / 2;
    this.hexY      = hexEdgeSize;
    this.hexHeight = hexEdgeSize * 2;
  
    this.yOffset = 0.1 * (this.hexHeight);   
    this.scale   =  (this.hexY * 2.0) / 100.0;

    this.terrainHexes = [];
    
    theCanvas.width  = this.sizeX * this.hexX + this.hexHalfX; 
    theCanvas.height = this.sizeY * (this.hexY + this.hexHalfY) + this.hexHalfY;

    this.ctx = theCanvas.getContext("2d");
    this.ctx.strokeStyle = "silver";
  }
  
  
  saveToFile ()
  {
    const str = JSON.stringify (this.terrainHexes);
    const a = document.createElement ("a");
    const file = new Blob([content], {type: 'text/plain'});

    a.href = URL.createObjectURL ('map.json');
    a.download = fileName;
    a.click();
  }
  
  loadFromFile (file)
  {
		let reader = new FileReader();

		reader.addEventListener ('load', function(e) 
		  {
	    		const str = e.target.result;
          data = JSON.parse (str);
          loadComplete = true;
  		});

		reader.readAsText(file);
		
		while (!loadComplete)
		{
		  
		}
		
		loadComplete = false;
  }
  
  
  clear ()
  {}
  
  drawGrid ()
  {
  
    for (let j = 0, y = 0; j < this.sizeY; j++)
    {
      let x = (j % 2) * this.hexHalfX;
  
      this.ctx.moveTo (x, y + this.hexHalfY);
      for (let i = 1; i < this.sizeX + 1; i++)
      {
        this.ctx.lineTo (x + this.hexHalfX, y);
        this.ctx.lineTo (x + this.hexX    , y + this.hexHalfY);
        this.ctx.stroke ();
        
        x += this.hexX;
      }   
      
      // Vertical bars
      x = (j % 2) * this.hexHalfX;
      this.ctx.moveTo (x, y + this.hexHalfY);
      for (let i = 0; i < this.sizeX + 1; i++)
      {
        this.ctx.moveTo (x, y + this.hexHalfY);
        this.ctx.lineTo (x, y + this.hexHalfY * 3);
        this.ctx.stroke ();
        
        x += this.hexX;
      }   
  
      y += this.hexHalfY * 3;
    }
  }
  
  decorateHex (mapX, mapY)
  {
    if (currentTool == null)
    {
      return;
    }
  
    // Convert client coordinates into map coordinates
    const x = this.xUnitCoordFromMapCoord (mapX, mapY - 105);  // Generalise. 105 is the height of the palette
    const y = this.yUnitCoordFromMapCoord (mapX, mapY - 105);
    
    // Search for hex (x, y) in the array terrainHex
    for (let hex of this.terrainHexes)
    {
      if (x == hex.x && y == hex.y)
      {
        // Hex already exists
        // Toggle the feature
        hex.toggleFeature (currentTool.id);
        
        if (hex.isClear ())
        {
          // The hex doesn't contain any feature - delete it
                
        }
        return;
      }
    }
  
    // Hex not found, add it
    // Add the feature
    const theHex = new MapHex (x, y); 
    theHex.addFeature (currentTool.id);
    this.terrainHexes.push (theHex);
  }

  

  // Return the absolute x coordinate of the centre of the hex of coordinate unitX, unitY
  xMapCoordFromUnitCoord (unitX, unitY)
  {
    if ((unitY % 2) == 0)
      return Math.floor ((unitX + 0.5) * this.hexWidth);  // Add half hex wodth so that we return the center of the hex
    else
      return (1 + unitX) * this.hexWidth;                 // On an odd row, add also another half hex width as the hexes are shifted half width right
  }

  // Return the absolute y coordinate of the centre of the hex of coordinate unitX, unitY
  yMapCoordFromUnitCoord (unitX, unitY)
  {
    return 0.75 * this.hexY * 2 * unitY + this.hexHalfY;
  }
  
  xUnitCoordFromMapCoord (mapX, mapY)
  {
    const y = this.yUnitCoordFromMapCoord (mapX, mapY);
  
    if ((y % 2) == 0)
      return Math.floor (mapX / this.hexWidth);
    else
      return Math.floor ((mapX - this.hexHalfX) / this.hexWidth);
  }
  
  yUnitCoordFromMapCoord (mapX, mapY)
  {
    const offsetToRemove = this.hexHalfY;
    const y1 = mapY;
    
    if (y1 < 0)
    {
      return 0;
    }
  
    const result = Math.floor (y1 / (3 * this.hexHalfY));
    if (isNaN (result))
      console.log (mapX, mapY, y1, result)
    
    return result; 
  }
  

}



