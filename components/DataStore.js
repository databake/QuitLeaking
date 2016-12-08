import { AsyncStorage } from 'react-native';

class DataStore {
  async harvestCountForDate(dateAtMidnight) {
    const dateStr = dateAtMidnight.toString();
    const harvestForDate = await AsyncStorage.getItem(dateStr);

    if (harvestForDate) {
      return parseInt(harvestForDate, 10);
    } 
  }

  async incrementHarvest(dateAtMidnight) {
    const dateStr = dateAtMidnight.toString();
    let harvestForDate = await AsyncStorage.getItem(dateStr);
    harvestForDate = harvestForDate ? parseInt(harvestForDate, 10) + 1 : 1;
    await AsyncStorage.setItem(dateStr, harvestForDate.toString());
  }

}

export default new DataStore();
