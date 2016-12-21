let socket = io.connect('http://192.168.0.105:3000');

class TodoApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{id: 1, text: 'one'}, {id: 2, text: 'two'}],
            secondsElapsed : 0
        };
    }

    render() {
        return (
            <div>
                <div>Seconds Elapsed: {this.state.secondsElapsed}</div>

                <h3>IP LIST</h3>
                <TodoList items={this.state.items}/>
            </div>
        );
    }

    tick() {


        this.yoo()
    }

    yoo() {
        alert(111);

        this.setState((state) => ({
            secondsElapsed: state.secondsElapsed + 1,
            items: state.items.concat({id: Date.now(), text: 'one124' + Date.now()})
        }))
    }

    componentDidMount() {
        setTimeout(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));