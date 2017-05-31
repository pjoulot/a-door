## aframe-sliding-door-component

[A-Frame](https://aframe.io) component for adding a sliding door.

<p align="center">
  <img src="https://pbs.twimg.com/media/C9fy-LjW0AUVt_H.png"/>
</p>

### API

| Property         | Description                                        | Default Value |
|------------------|----------------------------------------------------|---------------|
| width            | Width of the door                                  | 1             |
| height           | Height of the door                                 | 2             |
| depth            | Depth of the door                                  | 0.25          |
| color            | Color of the door                                  | #AAA          |
| texture          | Texture of the door                                | ''            |
| type             | Door type ('simple' or 'double')                   | simple        |
| open_direction   | The open direction ('right', 'left', 'up', 'down') | right         |
| open_duration    | The duration of the opening animation in ms        | 3000          |
| close_duration   | The duration of the closing animation in ms        | 3000          |
| open_event       | The event name which open the door                 | open          |
| close_event      | The event name which close the door                | close         |
| open_sound       | The sound ressource played at the opening          | ''            |
| close_sound       | The sound ressource played at the closing          | ''            |

### Usage

Just declare the entity in the HTML with the properties you want.

```html
<a-entity id="door" door="width: 10; height: 5; color: #4D4437; depth: 0.25; type: double; open_direction: left;" position="0 2.5 -5"></a-entity>
```

And interact with it by emitting the 'open' or 'close' event.

```js
document.querySelectorAll('#door').forEach(function(door) {door.emit('open');});
```

### Notes

The component is pretty simple and create only sliding rectangular doors. It also doesn't support 3D models. If you have any idea to improve the component, do a pull request ;)

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
  <script src="https://raw.githubusercontent.com/pjoulot/a-door/master/dist/door.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity door="width: 10; height: 5; color: #4D4437; depth: 0.25; type: double; open_direction: left;" position="0 2.5 -5"></a-entity>
  </a-scene>
</body>
```
