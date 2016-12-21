let socket = io.connect('http://139.59.41.50:3000');

class TodoApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    render() {
        return (
            <div>
                <h3>  Ip list with reactjs</h3>
                <TodoList items={this.state.items}/>
            </div>
        );
    }

    componentDidMount() {

        let uiModel = this;

        socket.on('new_ip', function (data) {
            uiModel.setState((state) => ({
                items: state.items.concat({id: Date.now(), text: data.new_ip})
            }))
        })

        socket.on('remove_disconnected_ip', function (data) {

            uiModel.setState((state) => ({
                items: state.items.filter(function (item) {
                    return item.text != data.removed
                })
            }))
        })

        socket.on('ip_list', function (data) {


            var items1 = uiModel.state.items = [];
            data.list.forEach(function(item){
                uiModel.state.items.push({id : new Date().getTime() + item, text : item })
            })

            uiModel.setState((state) => ({
                items: items1
            }))
        })
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