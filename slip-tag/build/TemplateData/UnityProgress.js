function UnityProgress (dom) 
{
  this.progress = 0.0;
  this.message = "";
  this.dom = dom;
  var parent = dom.parentNode;


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
      this.message = "Loading...";
    }

    document.getElementById("progressBar").style.width = 200 * Math.min(this.progress, 1) + "px";
    document.getElementById("loadingText").innerHTML = this.message + "<br> Please be patient";
  }


  this.Update ();
}