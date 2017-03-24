import * as React from 'react';
import { render } from 'react-dom';
import { observable } from 'mobx';
import { observer}  from 'mobx-react';

import * as style from './style.css';

@observer
class App extends React.Component<void, void> {
    @observable private count: number = 1;
    componentDidMount() {
        setInterval(() => this.count++, 1000);
    }
    render() {
        return <p className={style.nice}>Hello world! {this.count}</p>;
    }
}

const div = document.createElement('div');
document.body.appendChild(div);
render(<App/>, div);
