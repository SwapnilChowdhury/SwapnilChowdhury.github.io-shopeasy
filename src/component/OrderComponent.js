import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderComponent = () => {
    const user = useSelector((state) => state.users.loggedIn);
    const [order, setOrder] = useState([]);
    useEffect(() => {
        getOrder();
    }, [])
    const getOrder = async () => {
        const res = await axios.get(`http://localhost:8080/orders/getOrder/${user.id}`)
        setOrder(res.data);
    }
    return (
        <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Yet to be delivered
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                    <div class="accordion-body">
                        {order.length==0 ? (<h1>No orders here</h1>):(order.map(o => (
                            <>
                                <h2>Order Date: {new Date(o.date).getDate()}/{new Date(o.date).getMonth()+1}/{new Date(o.date).getFullYear()}</h2>
                                <h2>Order Time: {new Date(o.date).getHours()}:{new Date(o.date).getMinutes()}:{new Date(o.date).getSeconds()}</h2>
                                {o.products.map(prod => (
                                    <>
                                        <div className="checkout-container">

                                            <div key={prod.id} className="checkout-item">
                                                <img src={prod.image} alt={prod.title} className="checkout-item-image" />
                                                <div className="checkout-item-details">
                                                    <h3 className="checkout-item-title">{prod.title}</h3>
                                                    <p className="checkout-item-price">Price: ${prod.price}</p>

                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}

                            </>
                        )))}
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Past Orders
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderComponent;