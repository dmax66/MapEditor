class MapHex
{
  constructor (x, y) 
  {
    this.x = x;
    this.y = y;
    
    this.features = [];
    this.widgets =  [];
  }  
  

  toggleFeature (feature)
  {
    for (let f of this.features)
    {
      if (f == feature)
      {
        this.removeFeature (f);
        return;
      }    
    }
    
    // Feature not found, add it
    this.addFeature (feature);
  }


  addFeature (f)
  {
    const mapX = theMap.xMapCoordFromUnitCoord (this.x, this.y);
    const mapY = theMap.yMapCoordFromUnitCoord (this.x, this.y);

    const d = document.createElement ("DIV");
    d.setAttribute ("class", "terrain-icon");

    d.style.top = mapY - (1 - theMap.scale) * 3 * theMap.hexY +  "px";
    d.style.left = (mapX - theMap.hexHalfX) - (1-theMap.scale) * theMap.hexX * theMap.scale + "px";
    d.style.transform = "scale(" + theMap.scale + "," + theMap.scale + ")";
    cntr.appendChild (d);
    
    const img = document.createElement ("IMG");
    img.src = f + ".png";
    d.appendChild (img);
    
    this.features.push (f);
    this.widgets.push (img);
  }  
  
  
  removeFeature (feature)
  {
    for (let i = 0; i <  this.features.length; i++)
    {
      if (this.features[i] == feature)
      {
        this.features.splice (i, 1);
        
        const w = this.widgets[i];
        w.parentNode.remove();
        w.remove();
        
        this.widgets.splice (i, 1);
        
        return;
      }    
    }  

    console.log ("Feature not found: " + feature);  
  }


  isClear ()
  {
    return (this.features.length == 0);  
  }
  


}