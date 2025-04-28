# 🖌️ Image-Editor

This is a simple and open source project to edit imges in web full made by me from scratch. The idea was to make a simple image editor such as pohotoshop that allows you to edit using only a web browser any image at a simple level.
The target also was make it without any kind of framework, using only the simple HTML, CSS and JavaScript codes.

All the images used in this project were obteined from [`fonts.google`](https://fonts.google.com/icons) like the text font, which is [`Dancing Script`](https://fonts.google.com/specimen/Dancing+Script?query=Dancing+Script)

Feautures:
<ul>
    <li>Create a project by specifing the size of the canvas</li>
    <li>Create a project by importing a background image</li>
    <li>Import text</li>
    <li>Import images</li>
    <li>Layers</li>
    <li>Dragging</li>
    <li>Rotate</li>
    <li>Zoom in/out</li>
    <li>Color</li>
    <li>Warning messages when you are editing an image and you tried to either close or refresh the window</li>
</ul>

#

### Creating project

When you need to create a new project, you have two clar options: either you create a new canvas from scratch by specifing its width and height or you import a image you have downloaded on your device.

<div align="center">
  <img src="https://github.com/user-attachments/assets/4468edc0-4acf-40d9-bad6-5014bef40b04" width="70%" />
  <img src="https://github.com/user-attachments/assets/3582169d-cea3-406f-bb36-35afaefe36fb" />
</div>

#

### Text

To insert a text you have two options: either you click on the canvas afer press the T key or go to the left panel, click on the text button (the first one with the double T) and click again on the canvas. In this way, you can write whatever you want.

#

### Images

You also can import an image from your device by press quickly twice the I button from the keyboard pressing the control key or by the image button on the left-hand side of the screen.

#

### Layers

On the left-hand side of the screen, you will see a menu with the title "Layers" which is where you can work with the layers as you might guessed.
You can select each one and see with a blue border which is the object that this layer belongs to. Also, you can click on the object in the canvas to select it and work with it, being both the object and its layers highlighted.
By selecting the layer, you can drag by moving the mouse after keep clicking on it for a second and remove it by pressing the delete ket on the keyboard.

#

### Drag

A quite important feature I had to add no matter what is the drag. You will see some objects where you don't want to see them, so you can drag them and change its position on the canvas.

#

### Rotate

By either pressing the R key on the keyboard or clicking on the rotate button on the left-hand side of the screen, you will be able to rotate a selected layer just by moving around the mouse while the click is kept.

#

### Zoom in and out

If you use the wheel of the mouse while the shift button is being pressed, you will zoom in or out depending of the directing you are moving the wheel of the mouse.
On top of the screen, there are also a couple of buttons to zoom in and zoom out in case you don't count with a keyboard or mouse.
Between these buttons, there is a number that represents how much you are zooming in or out.

#

### Color

On the left-hand side of the screen there is a color button as well. Once you click on it, you can pick a color so the next text you insert on the canvas will be in that color. Additionally, if when you are picking a color you are also selecting a layer with text, the color of that text will change to that new color.

#

### Warning messages when you tried to either close or refresh the window

When you are working, it is pretty annoying pressing either the refresh button or the close button loosing all the work done. To avoid it, I added a message when you do it asking wether you really meant to do that task, giving the possibility to cancel it and don't loose the whole process.