import * as React from 'react';
import { action, computed, observable, useStrict } from 'mobx';
import { observer}  from 'mobx-react';
import DevTools from 'mobx-react-devtools'
const remotedev = require('mobx-remotedev/lib/dev').default;

useStrict(true);

@remotedev
class Store {
    @observable count: number = 0;
    @action increment() { this.count += 1; }
    @action decrement() { this.count -= 1; }
    @computed get year() {
        const date = new Date();
        return date.getFullYear() + this.count;
    }
}

const store = new Store();

@observer
export default class App extends React.Component<void, void> {
    render() {
        return <div>
            <button onClick={store.decrement.bind(store)} />
            <p>{store.year}</p>
            <button onClick={store.increment.bind(store)} />
            <DevTools />
        </div>;
    }
}
