
function goPage(page) {
  window.location.href = page;
}



function calculatePrice() {
  const destination = document.getElementById("destination");
  const guestsInput = document.getElementById("guests");
  const priceBox = document.getElementById("totalPrice");

  if (!destination || !guestsInput || !priceBox) return;

  let guests = parseInt(guestsInput.value);
  if (isNaN(guests) || guests <= 0) {
    alert("Please enter valid number of guests");
    return;
  }

  let basePrice =
    localStorage.getItem("dealPrice") ??
    parseInt(destination.value);

  let total = basePrice * guests;

  priceBox.innerText = `Total Price: ₹${total}`;

  localStorage.setItem("totalPrice", total);
  localStorage.setItem(
    "destinationName",
    destination.options[destination.selectedIndex].text
  );
}


function goPayment() {
  if (!localStorage.getItem("totalPrice")) {
    alert("Please calculate price first");
    return;
  }
  goPage("payment.html");
}


document.addEventListener("DOMContentLoaded", () => {
  const payAmount = document.getElementById("payAmount");
  if (payAmount) {
    payAmount.innerText =
      "Amount to Pay: ₹" + localStorage.getItem("totalPrice");
  }
});

function confirmPayment() {
  goPage("confirmation.html");
}


document.addEventListener("DOMContentLoaded", () => {
  const confirmBox = document.getElementById("confirmDetails");
  if (confirmBox) {
    confirmBox.innerText = `
      Your trip to ${localStorage.getItem("destinationName")}
      is successfully booked.
      Total Paid: ₹${localStorage.getItem("totalPrice")}
    `;
  }
});


function filterDeals(type) {
  const cards = document.querySelectorAll(".deal-card");

  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "scale(0.9)";

    setTimeout(() => {
      if (type === "all" || card.classList.contains(type)) {
        card.style.display = "block";
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      } else {
        card.style.display = "none";
      }
    }, 200);
  });
}

/***********************
 * DEALS PAGE – TIMER
 ***********************/
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".timer").forEach(timer => {
    let time = parseInt(timer.dataset.time);
    if (isNaN(time)) return;

    const interval = setInterval(() => {
      if (time <= 0) {
        timer.innerText = "⏳ Deal expired";
        clearInterval(interval);
        return;
      }

      time--;
      let h = Math.floor(time / 3600);
      let m = Math.floor((time % 3600) / 60);
      let s = time % 60;

      timer.innerText = `⏰ Ends in ${h}h ${m}m ${s}s`;
    }, 1000);
  });
});

/***********************
 * BOOK DEAL → BOOKING
 ***********************/
function bookDeal(place, price) {
  localStorage.setItem("destinationName", place);
  localStorage.setItem("dealPrice", price);
  goPage("booking.html");
}

/***********************
 * COUPON SYSTEM
 ***********************/
function applyCoupon() {
  const code = document.getElementById("coupon")?.value.trim();
  const msg = document.getElementById("couponMsg");

  if (!msg) return;

  let price = localStorage.getItem("dealPrice");
  if (!price) {
    msg.innerText = "⚠ Select a deal first";
    msg.style.color = "orange";
    return;
  }

  if (code === "WANDER10") {
    let discounted = Math.round(price * 0.9);
    localStorage.setItem("dealPrice", discounted);
    msg.innerText = `✅ Coupon Applied! New Price: ₹${discounted}`;
    msg.style.color = "green";
  } else {
    msg.innerText = "❌ Invalid Coupon Code";
    msg.style.color = "red";
  }
}
