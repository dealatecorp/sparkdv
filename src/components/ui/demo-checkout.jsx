import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeft, ArrowRight, CreditCard, Smartphone, LockKeyhole} from 'lucide-react';
import {money} from '../../data';
import assets from '../../product-assets.json';

export default function DemoCheckout({cart}) {
  const [items] = useState(() => cart.map(item => ({...item})));
  const [method,setMethod] = useState('card');
  const [outcome,setOutcome] = useState('success');
  const [status,setStatus] = useState('ready');
  const result = useRef(null);
  const total = items.reduce((sum,p) => sum + (p.price || 0) * p.qty, 0);
  useEffect(() => {
    if(status !== 'processing') return;
    const timer=setTimeout(()=>setStatus(outcome),1800);
    return ()=>clearTimeout(timer);
  },[status,outcome]);
  useEffect(()=>{if(status==='success'||status==='declined')result.current?.focus()},[status]);
  if(!items.length) return <section className="section wrap payment-empty"><h1>Your cart is empty.</h1><p>Add a product to try the demo payment experience.</p><Link to="/products" className="button button-dark">Explore products <ArrowRight size={18}/></Link></section>;
  const finished=status==='success'||status==='declined';
  return <section className="wrap payment-page">
    <Link to="/cart" className="payment-back"><ArrowLeft size={17}/> Back to your selection</Link>
    <div className="payment-heading"><h1>{finished ? 'Payment result.' : 'Complete your selection.'}</h1><p>Demo checkout · No money is charged and no order is placed.</p></div>
    <div className="payment-layout">
      <div className="payment-panel">
      {finished ? <div className={`payment-result is-${status}`} ref={result} tabIndex={-1} role="status">
        <svg className="payment-result-icon" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44"/>{status==='success'?<path d="M28 51l15 15 30-32"/>:<path d="M35 35l30 30M65 35L35 65"/>}</svg>
        <h2>{status==='success'?'Demo payment complete':'Demo payment declined'}</h2>
        <p>{status==='success'?'That’s how a successful payment will feel. Your demo transaction is complete.':'This simulated payment was rejected. Try again to preview a successful payment.'}</p>
        <strong className="payment-result-total">{money(total)}</strong>
        <span>{method==='card'?'Demo card ending 4242':'Demo UPI account'}</span>
        <p className="payment-fine">No payment was taken. Your cart is still saved.</p>
        <button className="button button-dark" onClick={()=>{setStatus('ready');setOutcome('success')}}>{status==='success'?'Try another demo':'Try again'} <ArrowRight size={18}/></button>
        <Link className="payment-return" to="/products">Continue exploring</Link>
      </div> : <form onSubmit={e=>{e.preventDefault();if(status==='ready')setStatus('processing')}} aria-busy={status==='processing'}>
        <fieldset disabled={status==='processing'}><legend>Payment method</legend>
          <div className="payment-methods">{[['card','Demo card',CreditCard],['upi','Demo UPI',Smartphone]].map(([value,label,Icon])=><label key={value} className={method===value?'is-selected':''}><input type="radio" name="method" value={value} checked={method===value} onChange={()=>setMethod(value)}/><Icon size={21}/>{label}</label>)}</div>
          <div className="payment-demo-account">{method==='card'?<><CreditCard size={28}/><span>DEMO CARD</span><strong>4242 ···· ···· 4242</strong><small>Sample card · No card details required</small></>:<><Smartphone size={28}/><span>DEMO UPI</span><strong>demo@sparkdv</strong><small>Sample account · No payment request is sent</small></>}</div>
        </fieldset>
        <fieldset className="payment-outcomes" disabled={status==='processing'}><legend>Choose a demo result</legend><p>Preview either outcome before connecting real payments.</p><label><input type="radio" name="outcome" value="success" checked={outcome==='success'} onChange={()=>setOutcome('success')}/> Successful payment</label><label><input type="radio" name="outcome" value="declined" checked={outcome==='declined'} onChange={()=>setOutcome('declined')}/> Rejected payment</label></fieldset>
        <button className="button button-dark payment-submit" type="submit" disabled={status==='processing'}>{status==='processing'?<><span className="payment-spinner" aria-hidden="true"/> Processing demo payment…</>:<>Simulate payment · {money(total)} <ArrowRight size={18}/></>}</button>
        <p className="payment-fine" role="status">{status==='processing'?'Simulating your selected outcome. Please wait.':<><LockKeyhole size={14}/> Demo only. No real payment details are collected.</>}</p>
      </form>}
      </div>
      <aside className="payment-summary"><h2>Your selection</h2><ul>{items.map(p=><li key={p.slug}><img src={assets[p.slug]?.local} alt=""/><div><h3>{p.name}</h3><span>Quantity {p.qty}</span></div><strong>{money((p.price||0)*p.qty)}</strong></li>)}</ul><div className="payment-total"><span>Demo total</span><strong>{money(total)}</strong></div><p>Based on your selected products. Final pricing, availability and delivery are confirmed by our team.</p></aside>
    </div>
  </section>;
}
