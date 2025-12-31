// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";
// import {useRef} from 'react';

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const currency = import.meta.env.VITE_CURRENCY;

//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [isSeller, setIsSeller] = useState(false);
//   const [showUserLogin, setshowUserLogin] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   // const [searchQuery, setSearchQuery] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");


//   // Fetch Seller Status
//   const fetchSeller = async () => {
//     try {
//       const { data } = await axios.get("/api/seller/is-auth");
//       if (data.success) {
//         setIsSeller(true);
//       } else {
//         setIsSeller(false);
//       }
//     } catch (error) {
//       setIsSeller(false);
//         console.log(error.response?.data || error.message);
//     }
//   };


//   //Fetch User Auth Status, User Data and Cart Items
//      const fetchUser = async()=>{
//       try {
//         const {data} = await axios.get('/api/user/is-auth')
//         if(data.success){
//           setUser(data.user)
//           // setCartItems(data.user.cartItems)
//           setCartItems(data.user.cartItems || {})
//           setshowUserLogin(false)
//         }else{
//         setUser(null)
//          setCartItems({})
//         }
//       } catch (error) {
//         setUser(null)
//       }
//      }




//   // fetch all product
//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get("/api/product/list");
//       if (data.success) {
//         setProducts(data.products);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Add Product to Card
//   const addToCart = (itemId) => {
//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       cartData[itemId] += 1;
//     } else {
//       cartData[itemId] = 1;
//     }
//     setCartItems(cartData);
//     toast.success("Added to  Cart");
//   };

//   // Update Cart Item Quantity
//   const updateCartItem = (itemId, quantity) => {
//     let cartData = structuredClone(cartItems);
//     // cartItems[itemId] = quantity;
//       cartData[itemId] = quantity;

//     setCartItems(cartData);
//     toast.success("Cart Updated");
//   };

//   // Remove Product from Cart
//   const removeFromCart = (itemId) => {
//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       cartData[itemId] -= 1;
//       if (cartData[itemId] === 0) {
//         delete cartData[itemId];
//       }
//       setCartItems(cartData);
//       toast.success("Remove from Cart");
//     }
//   };

//   //Get Cart Item Count
//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const item in cartItems) {
//       totalCount += cartItems[item];
//     }
//     return totalCount;
//   };

//   //Get Cart Total Amount
//   const getCartAmount = () => {
//   let totalAmount = 0;

//   for (const itemId in cartItems) {
//     const itemInfo = products.find(
//       (product) => product._id === itemId
//     );

//     if (itemInfo && cartItems[itemId] > 0) {
//       totalAmount += itemInfo.offerPrice * cartItems[itemId]; // 👈 match backend
//     }
//   }

//   return Math.floor(totalAmount * 100) / 100;
// };


//   useEffect(() => {
//     fetchSeller();
//     fetchProducts();
//     fetchUser();
//   }, []);


//   //Update Database Cart Items
// //   useEffect(()=>{
// // const updateCart = async ()=>{
// //   try {
// //     const {data} = await axios.post('/api/cart/update', {cartItems})
// //     if(!data.success){
// //       toast.error(data.message)
// //     }
// //   } catch (error) {
// //       toast.error(error.message)
    
// //   }
// // }

// // if(user){
// //   updateCart()
// // }
// //   },[cartItems])


// const isInitial = useRef(true);
// useEffect(() => {
//   if (isInitial.current) {
//     isInitial.current = false;
//     return;
//   }

//   if (user) {
//     const updateCart = async () => {
//       try {
//         const { data } = await axios.post("/api/cart/update", { cartItems });
//         if (!data.success) toast.error(data.message);
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };

//     updateCart();
//   }
// }, [cartItems]);



//   const value = {
//     navigate,
//     user,
//     setUser,
//     isSeller,
//     setIsSeller,
//     showUserLogin,
//     setshowUserLogin,
//     products,
//     currency,
//     addToCart,
//     updateCartItem,
//     removeFromCart,
//     cartItems,
//     searchQuery,
//     setSearchQuery,
//     getCartCount,
//     getCartAmount,
//     axios,
//     fetchProducts,
//     fetchUser
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => {
//   return useContext(AppContext);
// };









import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setshowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const isInitial = useRef(true);

  /* ---------------- SELLER AUTH ---------------- */
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(!!data.success);
    } catch {
      setIsSeller(false);
    }
  };

  /* ---------------- USER AUTH ---------------- */
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
        setshowUserLogin(false);
        isInitial.current = true; // reset cart sync
      } else {
        setUser(null);
        setCartItems({});
      }
    } catch {
      setUser(null);
      setCartItems({});
    }
  };

  /* ---------------- PRODUCTS ---------------- */
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ---------------- CART LOGIC ---------------- */
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  const removeFromCart = (itemId) => {
  setCartItems((prev) => {
    const updated = { ...prev };

    if (!updated[itemId]) return prev;

    if (updated[itemId] > 1) {
      updated[itemId] -= 1;
      toast.success("Item quantity reduced");
    } else {
      delete updated[itemId];
      toast.success("Item removed from cart");
    }

    return updated;
  });
};


  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        total += product.offerPrice * cartItems[itemId];
      }
    }
    return Math.round(total * 100) / 100;
  };

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    fetchSeller();
    fetchProducts();
    fetchUser();
  }, []);

  /* ---------------- SYNC CART TO DB ---------------- */
  useEffect(() => {
    if (!user) return;

    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    const syncCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };

    syncCart();
  }, [cartItems, user]);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setshowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
    fetchProducts,
    fetchUser,
    setCartItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
