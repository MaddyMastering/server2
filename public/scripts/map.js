angular.module('myApp', [])

.controller('myCtrl', function($scope) {

	  var loc;
	  var device;
	  var socket = io('http://localhost:3001');
	  var devices=[];
	  var status;
 
	socket.on('message', function (data) {
		loc=data.location;
		device=data.device;
		status=data.status;
		console.log(loc);
		console.log(device);
		$scope.track();
		});
	

	var mark;
	var circle;
	var d = fetchLocation();
	
	L.Map = L.Map.extend({
 	openPopup: function (popup, latlng, options) { 
        if (!(popup instanceof L.Popup)) {
        var content = popup;
        
        popup = new L.Popup(options).setContent(content);
        }
        
        if (latlng) {
        popup.setLatLng(latlng);
        }
        
        if (this.hasLayer(popup)) {
        return this;
        }
        
        this._popup = popup;
        return this.addLayer(popup);        
		}
		});
	

	var map = new L.Map('map',{closePopupOnClick:true}).setView([51.505, -0.09], 13);
	
	L.tileLayer('http://mt1.google.com/vt/lyrs{t}&x={x}&y={y}&z={z}', {
		maxZoom: 24,
		t:'m'
	}).addTo(map);
	
			var imageUrl = 'images/map.png',
				imageBounds = L.latLngBounds([
        [13.046685, 77.618930],
        [13.046474, 77.618879]]);
		
			var topleft    = L.latLng(13.046685, 77.618930),
				topright   = L.latLng(13.046666, 77.619056),
				bottomleft = L.latLng(13.046473, 77.618882);

			map.fitBounds(imageBounds);

			var overlay = L.imageOverlay.rotated(imageUrl, topleft, topright, bottomleft, {
			opacity: 0.9,
			interactive: true,
		})
							.addTo(map);
		
							
				
		var innovation=L.marker([13.047548, 77.618953]).addTo(map)
			.bindPopup("Innovation team stall").openPopup();
			
		var abc=L.marker([13.047110, 77.618858]).addTo(map)
			.bindPopup("abc stall").openPopup();

	
	$scope.track = function(){
	
		var myIcon = L.icon({
				iconUrl: 'images/icon.png',
				iconSize: [38, 45],
				iconAnchor: [10, 10]

			});
			if(devices.length == 0 && devices[device] == undefined)
		{
			var mark=L.marker(loc, {icon: myIcon}).bindTooltip(""+device+"", {permanent: true, className: "my-label", offset: [6, -6] ,opacity : 0.5 }).addTo(map);
			
			devices[device] = mark;
			console.log('marker is set',devices);
			
		}
		
		var c=devices[device];
		
			if( status == 1){
		 c.setLatLng(loc).openPopup(); 
		 }
			else{
				map.removeLayer(c);
		}

		
	};
});

	