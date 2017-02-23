# React Simple TimeAgo
A very simple time ago component for ReactJS
## Installation
```
yarn add react-simple-timeago --save
#or
npm install react-simple-timeago --save
```
## Usage
```
import TimeAgo from 'react-simple-timeago';

<TimeAgo date={new Date()} />
```
## Properties
* element(string) - Element that will be used to wrap the time ago texts.
* date(Date, String, Number) - The given date
* className(String) - Custom class that can be applied to style the element.
* isLive(Boolean) - Tells wether you want to automatically update the component.
* addSuffix(Boolean) - Distances less than a minute are more detailed
* includeSeconds(Boolean) - Result indicates if the second date is earlier or later than the first

## Further Help
[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/johndavedecano?utm_source=github&utm_medium=button&utm_term=johndavedecano&utm_campaign=github)
