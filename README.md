## react-web-helper

* helper for [create-react-web](https://github.com/skyFi/create-react-web)

### Usage

#### only redux connect

```JavaScript
// before
import React from 'react';
import { connect } from 'react-redux';

class Example extends React.Component {
  //...
}
export default connect(/*mapStateToProps, etc.*/)(Example);

// after
import React from 'react';
import { reduxConnect } from 'react-web-helper';

@reduxConnect(/*mapStateToProps, etc.*/)
class Example extends React.Component {
  //...
}
export default Example;
```

#### react-router 4.x withRouter + redux

```JavaScript
// before
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Example extends React.Component {
  //...
}
export default withRouter(connect(/*mapStateToProps, etc.*/)(Example));

// after
import React from 'react';
import { reduxConnect, withRouter } from 'react-web-helper';

@withRouter()
@reduxConnect(/*mapStateToProps, etc.*/)
class Example extends React.Component {
  //...
}
export default Example;
```

#### fetchData for SSR

```JavaScript
// simple
import React from 'react';
import { fetchData } from 'react-web-helper';

@fetchData()
class Example extends React.Component {
  // fetchData will exec in server side or componentDidMount func
  static async fetchData({ dispatch, match }) {
    await dispatch(someAction());
    // ...
  }
  // ...
}
export default Example;

// with react router 4.x and redux
import React from 'react';
import { reduxConnect, withRouter, fetchData } from 'react-web-helper';

@fetchData(/*notPreventFirstFetchOnBroswer*/)
@withRouter()
@reduxConnect(/*mapStateToProps, etc.*/)
class Example extends React.Component {
  //...
}
export default Example;
```

* @params {boolean} notPreventFirstFetchOnBroswer

not frevent first load fetchData on broswer, default value is `false`.

#### helmet for smart set page header, eg: title, keywords, description, etc.

```JavaScript
import React from "react";
import { Helmet } from "react-web-helper";

class Application extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            ...
        </div>
    );
  }
};
```

Helmet _takes_ plain HTML tags and _outputs_ plain HTML tags. It's dead simple, and React beginner friendly.

##### Example
```javascript
import React from "react";
import {Helmet} from "react-helmet";

class Application extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            ...
        </div>
    );
  }
};
```

Nested or latter components will override duplicate changes:

```javascript
<Parent>
    <Helmet>
        <title>My Title</title>
        <meta name="description" content="Helmet application" />
    </Helmet>

    <Child>
        <Helmet>
            <title>Nested Title</title>
            <meta name="description" content="Nested component" />
        </Helmet>
    </Child>
</Parent>
```

outputs:

```html
<head>
    <title>Nested Title</title>
    <meta name="description" content="Nested component">
</head>
```

See below for a full reference guide.

##### Features
- Supports all valid head tags: `title`, `base`, `meta`, `link`, `script`, `noscript`, and `style` tags.
- Supports attributes for `body`, `html` and `title` tags.
- Supports server-side rendering.
- Nested components override duplicate head changes.
- Duplicate head changes are preserved when specified in the same component (support for tags like "apple-touch-icon").
- Callback for tracking DOM changes.

##### Compatibility

Helmet 5 is fully backward-compatible with previous Helmet releases, so you can upgrade at any time without fear of breaking changes. We encourage you to update your code to our more semantic API, but please feel free to do so at your own pace.

##### Server Usage
To use on the server, call `Helmet.renderStatic()` after `ReactDOMServer.renderToString` or `ReactDOMServer.renderToStaticMarkup` to get the head data for use in your prerender.

Because this component keeps track of mounted instances, **you have to make sure to call `renderStatic` on server**, or you'll get a memory leak.

```javascript
ReactDOMServer.renderToString(<Handler />);
const helmet = Helmet.renderStatic();
```

This `helmet` instance contains the following properties:
- `base`
- `bodyAttributes`
- `htmlAttributes`
- `link`
- `meta`
- `noscript`
- `script`
- `style`
- `title`

Each property contains `toComponent()` and `toString()` methods. Use whichever is appropriate for your environment. For attributes, use the JSX spread operator on the object returned by `toComponent()`. E.g:

###### As string output
```javascript
const html = `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="content">
                // React stuff here
            </div>
        </body>
    </html>
`;
```

###### As React components
```javascript
function HTML () {
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
        <html {...htmlAttrs}>
            <head>
                {helmet.title.toComponent()}
                {helmet.meta.toComponent()}
                {helmet.link.toComponent()}
            </head>
            <body {...bodyAttrs}>
                <div id="content">
                    // React stuff here
                </div>
            </body>
        </html>
    );
}
```

##### Reference Guide

```javascript
<Helmet
    {/* (optional) set to false to disable string encoding (server-only) */}
    encodeSpecialCharacters={true}

    {/*
        (optional) Useful when you want titles to inherit from a template:

        <Helmet
            titleTemplate="%s | MyAwesomeWebsite.com"
        >
            <title>My Title</title>
        </Helmet>

        outputs:

        <head>
            <title>Nested Title | MyAwesomeWebsite.com</title>
        </head>
    */}
    titleTemplate="MySite.com - %s"

    {/*
        (optional) used as a fallback when a template exists but a title is not defined

        <Helmet
            defaultTitle="My Site"
            titleTemplate="My Site - %s"
        />

        outputs:

        <head>
            <title>My Site</title>
        </head>
    */}
    defaultTitle="My Default Title"

    {/* (optional) callback that tracks DOM changes */}
    onChangeClientState={(newState) => console.log(newState)}
>
    {/* html attributes */}
    <html lang="en" amp />

    {/* body attributes */}
    <body className="root" />

    {/* title attributes and value */}
    <title itemProp="name" lang="en">My Plain Title or {`dynamic`} title</title>

    {/* base element */}
    <base target="_blank" href="http://mysite.com/" />

    {/* multiple meta elements */}
    <meta name="description" content="Helmet application" />
    <meta property="og:type" content="article" />

    {/* multiple link elements */}
    <link rel="canonical" href="http://mysite.com/example" />
    <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes-"72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
    {locales.map((locale) => {
        <link rel="alternate" href="http://example.com/{locale}" hrefLang={locale} />
    })}

    {/* multiple script elements */}
    <script src="http://include.com/pathtojs.js" type="text/javascript" />

    {/* inline script elements */}
    <script type="application/ld+json">{`
        {
            "@context": "http://schema.org"
        }
    `}</script>

    {/* noscript elements */}
    <noscript>{`
        <link rel="stylesheet" type="text/css" href="foo.css" />
    `}</noscript>

    {/* inline style elements */}
    <style type="text/css">{`
        body {
            background-color: blue;
        }

        p {
            font-size: 12px;
        }
    `}</style>
</Helmet>
```
helmet [more](https://github.com/nfl/react-helmet) doc.
