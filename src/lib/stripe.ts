import Stripe from 'stripe';

export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
  'pk_test_51UEWhp9xCg65DqRpoIQdHLRCkZ8zMIqhQWeHGbnGONAsEAg5ADgFgDCkZa4ov7cETJzjVcTkps8fo8tNPNBW68ZB00QxvVDi0s';

let _stripeInstance: Stripe | null = null;

export function getStripeInstance(): Stripe {
  if (!_stripeInstance) {
    const key =
      process.env.STRIPE_SECRET_KEY ||
      'sk_test_build_placeholder_key_00000000000000000000000000';
    _stripeInstance = new Stripe(key, {
      apiVersion: '2024-06-20' as any,
      appInfo: {
        name: 'Apex Tech Institute Platform',
        version: '1.0.0',
      },
    });
  }
  return _stripeInstance;
}

// Transparent proxy for zero-crash module loading during Next.js static builds
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const instance = getStripeInstance() as any;
    const val = instance[prop];
    if (typeof val === 'function') {
      return val.bind(instance);
    }
    return val;
  },
});
