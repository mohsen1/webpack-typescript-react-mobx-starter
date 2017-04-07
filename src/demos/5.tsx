import * as React from 'react';
import { action, computed, observable, useStrict } from 'mobx';
import { observer}  from 'mobx-react';

useStrict(true); // NOTE this

class Item {
    @observable public name: string
    @observable public price: number
    @observable public quantity: number

    constructor(name: string, price: number, quantity: number) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    @computed get total() {
        return this.price * this.quantity;
    }

    @action changeName(newName: string) { this.name = newName; }
    @action changePrice(newPrice: number) { this.price = newPrice; }
    @action changeQuantity(newQuantity: number) { this.quantity = newQuantity; }
}

class Store {
    @observable items: Item[] = []

    @action newItem(name: string = '', price: number = 0, quantity: number = 0) {
        this.items.push(new Item(name, price, quantity))
    }


    @computed get totalPrice() {
        return (this.items || []).reduce((total, item) => item.total + total, 0)
    }

    @computed get totalQuantity() {
        return (this.items || []).reduce((total, item) => item.quantity + total, 0)
    }

}

const store = new Store();


@observer
export default class App extends React.Component<void, void> {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {store.items.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <input
                                    value={item.name}
                                    onChange={({target}) => item.changeName(target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    value={item.price}
                                    onChange={({target}) => item.changePrice(parseFloat(target.value))}
                                />
                            </td>
                            <td>
                                <input
                                    value={item.quantity}
                                    onChange={({target}) => item.changeQuantity(parseFloat(target.value))}
                                />
                            </td>
                            <td>{item.total}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={4}>
                            <button onClick={() => { store.newItem() }}>New row</button>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>{store.totalPrice}</th>
                        <th>{store.totalPrice}</th>
                    </tr>
                </tfoot>
            </table>
        );
    }
}
