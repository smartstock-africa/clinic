# SAVANNAH CLINIC

A frontend web app that allows clinic users to search, filter, sort, open and correct the stock count over a slow internet,

## FRAMEWORKS

The frontend framework is the simple and reliable pure **HTML/CSS and JS**.

## LIBRARIES

Below are the libraries I have used to add functionality to the HTML, CSS and JS framework.
</br>
</br>
**JQuery** - Reduces the amount of code I need to write when selecting elements from the DOM.</br>

> Example instead of document.getElementById("data"). with Jquery I can just $("#data")
> </br>

**NProgress** - A visual JS Library that shows a progress bar at the top of the DOM element, showing working or loading status.</br>

> Start a loading animation in JS with NProgress.start() and finish with a NProgress.done()
> </br>

**Animate.css** - A CSS library that animates with just adding classes to elements in the DOM.</br>

> Example <div class=`animate__animated animate__fadeInUp`> will animate the element with a Fade In the upwards direction

## SECTION 1: DESIGN

### COMPONENTS

I have identified various components that require their own functions in the clinic app

1. User - This is the active person who accesses and edits the products inside the web app.
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

I used AI to ask how to make normal DOMElement divs focusable with the Tab key and run functions on Enter. It suggested I place a tabindex="0" on each div and add a custom class name in order to distinguish them from the generic div elements.
I also enquired how to make them non-focusable when they are not viewable on the viewport, I placed a tabindex="-1" to prevent focus when the parent container is not visible on the screen.

## SECTION 2: DESIGN

I designed the app in accordance with DummyJSON API.

### LOGIN FORM

Provides an entry for username and the password that will validate the user. If successful the products are requested or fetched from the storage to be displayed to the user. If unsuccessful the user is notified and tries again.

### PRODUCTS TABLE

Shows the list of products (1-30) with the fields - **Id, Photo, Product Name, Category, Price Stock** in that order. The **Category** field is hidden on smaller screen widths (<750px).
Users can search. sort and filter products with the options provided. After user has sorted or filtered a product, the options are saved and can be pasted on any browser and provide the same sort, search or filter.
Clicking on a row allows users to see the extra data of the product, such as **Company, Rating and Description**.

### PRODUCT DIALOG BOX

This is activated when a product listing is clicked inside the **PRODUCTS TABLE**. Users can be able to change the stock here and it updates the value across the app. Even if the user is logged out, the can log in and still find the stock updated.
It is also here users can copy the products internal link and share to chat. When this link is accessed users can login and preview the app directly.

### AREAS WHERE I USED AI IN THIS SECTION

I asked AI to help me save sessions in localStorage so that users will be logged out even when they refresh the browser. A timer is recorded when the user logs in. After it expires the user is logged out and asked to login again.

## SECTION 3: DEPLOYMENT & CI/CD

The app is accessible using this link <a href="smartstock-africa.github.io/clinic/"> Savannah Clinic </a> deployed using Github pages. The **main** branch triggers a deployment.

The user commits the changes, the local configurations ensures the files are formatted and checks the Javascripts for errors specified in the config file. If everything is successful, a commit is staged waiting to be pushed

### AREAS WHERE I USED AI IN THIS SECTION

I used AI to help me setup the environment for formatting the files for the app. After initializing node and installing the necessary dependencies I enquired on how to format the files during commits. I also learned on the github Conventional Commits, where commit messages have a specified formats for convention and advised me on how and when to use the conventional commits.
During the deployment phase, my local github could not authenticate with the repository due to ssh error. I had to add my ssh public key to the Github SSH key sector and was able to authenticate easily with the guidance of AI.

### PERSONAL ADJUSTMENTS

#### ESLINT

Since I was using JQuery for the Javascript code, I added the $ as a global variable so that it would be recognized as a function code inside my plain Javascript. I added the 'no-undef' rule to prevent undefined variables from being initialized. However, this lead to multitudes of errors, signifying builtin Javascript components such as **LocalStorage, window, setTimeout** to be highlighted as an error. I added the list to the global definitions to declare them globally.

#### PRETTIER

I asked AI to help me preconfigure the settings and save them for github commits, as I was only using Prettier to format the HTML/CSS and the JS files. I included the single quotes parameter to ensure strings are defined with single quotes, the semicolon to ensure at every end of a CSS or JS line is inserted a semicolon too.

#### COMMITLINT

I configured commitlint to check if the files are formatted correctly and fail if not, it also ensures ESLint has identified no issues in order to allow a commit to take place.

## SHORTCOMINGS OF THE CURRENT PROJECT

### STATES

I have not yet placed empty or error states for the application. However notifications are placed when an error occurs or a success PUT request is achieved
