/**
 * @providesModule Router
 * @flow
 */

import { createRouter, } from '@exponent/ex-navigation';
import DailySqueeze from '../scenes/DailySqueeze';
import SqueezeNow from '../scenes/SqueezeNow';
import Leakage from '../scenes/Leakage';
import Insights from '../scenes/Insights';
import Program from '../scenes/Program.ios';
import ProgramAndroid from '../scenes/Program.android';
import Profile from '../scenes/Profile';
import DrawerNavigationLayout from './DrawerNavigationLayout';
import TabNavigationLayout from './TabNavigationLayout';
import VolumeInput from '../scenes/VolumeInput';

export default createRouter(() => ({
  squeeze: () => DailySqueeze,
  now: () => SqueezeNow,
  leakage: () => Leakage,
  insights: () => Insights,
  program: () => Program,
  programAndroid: () => ProgramAndroid,
  profile: () => Profile,
  drawerNavigation: () => DrawerNavigationLayout,
  tabNavigation: () => TabNavigationLayout,
  volumeInput: () => VolumeInput,
}));
