import { Injectable } from '@nestjs/common';
import { ReadlineParser, SerialPort } from 'serialport';
import { ISensorData } from '../interfaces/sensor-data.interface';
import { IAlertData } from '../interfaces/alert-data.interface';
import { SensorDataRepository } from '../repositories/sensor-data.repository';
import { SensorData } from '../database/entities/sensor-data.entity';
import { AlertDataRepository } from '../repositories/alert-data.repository';
import { AlertData } from '../database/entities/alert-data.entity';

@Injectable()
export class SerialService {
  private port: SerialPort;
  private parser: ReadlineParser;
  private tempSensorDataEntities: SensorData[] = [];

  constructor(
    private readonly sensorDataRepository: SensorDataRepository,
    private readonly alertDataRepository: AlertDataRepository,
  ) {
    this.connectToPort();
    setInterval(() => this.storeTempSensorData(), 60000); // 60000 ms = 1 minute
  }

  private connectToPort() {
    try {
      //for testing mode
      //this.port = new SerialPort({ path: '/dev/pts/8', baudRate: 9600 });
      this.port = new SerialPort({ path: '/dev/arduino', baudRate: 9600 });
      this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\n' }));
      this.parser.on('data', (data: string) => this.handleData(data));
      this.port.on('error', (error: Error) => this.handleError(error));
      console.log('Connected to port successfully');
    } catch (error) {
      console.error('Failed to connect to port:', error);
    }
  }

  private async handleData(rawData: string) {
    try {
      //console.log('Received data:', rawData);
      const data = this.formatAndValidateData(rawData);
      if (data === null) {
        console.log('Data is null');
      } else if (data.type === 'sensors') {
        const sensorDataEntities = data.data?.map(
          ({ timestamp, temperature, humidity }) => {
            const sensorData = new SensorData();
            sensorData.timestamp = timestamp;
            sensorData.temperature = temperature;
            sensorData.humidity = humidity;
            return sensorData;
          },
        );
        this.tempSensorDataEntities.push(...sensorDataEntities);
        console.log(data.data);
      } else if (data.type === 'alert') {
        console.log(data.data);

        const alertDataEntitie = new AlertData();
        alertDataEntitie.alert = data.data.alert;
        alertDataEntitie.sensor = data.data.sensor;
        alertDataEntitie.value = data.data.value;
        alertDataEntitie.timestamp = data.data.timestamp;

        await this.alertDataRepository.storeAlertData(alertDataEntitie);
      }
    } catch (error) {
      console.error('Error handling data:', error);
    }
  }

  private async storeTempSensorData() {
    if (this.tempSensorDataEntities.length > 0) {
      await this.sensorDataRepository.storeSensorData(
        this.tempSensorDataEntities,
      );
      console.log('Stored sensor data successfully');
      this.tempSensorDataEntities = [];
    }
  }

  private handleError(error: Error) {
    console.error('Error on connection to serial port:', error);
    this.reconnect();
  }

  private reconnect() {
    setTimeout(() => {
      try {
        this.connectToPort();
        console.log('Trying to reconnect to the serial port...');
      } catch (error) {
        console.error('Failed to reconnect to the serial port:', error);
        this.reconnect();
      }
    }, 5000);
  }

  private formatAndValidateData(
    rawData: string,
  ):
    | { type: 'sensors'; data: ISensorData[] }
    | { type: 'alert'; data: IAlertData }
    | null {
    const sanitizedData = rawData.trim();
    // if (sanitizedData.endsWith(',')) {
    //   sanitizedData = sanitizedData.slice(0, -1);
    // }

    if (sanitizedData.startsWith('[')) {
      const parsedData: ISensorData[] = JSON.parse(sanitizedData);

      const filteredData = parsedData.filter(
        ({ temperature, humidity }) =>
          temperature !== undefined || humidity !== undefined,
      );
      const filteredDataLenght = filteredData.length;
      if (filteredData.length === 0) {
        return null;
      }
      const sensorFormatedData = [];

      for (let i = 0; i < filteredData.length; i++) {
        const { temperature, humidity } = filteredData[i];

        if (
          (temperature && Number.isNaN(temperature)) ||
          (humidity && Number.isNaN(humidity))
        ) {
          throw new Error('Invalid data from SeAnsors');
        }
        const timestamp = this.getApproxUnixTime(filteredDataLenght - i);
        sensorFormatedData.push({
          timestamp: timestamp,
          temperature: filteredData[i].temperature,
          humidity: filteredData[i].humidity,
        });
      }
      return { type: 'sensors', data: sensorFormatedData };
    } else {
      const parsedData: IAlertData = JSON.parse(sanitizedData);
      const { alert, sensor, value } = parsedData;

      if (
        typeof alert !== 'string' ||
        (sensor !== 'temperature' && sensor !== 'humidity') ||
        Number.isNaN(value)
      ) {
        return null;
      }
      const timestamp = this.getApproxUnixTime(1);
      const twoSecondsAgoDate = new Date(timestamp * 1000);
      console.log(twoSecondsAgoDate.toLocaleString());
      parsedData.timestamp = timestamp;
      return { type: 'alert', data: parsedData };
    }
  }

  //get approx unix time in seconds 2 seconds ago,
  //because the arduino sends the data 2 seconds after it was collected (approx)
  private getApproxUnixTime(seconds): number {
    const approxTime = Math.floor(Date.now() / 1000) - 2 * seconds;
    return approxTime;
  }

  //Send data to arduino
  sendChangeValue(dto: any) {
    this.port.write('b4rt');
    if (dto.led_alert !== undefined) {
      this.port.write(
        JSON.stringify({ type: 'change_value', led_alert: dto.led_alert }),
      );
    }
    if (dto.alert_threshold_humidity !== undefined) {
      this.port.write(
        JSON.stringify({
          type: 'change_value',
          alert_threshold_humidity: dto.alert_threshold_humidity,
        }),
      );
    }
    if (dto.alert_threshold_temperature !== undefined) {
      this.port.write(
        JSON.stringify({
          type: 'change_value',
          alert_threshold_temperature: dto.alert_threshold_temperature,
        }),
      );
    }
  }
}
