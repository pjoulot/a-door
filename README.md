## aframe-sliding-door-component

[A-Frame](https://aframe.io) component for adding a sliding door.

<p align="center">
  <img src="https://pbs.twimg.com/media/C9fy-LjW0AUVt_H.png"/>
</p>

### API

| Property         | Description                                           | Default Value |
|------------------|-------------------------------------------------------|---------------|
| width            | Width of the door                                     | 1             |
| height           | Height of the door                                    | 2             |
| depth            | Depth of the door                                     | 0.25          |
| color            | Color of the door                                     | #AAA          |
| texture          | Texture of the door                                   | ''            |
| type             | Door type ('simple' or 'double')                      | simple        |
| open_direction   | The open direction ('right', 'left', 'up', 'down')    | right         |
| open_duration    | The duration of the opening animation in ms           | 3000          |
| close_duration   | The duration of the closing animation in ms           | 3000          |
| open_event       | The event name which open the door                    | open          |
| close_event      | The event name which close the door                   | close         |
| open_sound       | The sound ressource played at the opening             | ''            |
| close_sound      | The sound ressource played at the closing             | ''            |
| auto_distance    | The distance to automatically open and close the door | 0             |

### Usage

Just declare the entity in the HTML with the properties you want.

```html
<a-entity id="door" door="width: 10; height: 5; color: #4D4437; depth: 0.25; type: double; open_direction: left;" position="0 2.5 -5"></a-entity>
```

And interact with it by emitting the 'open' or 'close' event.

```js
document.querySelectorAll('#door').forEach(function(door) {door.emit('open');});
```

#### Sounds

In order to attach sounds to the opening and the closing events. Your just have to set the open_sound and close_sound attributes with your sound ressources previously declared in your assets.

```html
<a-assets>
  <audio id="close_sound" src="close_sound.mp3" preload="auto"></audio>
</a-assets>
```

```html
<a-entity door="close_sound: #close_sound;"></a-entity>
```

#### Speech Command

You can control the opening and the closing of the door by vocal command. This feature is based on the [speech command component](https://github.com/lmalave/aframe-speech-command-component) 

The door component just exposes an open and close function in order to use this component.
Use this syntax on your a-door element:

```html
<a-entity speech-command__open="command: open; type: function; targetComponent: door; function: open;" speech-command__close="command: close; type: function; targetComponent: door; function: close;"></a-entity>
```
For more informations, report to the speech command component documentation.

#### Automatically open and close the door

You can automatically open and close the door when the user is close enough from the door by using the auto_distance attribute. You just set a number into this attribute and it represents the distance between the user and the center of the door. When the distance is lower than this limit, the door will open and when it's higher it will close.

This attribute is only compatible with the [aframe teleport controls](https://github.com/fernandojsg/aframe-teleport-controls). You need to change your position with this component in order to have this feature otherwise it will just not work.

### Notes

The component is pretty simple and create only sliding rectangular doors. It also doesn't support 3D models. If you have any idea to improve the component, do a pull request ;)

Moreover, it is not yet compatible with the 0.61 release which is buggy with sounds. I've opened a bug here: [Preloading sound asset seems buggy on master](https://github.com/aframevr/aframe/issues/2754)

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
  <script src="https://raw.githubusercontent.com/pjoulot/a-door/master/dist/aframe-door.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity door="width: 10; height: 5; color: #4D4437; depth: 0.25; type: double; open_direction: left;" position="0 2.5 -5"></a-entity>
  </a-scene>
</body>
```
