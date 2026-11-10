import React, {useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeft, ArrowRight, Check, Minus, Plus, Trash2, ShoppingBag, Mail} from 'lucide-react';
import {ProductImage} from './Editorial';
import {money} from './data';

export default function CheckoutPage({cart, update, remove}) {
  const [address,setAddress]=useState(null);
  const [editing,setEditing]=useState(true);
  const [status,setStatus]=useState('');
  const review=useRef(null);
  const subtotal=cart.reduce((sum,item)=>sum+(item.price||0)*item.qty,0);
  const count=cart.reduce((sum,item)=>sum+item.qty,0);
  const orderText=()=>`SPARK-DV order enquiry\n\n${cart.map(item=>`${item.name} x ${item.qty}: ${money(item.price*item.qty)}`).join('\n')}\n\nProduct subtotal: ${money(subtotal)}\nShipping and final pricing: please confirm\n\nDelivery details:\n${Object.values(address||{}).filter(Boolean).join('\n')}\n\nPlease confirm availability, delivery charges, final total and payment instructions. No payment has been made.`;
  if(!cart.length)return <section className="checkout-shell wrap"><h1>Checkout</h1><div className="checkout-empty"><ShoppingBag size={40}/><h2>Your cart is empty</h2><p>Add a product to start your order.</p><Link className="button button-dark" to="/products">Shop products <ArrowRight size={17}/></Link></div></section>;
  return <section className="checkout-shell wrap">
    <Link className="checkout-return" to="/cart"><ArrowLeft size={16}/>Back to cart</Link>
    <div className="checkout-title"><h1>Checkout</h1><span>{count} {count===1?'item':'items'} in your order</span></div>
    <p className="checkout-notice">Review your selection and delivery details. SPARK-DV will confirm availability, delivery and payment before your order is placed.</p>
    <div className="checkout-layout"><div className="checkout-steps">
      <section className="checkout-step"><div className="checkout-step-title"><span>{address&&!editing?<Check size={17}/>:1}</span><h2>Delivery address</h2>{address&&!editing&&<button onClick={()=>setEditing(true)}>Change</button>}</div>
      {editing?<form className="checkout-address" onSubmit={e=>{e.preventDefault();setAddress(Object.fromEntries(new FormData(e.currentTarget)));setEditing(false);setStatus('');requestAnimationFrame(()=>review.current?.focus());}}>
        <div className="checkout-fields">
          <label>Full name<input name="Full name" autoComplete="shipping name" required defaultValue={address?.['Full name']}/></label>
          <label>Email<input name="Email" type="email" autoComplete="email" required defaultValue={address?.Email}/></label>
          <label>Mobile number<input name="Phone" type="tel" inputMode="tel" autoComplete="shipping tel" pattern="[+0-9 ()-]{10,18}" required defaultValue={address?.Phone}/></label>
          <label>PIN code<input name="PIN code" inputMode="numeric" autoComplete="shipping postal-code" pattern="[0-9]{6}" maxLength={6} title="Enter a six-digit Indian PIN code" required defaultValue={address?.['PIN code']}/></label>
          <label className="checkout-wide">Address<input name="Address" autoComplete="shipping address-line1" placeholder="House, building and street" required defaultValue={address?.Address}/></label>
          <label className="checkout-wide">Area / landmark (optional)<input name="Area" autoComplete="shipping address-line2" defaultValue={address?.Area}/></label>
          <label>City<input name="City" autoComplete="shipping address-level2" required defaultValue={address?.City}/></label>
          <label>State / union territory<input name="State" autoComplete="shipping address-level1" required defaultValue={address?.State}/></label>
        </div><p className="checkout-country">Country: India</p><button className="button button-dark" type="submit">Use this address <ArrowRight size={16}/></button>
      </form>:<address className="checkout-address-review"><strong>{address['Full name']}</strong><span>{address.Address}{address.Area?`, ${address.Area}`:''}</span><span>{address.City}, {address.State} {address['PIN code']}, India</span><span>{address.Phone} · {address.Email}</span></address>}
      </section>
      <section className="checkout-step"><div className="checkout-step-title"><span>2</span><h2>Payment & delivery</h2></div><div className="checkout-payment"><Mail size={23}/><div><h3>Confirm with SPARK-DV</h3><p>Our team will confirm shipping costs, delivery timing and payment instructions by email. Online payment is not connected yet.</p></div></div></section>
      <section className="checkout-step"><div className="checkout-step-title"><span>3</span><h2 ref={review} tabIndex={-1}>Review your items</h2><Link to="/products">Add more</Link></div>
        <div className="checkout-items">{cart.map(item=><article className="checkout-item" key={item.slug}><Link to={`/products/${item.slug}`} className="checkout-item-image"><ProductImage product={item}/></Link><div className="checkout-item-copy"><Link to={`/products/${item.slug}`}><h3>{item.name}</h3></Link><p>{money(item.price)} each</p><div className="checkout-quantity"><button aria-label={`Decrease ${item.name}`} onClick={()=>update(item.slug,-1)}><Minus size={15}/></button><span aria-live="polite">{item.qty}</span><button aria-label={`Increase ${item.name}`} onClick={()=>update(item.slug,1)}><Plus size={15}/></button><button className="checkout-remove" aria-label={`Remove ${item.name}`} onClick={()=>remove(item.slug)}><Trash2 size={16}/></button></div></div><strong>{money(item.price*item.qty)}</strong></article>)}</div>
      </section>
    </div><aside className="checkout-summary"><h2>Order summary</h2><dl><div><dt>Products ({count})</dt><dd>{money(subtotal)}</dd></div><div><dt>Delivery</dt><dd>To be confirmed</dd></div><div><dt>Taxes</dt><dd>Confirmed in final quote</dd></div><div className="checkout-total"><dt>Product subtotal</dt><dd>{money(subtotal)}</dd></div></dl><p>The final payable amount will be confirmed by our team.</p>
      <button className="button button-dark" disabled={!address||editing} onClick={()=>{window.location.href=`mailto:sparkdv310@gmail.com?subject=${encodeURIComponent('SPARK-DV order enquiry')}&body=${encodeURIComponent(orderText())}`;setStatus('Email draft requested. Review and send it in your email app. Your order has not been placed or paid.');}}>Prepare order email <ArrowRight size={16}/></button>
      {(!address||editing)&&<small>Complete your delivery address to continue.</small>}
      {address&&!editing&&<button className="checkout-copy" onClick={async()=>{try{await navigator.clipboard.writeText(orderText());setStatus('Order details copied. You can paste them into an email to sparkdv310@gmail.com.');}catch{setStatus('Could not copy. Use Prepare order email or contact sparkdv310@gmail.com.');}}}>Copy order details</button>}
      <p role="status" className="checkout-status">{status}</p><Link to="/shipping">Shipping & returns</Link>
    </aside></div>
  </section>;
}
