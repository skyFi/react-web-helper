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
