let cart = [];
let walletBalance = 0;
function addToCart(name, price) {
  cart.push({ name, price });
  displayCart();
}
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const total = document.getElementById("total");
  cartItems.innerHTML = "";
  let sum = 0;
  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <p>${item.name} - ₹${item.price} 
      <button onclick="removeFromCart(${index})">Remove</button></p>`;
    sum += item.price;
  });
  total.innerText = `Total: ₹${sum}`;
}
function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}
function addMoney() {
  let amount = parseInt(document.getElementById("wallet-amount").value);
  if (amount > 0) {
    walletBalance += amount;
    document.getElementById("wallet-balance").innerText = walletBalance;
    alert(`₹${amount} added to your wallet!`);
    document.getElementById("wallet-amount").value = "";
  } else {
    alert("Enter a valid amount!");
  }
}
function checkout() {
  const name = document.getElementById("customer-name").value;
  const address = document.getElementById("customer-address").value;
  const phone = document.getElementById("customer-phone").value;
  const payment = document.getElementById("payment-method").value;
  if (!name || !address || !phone) {
    alert("Please fill in all details!");
    return;
  }
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  if (payment === "wallet") {
    if (walletBalance >= total) {
      walletBalance -= total;
      document.getElementById("wallet-balance").innerText = walletBalance;
      alert(`Order placed successfully using Wallet! 
Remaining Wallet Balance: ₹${walletBalance}`);
      cart = [];
      displayCart();
    } else {
      alert("Insufficient wallet balance! Please add money.");
    }
  } else {
    alert(`Thank you ${name}! 
Your order has been placed successfully. 
Delivery Address: ${address} 
Phone: ${phone} 
Payment: ${payment.toUpperCase()}`);
    cart = [];
    displayCart();
  }
}
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
