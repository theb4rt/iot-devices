export interface IAlertData {
  type: 'alert';
  alertStatus: boolean;
  alert: string;
  sensor: string;
  value: number;
  timestamp?: number;
}

export interface IValuesData {
  type: 'values';
  actual_led_on?: number;
  actual_threshold_temperature?: number;
  testModeStatus: boolean;
}
