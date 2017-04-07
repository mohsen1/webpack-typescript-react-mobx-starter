import * as React from 'react';
import { action, observable, useStrict } from 'mobx';
import { observer}  from 'mobx-react';

useStrict(true);

class Store {
    @observable count: number = 1;
    @action increment() { this.count += 1; }
    @action decrement() { this.count -= 1; }
}

const store = new Store();

@observer
export default class App extends React.Component<void, void> {
    render() {
        return <div>
            <button onClick={store.decrement.bind(store)} />
            <p>{store.count}</p>
            <button onClick={store.increment.bind(store)} />
        </div>;
    }
}
