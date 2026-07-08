import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { createOrder, verifyPayment } from "@/services/orderService";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { toast } = useToast();

  // ✅ Total Amount
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, item) =>
            sum +
            (item.salePrice > 0 ? item.salePrice : item.price) *
              item.quantity,
          0
        )
      : 0;

  // ✅ Razorpay handler
  async function handleRazorpayPayment() {
    if (!cartItems?.items?.length) {
      toast({
        title: "Your cart is empty",
        variant: "destructive",
      });
      return;
    }

    if (!currentSelectedAddress) {
      toast({
        title: "Please select an address",
        variant: "destructive",
      });
      return;
    }

    try {
      // 1️⃣ Create order (backend)
      const res = await createOrder({
        userId: user?.id,
        cartId: cartItems?._id,
        cartItems: cartItems.items.map((item) => ({
          productId: item.productId,
          title: item.title,
          image: item.image,
          price: item.salePrice > 0 ? item.salePrice : item.price,
          quantity: item.quantity,
        })),
        addressInfo: {
          addressId: currentSelectedAddress?._id,
          address: currentSelectedAddress?.address,
          city: currentSelectedAddress?.city,
          pincode: currentSelectedAddress?.pincode,
          phone: currentSelectedAddress?.phone,
          notes: currentSelectedAddress?.notes,
        },
        totalAmount: totalCartAmount,
      });

      const { razorpayOrder, orderId } = res.data;

      // 2️⃣ Open Razorpay popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "E-Commerce App",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          // 3️⃣ Verify payment
          await verifyPayment({
            ...response,
            orderId,
          });

          toast({
            title: "Payment Successful 🎉",
          });
        },

        modal: {
          ondismiss: () => {
            toast({
              title: "Payment cancelled",
              variant: "destructive",
            });
          },
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast({
        title: "Payment failed",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        <div className="flex flex-col gap-4">
          {cartItems?.items?.map((item) => (
            <UserCartItemsContent key={item.productId} cartItem={item} />
          ))}

          <div className="mt-8 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalCartAmount}</span>
          </div>

          <Button onClick={handleRazorpayPayment} className="w-full mt-4">
            Pay with Razorpay
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
