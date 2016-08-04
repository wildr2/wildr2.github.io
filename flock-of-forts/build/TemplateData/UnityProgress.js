function UnityProgress (dom) {
	this.progress = 0.0;
	this.message = "";
	this.dom = dom;

	var parent = dom.parentNode;

	var background = document.createElement("div");
	background.style.background = "black";
	background.style.position = "absolute";
	parent.appendChild(background);
	this.background = background;

	var progressFrame = document.createElement("img");
	progressFrame.src = "TemplateData/loadingbar.png"; 
	progressFrame.style.position = "absolute";
	parent.appendChild(progressFrame);
	this.progressFrame = progressFrame;

	var progressBar = document.createElement("img");
	progressBar.src = "TemplateData/fullbar.png"; 
	progressBar.style.position = "absolute";
	parent.appendChild(progressBar);
	this.progressBar = progressBar;

	this.loadingText = document.getElementById("loadingText");


	this.SetProgress = function (progress) { 
		if (this.progress < progress)
			this.progress = progress; 
		this.progressFrame.style.display = "inline";
		this.progressBar.style.display = "inline";			
		this.Update();
	}

	this.SetMessage = function (message) { 
		this.message = message; 
		this.background.style.display = "inline";
		this.progressFrame.style.display = "none";
		this.progressBar.style.display = "none";			
		this.Update();
	}

	this.Clear = function() {
		this.background.style.display = "none";
		this.progressFrame.style.display = "none";
		this.progressBar.style.display = "none";
		this.loadingText.style.display = "none";
	}

	this.Update = function() {
		this.background.style.top = this.dom.offsetTop + 'px';
		this.background.style.left = this.dom.offsetLeft + 'px';
		this.background.style.width = this.dom.offsetWidth + 'px';
		this.background.style.height = this.dom.offsetHeight + 'px';

		var progressFrameImg = new Image();
		progressFrameImg.src = this.progressFrame.src;

		this.progressFrame.style.top = this.dom.offsetTop + (this.dom.offsetHeight * 0.5) + 'px';
		this.progressFrame.style.left = this.dom.offsetLeft + (this.dom.offsetWidth * 0.5 - progressFrameImg.width * 0.5) + 'px';
		this.progressFrame.width = progressFrameImg.width;
		this.progressFrame.height = progressFrameImg.height;

		this.progressBar.style.top = this.progressFrame.style.top;
		this.progressBar.style.left = this.progressFrame.style.left;
		this.progressBar.width = progressFrameImg.width * Math.min(this.progress, 1);
		this.progressBar.height = progressFrameImg.height;

		this.loadingText.innerHTML = this.message  + "<br> please be patient";
	}

	this.Update ();
}