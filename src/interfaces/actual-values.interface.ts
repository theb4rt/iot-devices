export interface ILedData {
  type: 'actual_value';
  led_on: number;
}

export interface IThresholdTemp {
  type: 'actual_value';
  thresholdTemp: number;
}

export interface ITestModeStatus {
  type: 'actual_value';
  testModeStatus: boolean;
}

export interface IActualValues {
  type: 'actual_value';
  led_on: number;
  thresholdTemp: number;
  testModeStatus: boolean;
}
