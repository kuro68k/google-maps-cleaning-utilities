// Google Maps - Delete All Contributions
// 1. Go to Google Maps, on your desktop
// 2. Open the left tab menu
// 3. Click on "Your contributions"
// 4. Select the tab "Photos" or "Reviews"
// 5. Scroll down until all or most of all pictures (or reviews) are shown in list
// 6. Open the Developer tools (F12, on Firefox or Chrome)
// 7. Open the Console tab
// 8. Copy Paste this script
// 9. Type pleaseDeleteContributionsPlease(), wait for it to be done.
  
var pleaseDeleteContributionsPlease = function () {

    var confirmDeleteContribution = function() {
        [...document.querySelectorAll('button[class~="section-dialog-footer-action-button"]')].forEach( (a) => { 
            if (a.innerHTML === "Delete") {
                a.style.border = "thick solid red";
				var evt = document.createEvent('MouseEvent');
				evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				a.dispatchEvent(evt);
            }
        });
        setTimeout(removeMe, 1000);
    }

    var deleteContribution = function() {
        [...document.querySelectorAll('div[class~="action-menu-entry"] div[class~="action-menu-entry-text"]')].forEach( (a) => { 
            if (a.innerHTML === "Delete this photo" 
                || a.innerHTML === "Delete this video"
                || a.innerHTML === "Delete review") {
                a.parentElement.style.border = "thick solid red";
                a.parentElement.click(); 
            }
        });
        setTimeout(confirmDeleteContribution, 600);
    }

    var removeMe = function() {
        
		var elem;
		var found = false;
		var z = -1;
		do {
			z++;
			elem = [...document.querySelectorAll('button[aria-label*="actions"]')][z];
			if (elem == null)
				return;
			found = true;
			for (var i = 0; i < idcache.length; i++)
			{
				if (idcache[i] == elem.getAttribute("data-photo-id"))
					found = false;
			}
		} while(found == false);

        if (elem) {
			idcache.push(elem.getAttribute("data-photo-id"));
			console.log(elem.getAttribute("data-photo-id"));

            elem.style.border = "thick solid red"; 
            elem.click();
            setTimeout(deleteContribution, 600);
        } else {
            clearTimeout();
            console.log('DONE. You did a favor to your past and present self. Now, go print one of your favorite pictures and hang it on a wall, please.');
        }  
    };

	var idcache = new Array();
	idcache.push("none");
    removeMe();
}
