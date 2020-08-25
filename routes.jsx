const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

// sumulate getting products from DataBase
const products = [
  { name: "Tomatoes", type: "Italian", instock: 10 },
  { name: "Oranges", type: "Spanish", instock: 3 },
  { name: "Radishes", type: "Chinese", instock: 5 },
  { name: "Corn", type: "American", instock: 8 },
];
const cartItems = [];

const App = (props) => {
  const [items, setItems] = React.useState(products);
  const [cart, setCart] = React.useState([{ name: "orange" }]);
  return (
    <ReactRouterDOM.HashRouter>
      <button>
        <Link to="/">Products</Link>
      </button>
      <button>
        <Link to="/addtoCart">Add to Cart</Link>
      </button>
      <button>
        <Link to="/editCart">Edit Cart</Link>
      </button>
      <button>
        <Link
          to={{
            pathname: "/showCart",
            data: cart, // your data array of objects
          }}
        >
          Show Cart
        </Link>
      </button>
      <Route path="/" exact component={Products} />
      <Route path="/addToCart" component={AddToCart} />
      <Route path="/editCart" component={editCart} />
      <Route path="/showCart" component={Cart} />
    </ReactRouterDOM.HashRouter>
  );
};
const AddToCart = () => <h1>Add to Cart</h1>;
const editCart = () => <h1>Edit Cart</h1>;
const RemoveFromCart = () => <h1>Edit Cart</h1>;
//=========Cart=============
const Cart = (props) => {
  const { Card, Accordion, Button } = ReactBootstrap;
  let data = props.location.data ? props.location.data : products;
  console.log(`data:${JSON.stringify(data)}`);

  const addTodo = (item) => {
    const newTodos = [...cart, { item }];
    setCart(newTodos);
  };
  let list = data.map((item, index) => {
    {
      return (
        <Card key={index}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {item.name}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{item.type}</Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    }
  });
  return <Accordion defaultActiveKey="0">{list}</Accordion>;
};
//========TodoForm - addTodo is passed down from Parent
const TodoForm = ({ addTodo }) => {
  const [value, setValue] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeHolder="Add Todo ..."
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};
const Products = (props) => {
  const [items, setItems] = React.useState(products);
  const [cart, setCart] = React.useState([{ name: "orange" }]);
  const { Card, Accordion, Button, Container, Row, Col } = ReactBootstrap;
  const addToCart = (e) => {
    console.log(e.target.name);
    // remember use of ... - must be inside an array
    setCart([...cart, e.target]);
  };

  let list = products.map((item, index) => {
    let n = index + 1049;
    let url = "https://picsum.photos/id/" + n + "/50/50";
    return (
      <li key={index}>
        <img src={url}></img>
        <button onClick={addToCart}>
          {item.name}:{item.instock}
        </button>
        <input type="number"></input>
        <input name={item.name} type="submit" onClick={addToCart}></input>
      </li>
    );
  });
  let cartList = cart.map((item, index) => {
    return (
      <li key={index + 0}>
        <h4>{item.name}</h4>
      </li>
    );
    cartItems = cart.map((item) => item.name);
  });
  console.log(list);
  return (
    <Container>
      <Row>
        <Col>
          <ul style={{ listStyleType: "none" }}>{list}</ul>
        </Col>
        <Col>
          <h1>Cart Contents</h1>
          <ul style={{ listStyleType: "none" }}>{cartList}</ul>
        </Col>
      </Row>
    </Container>
  );
};
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));
