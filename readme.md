# Reddit Dashboard

Angular-based search app for Reddit with interface based on the [Bootstrap dashboard example](http://getbootstrap.com/examples/dashboard/).

## Functionality
### Entering a new term
1. When user types a search term in to the search box and presses enter:
* The search is added to the "history" list on the left and marked as active (highlighted in blue).
* Angular `$http` service is used to search reddit for the search term.
* The "All Posts" list in the main content area is populated with reddit posts and some data about each (score, comment count, etc)
* The "featured posts" section is populated by loading the first 4 thumbnail images from the reddit data.

### Interface featues
* Post list features a "View" link (magnifying glass icon) to open the post URL in a new tab (based on url parameter).
* Post list features "Comments" link showing number of existing comments to open the comments page in a new tab (based on permalink parameter).
* The "About" link in the header triggers a modal pop-up using angular-bootstrap directives.

### Going to an existing term
When user clicks a search term in the "History" list on the left it:

* Marks the item as active (highlight blue)
* Does steps 3,4,5 above.

### Removing a term from history
* Hovering over an item in the menu shows an "X" link next to the item.
* Clicking the link removes the term from the list and updates `localStorage` so when refreshing the page the item stays deleted.

### Page load
* On first load the "history" list on the left will be empty.
* Once a search term is entered it is added to the list on the left
* The history list is stored in `localStorage` so the list is remembered between page views.

### A Quick note on `localStorage`
`localStorage` can only store strings, so arrays and objects must be converted to strings when storing and back when loading.

```javascript
var tinyIntegers = [1,2,3];
window.localStorage.tinyIntegers=JSON.stringify(tinyIntegers);
//converts the data to a string "[1,2,3]" and stores it in .tinyIntegers

var newTaco = JSON.parse(window.localStorage.tinyIntegers);
//parses the stored sting back to the array: [1,2,3]
```
