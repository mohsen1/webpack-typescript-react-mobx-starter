import * as React from 'react';
import { observable } from 'mobx';
import { observer}  from 'mobx-react';

@observer
export default class App extends React.Component<void, void> {
    @observable count: number = 1;

    componentDidMount() {
        setInterval(() => this.count++, 1000);
    }
    render() {
        return <p>Hello world! {this.count}</p>;
    }
}
