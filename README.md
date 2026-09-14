# SAVANNAH CLINIC

A frontend web app that allows clinic users to search, filter, sort, open and correct the stock count over a slow internet,

## FRAMEWORKS

The frontend framework is the simple and reliable pure **HTML/CSS and JS**.

## LIBRARIES

Below are the libraries I have used to add functionality to the HTML, CSS and JS framework.
</br>
</br>
**`JQuery`** - Reduces the amount of code I need to write when selecting elements from the DOM.</br>

> Example instead of document.getElementById("data"). with Jquery I can just $("#data")
> </br>

**`HTMX`** - Allows DOM Elements to be hooked with request parameters and send requests when clicked or when loaded in DOM </br>

> Example <div hx-get=`https://website.com` hx-target=`#container` hx-swap=`replace`> will send a request to https://website.com and replaces the content inside container ID with the response
> </br>

**`NProgress`** - A visual JS Library that shows a progress bar at the top of the DOM element, showing working or loading status.</br>

> Start a loading animation in JS with NProgress.start() and finish with a NProgress.done()
> </br>

**`Animate.css`** - A CSS library that animates with just adding classes to elements in the DOM.</br>

> Example <div class=`animate__animated animate__fadeInUp`> will animate the element with a Fade In the upwards direction

## SECTION 1: DESIGN

### COMPONENTS

I have identified various components that require their own functions in the clinic app

1. User - This is the active person who accesses and edits the web app.
2. Products - These are the entities the user interacts with to achieve their goals in using the web app

### STATES

Each component has their own state and where the state lives matters

1. **User**
   - The user accesses the app and logs in to their account.
   - Their logged in state lives in the browser because that is where they access the clinic data.
   - Their logged in information lives in the server as it validates the user's log in information with the submitted data.

2. **Products**
   - The products are fetched from DummyJSON and saved in the browser for ease of access and reduces latency when accessing the data.
   - Changing the products state begins with editing the saved data in the browser and sending a PUT request to DummyJSON.
   - If the request fails, the user is notified of the error and the saved data is left untouched.
   - If the request is successful, the user is notified and the new changed data is saved in the browser.

### FUNCTIONALITY

1. Request Functionality </br>
   With the JQuery Library I can send requests with the $.ajax() function.

2. Cache Functionality </br>
   I will use the LocalStorage API to store data in the browser to reduce latency when requesting already fetched data.

3. Invalidate Data </br>
   During POST and PUT request, if the request is successful the saved data is changed to match. If it fails the user is notified and the data is left untouched.

### UI/UX DESIGN

I will use already predefined CSS styles that I have saved for ease of use.

1. **Spacing** </br>
   Spaces are defined in the multiples of 4px.
2. **Color** </br>
   The overall UI will take a dark color and the text will have an opposing white color. The primary color will be a blue color that will stylize the buttons.
3. **Typography**</br>
   I will use the **Figtree** font for regular and button texts, **Jost** Font for headings and **Inconsolata** Font for the numbers.


### ACCESSIBILITY

1. All images will be tagged with the alt attribute to add definitions to them.
2. Inputs will be focus-able by pressing the **Tab** key.

### WHERE I USED AI IN THIS SECTION
I used AI to ask how to make <div>s focusable with the Tab key and run functions on Enter. It suggested I place a tabindex="0" on each div and add a custom class name in order to distinguish them from the generic div elements.
