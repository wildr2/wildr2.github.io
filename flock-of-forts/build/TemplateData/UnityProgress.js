function init()
{
    
}

function UnityProgress (dom) 
{
  this.progress = 0.0;
  this.message = "";
  this.dom = dom;
  var parent = dom.parentNode;

  createjs.CSSPlugin.install(createjs.Tween);
  createjs.Ticker.setFPS(60);
  

  this.SetProgress = function (progress)
  { 
    if (this.progress < progress)
      this.progress = progress; 

    this.Update();
  }

  this.SetMessage = function (message) 
  { 
    this.message = message;
    this.Update();
  }

  this.Clear = function() 
  {
    document.getElementById("loadingBox").style.display = "none";
  }

  this.Update = function() 
  {
    if (this.progress == 0) 
    {
      this.message = "Preparing to load...";
    }
    else if (this.progress > 0.9)
    {
      // Show 'preparing' instead of 'running'
      document.getElementById("progressFrame").style.display = "none";
      document.getElementById("progressBar").style.display = "none";
      this.message = "Preparing...";
    }


    var length = 200 * Math.min(this.progress, 1);
    bar = document.getElementById("progressBar")
    createjs.Tween.removeTweens(bar);
    createjs.Tween.get(bar).to({width: length}, 500, createjs.Ease.sineOut);

    document.getElementById("loadingText").innerHTML = this.message + "<br> Please be patient";
  }


  this.Update ();
}