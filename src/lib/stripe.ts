import Stripe from 'stripe';

const STRIPE_SECRET_KEY =
  process.env.STRIPE_SECRET_KEY || '';

export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
  'pk_test_51UEWhp9xCg65DqRpoIQdHLRCkZ8zMIqhQWeHGbnGONAsEAg5ADgFgDCkZa4ov7cETJzjVcTkps8fo8tNPNBW68ZB00QxvVDi0s';

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20' as any,
  appInfo: {
    name: 'Apex Tech Institute Platform',
    version: '1.0.0',
  },
});
