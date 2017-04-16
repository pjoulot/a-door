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
| texture          | Texture of the door                                | 2             |
| type             | Door type ('simple' or 'double')                   | simple        |
| open_direction   | The open direction ('right', 'left', 'up', 'down') | right         |
| open_duration    | The duration of the opening animation in ms        | 3000          |
| close_duration   | The duration of the closing animation in ms        | 3000          |
| open_event       | The event name which open the door                 | open          |
| close_event      | The event name which close the door                | close         |

### Usage

Just declare the entity in the HTML with the properties you want.

```html
<a-entity door="width: 10; height: 5; color: #4D4437; depth: 0.25; type: double; open_direction: left;" position="0 2.5 -5"></a-entity>
```

### Notes

To avoid intersecting with the laser, the raycaster's `near` property is set to
0.03. Thus, you may see odd results when the top of the controller is held
extremely close to the entity you wish to intersect.

This component was built for the Vive controller model. If you are using a
different model, you may need to modify the raycaster and position of the
laser. In the future, this should be made more easily configurable.

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
  <script src=""></script>
</head>

<body>
  <a-scene>
    <a-entity door="width: 10; height: 5; color: #4D4437; depth: 0.25; type: double; open_direction: left;" position="0 2.5 -5"></a-entity>
  </a-scene>
</body>
```
