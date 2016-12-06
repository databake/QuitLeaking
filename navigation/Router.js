/**
 * @providesModule Router
 * @flow
 */

import {createRouter, } from '@exponent/ex-navigation';
import DailySqueeze from '../scenes/DailySqueeze';
import SqueezeNow from '../scenes/SqueezeNow';
import Leakage from '../scenes/Leakage';
import Insights from '../scenes/Insights';

export default createRouter(() => ({
  squeeze: () => DailySqueeze,
  now: () => SqueezeNow,
  leakage: () => Leakage,
  insights: () => Insights,
}));