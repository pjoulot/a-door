/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	AFRAME.registerComponent('door', {
	  schema: {
	    width: {type: 'number', default: 1},
	    height: {type: 'number', default: 2},
	    depth: {type: 'number', default: 0.25},
	    color: {type: 'color', default: '#AAA'},
	    texture: {type: 'string', default: ''},
	    type: {type: 'string', default: 'simple'},
	    state: {type: 'string', default: 'closed'},
	    open_direction: {type: 'string', default: 'right'},
	    open_duration: {type: 'number', default: 3000},
	    close_duration: {type: 'number', default: 3000},
	    open_event: {type: 'string', default: 'open'},
	    close_event: {type: 'string', default: 'close'},
	    open_sound: {type: 'string', default: ''},
	    close_sound: {type: 'string', default: ''},
	    auto_distance: {type: 'number', default: 0}
	  },
	  /**
	   * Initial creation and setting of the mesh.
	   */
	  init: function () {
	    var data = this.data;
	    var el = this.el;

	    this.createDoor(data, el);
	    // Store the reference to the event functions.
	    this.eventOpenCloseHandler = function (event) {
	      var eventName = event.type;
	      el.querySelectorAll('[sound]').forEach(function(sound) {
	        sound.emit(eventName, null, false);
	      });
	      el.querySelectorAll('a-box').forEach(function(door) {
	        door.emit(eventName, null, false);
	      });
	    };
	  
	    // Function to detect if the door needs to open or close after a teleport.
	    this.teleportOpenCloseHandler = function (event) {
	      var doorPos = new THREE.Vector3();
	      doorPos.setFromMatrixPosition(el.object3D.matrixWorld);
	      var distance = doorPos.distanceTo(event.detail.newPosition);
	    
	      if (distance < data.auto_distance && data.state === 'closed') {
	      data.state = 'open';
	        el.emit('open');
	      }
	      else if(distance > data.auto_distance && data.state === 'open') {
	      data.state = 'closed';
	        el.emit('close');
	      }
	    }
	  
	    // Add the listeners for events.
	    el.addEventListener(data.open_event, this.eventOpenCloseHandler);
	    el.addEventListener(data.close_event, this.eventOpenCloseHandler);
	    el.closest('a-scene').addEventListener('teleport', this.teleportOpenCloseHandler);
	  },
	  
	  /**
	   * Update the mesh in response to property updates.
	   */
	  update: function (oldData) {
	    var data = this.data;
	    var el = this.el;
	    // If `oldData` is empty, then this means we're in the initialization process.
	    // No need to update.
	    if (Object.keys(oldData).length === 0) { return; }
	    // Geometry-related properties changed. Update the geometry.
	    if (data.width !== oldData.width || data.height !== oldData.height || data.depth !== oldData.depth) {
	      el.getObject3D('mesh').geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
	    }
	    // Material-related properties changed. Update the material.
	    if (data.color !== oldData.color) {
	      el.getObject3D('mesh').material.color = data.color;
	    }
	  
	    // Listen for the events.
	    // Open event.
	    if (oldData.open_event && data.open_event !== oldData.open_event) {
	      el.removeEventListener(oldData.open_event, this.eventOpenCloseHandler);
	    }
	    if (data.open_event) {
	      el.addEventListener(data.open_event, this.eventOpenCloseHandler);
	    }
	    // Close event.
	    if (oldData.close_event && data.close_event !== oldData.close_event) {
	      el.removeEventListener(oldData.close_event, this.eventOpenCloseHandler);
	    }
	    if (data.close_event) {
	      el.addEventListener(data.close_event, this.eventOpenCloseHandler);
	    }
	  },

	  remove: function () {
	    this.el.removeObject3D('mesh');
	  },

	  open: function () {
	    this.el.emit('open');
	  },

	  close: function () {
	    this.el.emit('close');
	  },
	  
	  createDoor: function(data, el) {
	    // Set the sounds.
	    if (data.open_sound !== '') {
	      var doorSoundOpen = document.createElement('a-entity');
	      doorSoundOpen.setAttribute('sound', 'src: ' + data.open_sound + '; on: ' + data.open_event);
	      el.appendChild(doorSoundOpen);
	    }
	    if (data.close_sound !== '') {
	      var doorSoundClose = document.createElement('a-entity');
	      doorSoundClose.setAttribute('sound', 'src: ' + data.close_sound + '; on: ' + data.close_event);
	      el.appendChild(doorSoundClose);
	    }
	    
	    // Create the doors.
	    var doorLoop = data.type === "double" ? 2 : 1;

	    for(var i=0; i < doorLoop; i++) {
	      var door = document.createElement('a-box');
	      door.setAttribute('color', data.color);
	      door.setAttribute('depth', data.depth);
	      door.setAttribute('src', data.texture);
	    
	      var doorAnimationOpen = document.createElement('a-animation');
	      doorAnimationOpen.setAttribute('attribute', 'position');
	      var doorAnimationClose = document.createElement('a-animation');
	      doorAnimationClose.setAttribute('attribute', 'position');
	     
	      var direction = i === 0 ? -1 : 1;
	    
	      if (data.open_direction === "right" || data.open_direction === "left") {
	        var widthDoor = data.width / doorLoop;
	        door.setAttribute('height', data.height);
	        door.setAttribute('width', widthDoor);
	    
	        var deltaPosition = 0;
	        if (doorLoop === 2) {
	          deltaPosition = (widthDoor / 2) * direction;
	        }
	        var doorCoordinates = deltaPosition + ' 0 0';
	        door.setAttribute('position', doorCoordinates);
	        doorAnimationOpen.setAttribute('from', doorCoordinates);
	        this.setAnimationDuration(doorAnimationOpen, data.open_sound, data.open_duration);
	        doorAnimationOpen.setAttribute('begin', data.open_event);
	    
	        var doorXDestination = deltaPosition;
	        if ((data.open_direction === "right" && doorLoop === 1) || (i === 1 && doorLoop === 2)) {
	          doorXDestination = deltaPosition + widthDoor;
	        }
	        else if((data.open_direction === "left" && doorLoop === 1) || (i === 0 && doorLoop === 2)) {
	          doorXDestination = deltaPosition - widthDoor;
	        }
	        var doorCoordinatesDestination = doorXDestination + ' 0 0';
	        doorAnimationOpen.setAttribute('to', doorCoordinatesDestination);
	        door.appendChild(doorAnimationOpen);
	    
	        this.setAnimationDuration(doorAnimationClose, data.close_sound, data.close_duration);
	        doorAnimationClose.setAttribute('from', doorCoordinatesDestination);
	        doorAnimationClose.setAttribute('begin', data.close_event);
	        doorAnimationClose.setAttribute('to', doorCoordinates);
	        door.appendChild(doorAnimationClose);
	      }
	      else if(data.open_direction === "up" || data.open_direction === "down") {
	        var heightDoor = data.height / doorLoop;
	        door.setAttribute('height', heightDoor);
	        door.setAttribute('width', data.width);
	    
	        var deltaPosition = 0;
	        if (doorLoop === 2) {
	          deltaPosition = (heightDoor / 2) * direction;
	        }
	        var doorCoordinates = '0 ' + deltaPosition + ' 0';
	        door.setAttribute('position', doorCoordinates);
	        doorAnimationOpen.setAttribute('from', doorCoordinates);
	        this.setAnimationDuration(doorAnimationOpen, data.open_sound, data.open_duration);
	        doorAnimationOpen.setAttribute('begin', data.open_event);
	    
	        var doorYDestination = deltaPosition;
	        if ((data.open_direction === "up" && doorLoop === 1) || (i === 1 && doorLoop === 2)) {
	          doorYDestination = deltaPosition + heightDoor;
	        }
	        else if((data.open_direction === "down" && doorLoop === 1) || (i === 0 && doorLoop === 2)) {
	          doorYDestination = deltaPosition - heightDoor;
	        }
	        var doorCoordinatesDestination = '0 ' + doorYDestination + ' 0';
	        doorAnimationOpen.setAttribute('to', doorCoordinatesDestination);
	        door.appendChild(doorAnimationOpen);
	    
	        this.setAnimationDuration(doorAnimationClose, data.close_sound, data.close_duration);
	        doorAnimationClose.setAttribute('from', doorCoordinatesDestination);
	        doorAnimationClose.setAttribute('begin', data.close_event);
	        doorAnimationClose.setAttribute('to', doorCoordinates);
	        door.appendChild(doorAnimationClose);
	      }   
	      el.appendChild(door);    
	    }
	  },
	  
	  setAnimationDuration: function(tag, sound, duration) {
	    if (sound !== '') {
	      var durationSound = document.querySelector(sound).duration;
	      // If a sound has been set, use the sound duration.
	      if (typeof(durationSound) !== 'undefined') {
	        durationSound = Math.trunc(durationSound * 1000);
	        tag.setAttribute('dur', durationSound);
	      }
	    }
	    else {
	      tag.setAttribute('dur', duration);
	    }
	  }
	});


/***/ })
/******/ ]);