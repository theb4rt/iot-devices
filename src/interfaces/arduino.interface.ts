export interface IChangeValueDto {
  led_alert?: boolean;
  alert_threshold_humidity?: number;
  alert_threshold_temperature?: number;
}

export interface IGetActualValueDto {
  actual_led_on?: boolean;
  actual_threshold_temperature?: number;
  alert_threshold_temperature?: number;
}
